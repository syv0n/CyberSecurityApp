const express = require('express');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }) );
app.use(cors());

connectDB();

app.use('/api/users', userRoutes);

app.get('/profile', (req, res) => {
    res.json({ message: "This is the profile endpoint" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));