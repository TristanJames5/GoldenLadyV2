const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'golden-lady-secret-2024';

// ─── Directories ─────────────────────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

[DATA_DIR, UPLOADS_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ─── Seed initial admin user ─────────────────────────────────────────────────
if (!fs.existsSync(USERS_FILE)) {
  const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'GoldenLady@2024', 10);
  fs.writeFileSync(USERS_FILE, JSON.stringify([
    { id: uuidv4(), email: process.env.ADMIN_EMAIL || 'emandalican@icloud.com', password: hash, role: 'admin' }
  ], null, 2));
}

// ─── Seed sample products ─────────────────────────────────────────────────────
if (!fs.existsSync(PRODUCTS_FILE)) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([
    { id: uuidv4(), name: 'Gold Filigree Necklace', category: 'jewelry', subcategory: 'necklaces', price: 4500, description: 'Delicate 18k gold filigree necklace, handcrafted.', image: null, featured: true, createdAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Diamond Solitaire Ring', category: 'jewelry', subcategory: 'rings', price: 18500, description: 'Classic solitaire with 0.5ct brilliant cut diamond.', image: null, featured: true, createdAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Pearl Drop Earrings', category: 'jewelry', subcategory: 'earrings', price: 2800, description: 'Lustrous freshwater pearl drop earrings in 14k gold.', image: null, featured: true, createdAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Cross Pendant', category: 'jewelry', subcategory: 'pendants', price: 3200, description: 'Sterling silver cross pendant with fine engraving.', image: null, featured: true, createdAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Masonic Pin – Square & Compass', category: 'accessories', subcategory: 'pins', price: 250, description: 'Finely crafted Masonic lapel pin with enamel finish.', image: null, featured: false, createdAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Masonic Ring – Blue Lodge', category: 'accessories', subcategory: 'rings', price: 3500, description: 'Custom Masonic ring with lodge symbol, available in silver or gold.', image: null, featured: false, createdAt: new Date().toISOString() },
  ], null, 2));
}

// ─── Multer config ───────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Helper
const readProducts = () => JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const writeProducts = (data) => fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));

// ─── Auth Routes ──────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// ─── Product Routes (Public) ──────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const products = readProducts();
  const { category, subcategory, featured } = req.query;
  let filtered = products;
  if (category) filtered = filtered.filter(p => p.category === category);
  if (subcategory) filtered = filtered.filter(p => p.subcategory === subcategory);
  if (featured === 'true') filtered = filtered.filter(p => p.featured);
  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// ─── Product Routes (Admin) ───────────────────────────────────────────────────
app.post('/api/products', authMiddleware, upload.single('image'), (req, res) => {
  const products = readProducts();
  const { name, category, subcategory, price, description, featured } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    category,
    subcategory,
    price: parseFloat(price),
    description,
    image: req.file ? `/uploads/${req.file.filename}` : null,
    featured: featured === 'true',
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', authMiddleware, upload.single('image'), (req, res) => {
  const products = readProducts();
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const { name, category, subcategory, price, description, featured } = req.body;
  products[idx] = {
    ...products[idx],
    name: name ?? products[idx].name,
    category: category ?? products[idx].category,
    subcategory: subcategory ?? products[idx].subcategory,
    price: price ? parseFloat(price) : products[idx].price,
    description: description ?? products[idx].description,
    featured: featured !== undefined ? featured === 'true' : products[idx].featured,
    image: req.file ? `/uploads/${req.file.filename}` : products[idx].image,
    updatedAt: new Date().toISOString()
  };
  writeProducts(products);
  res.json(products[idx]);
});

app.delete('/api/products/:id', authMiddleware, (req, res) => {
  const products = readProducts();
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  // delete image file if exists
  const product = products[idx];
  if (product.image) {
    const imgPath = path.join(__dirname, product.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  products.splice(idx, 1);
  writeProducts(products);
  res.json({ success: true });
});

// ─── Serve built frontends in production ──────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  // Admin (served at /admin)
  const adminDist = path.join(__dirname, '..', 'admin', 'dist');
  app.use('/admin', express.static(adminDist));
  app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(adminDist, 'index.html'));
  });

  // Store (served at /)
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✨ Golden Lady server running on port ${PORT}`);
});
