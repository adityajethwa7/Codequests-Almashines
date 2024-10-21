import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import searchRoute from './routes/searchRoutes.js';
import emailRoute from './routes/email.js';

dotenv.config();

const app = express();

// Log environment variables for debugging
console.log('MONGO_URI:', process.env.MONGO_URI || 'Not set');
console.log('EMAILJS_SERVICE_ID:', process.env.EMAILJS_SERVICE_ID || 'Not set');
console.log('EMAILJS_TEMPLATE_ID:', process.env.EMAILJS_TEMPLATE_ID || 'Not set');
console.log('EMAILJS_USER_ID:', process.env.EMAILJS_USER_ID || 'Not set');

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/search', searchRoute);
app.use('/api/email', emailRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Server listener
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;