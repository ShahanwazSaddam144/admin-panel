const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); 
const botProtection = require('./middleware/bot');
const cookieParser = require('cookie-parser');

const emailRouter = require("./controllers/mail");
const Project = require("./controllers/projects");
const Login = require("./controllers/login");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===================
// CORS (FIXED for cookies)
// ===================
app.use(cors({
  origin: "http://localhost:3000", // exact frontend URL
  credentials: true,               // allow cookies
}));

// ===================
// Middlewares
// ===================
app.use(express.json());
app.use(cookieParser());
app.use(botProtection);

// ===================
// Logging
// ===================
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.body);
  next();
});

// ===================
// Rate limiting
// ===================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests. Please try again later.',
});
app.use(limiter);

// ===================
// Routes
// ===================
app.use('/', emailRouter);
app.use('/', Project);
app.use('/', Login);

// ===================
// MongoDB Connection
// ===================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB error:', err));
