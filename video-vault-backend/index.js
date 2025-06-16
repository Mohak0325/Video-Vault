const express = require('express');
const connectDb = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes.js');
const videoRouter = require('./routes/videoRoutes.js');
const editRouter = require('./routes/editRoutes.js');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: {
    message: 'Too many requests, please try again later.',
  },
});
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
}));

const port = process.env.PORT || 5000;

app.use('/api/auth' , authRouter);
app.use('/api/videos' , videoRouter);
app.use('/api/edit' , editRouter);

app.get("/", (req, res) => {
  res.send("🎥 Video Vault API is running");
});

connectDb().then(() => {
    app.listen(port , () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
});