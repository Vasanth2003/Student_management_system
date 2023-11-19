import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRouter from './routes/student_routes.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = 5000;
const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.use('/api/student', studentRouter);

// MongoDB URI from .env file
const mongodbURI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the Express app after connecting to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
