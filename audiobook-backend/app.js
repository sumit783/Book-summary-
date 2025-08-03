require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const { startRatingScheduler } = require('./services/ratingScheduler');
const path = require('path');
const cors = require('cors');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', bookRoutes);
app.use('/api', userRoutes);
app.use('/api', commentRoutes);
app.use('/api/admin', adminAuthRoutes);

// Start the rating scheduler
startRatingScheduler();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
