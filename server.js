const express = require('express');
const { connectDB, getReport } = require('./config/database');
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

app.get('/api/report', async (req, res) => {
    try {
        const reports = await getReport();
        res.json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch report"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));