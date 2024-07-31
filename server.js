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

app.post('/api/createIdentify', async (req, res) => {
    try {
        // Extract data from the request body
        const { reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score } = req.body;

        // Validate the required fields
        if (!reportId || !category || !subcategory || !oisFoundationalObjective || !maturityLevel || !informationSource || !score) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Call the createIdentity function with the extracted data
        await createIdentity(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score);

        // Send a success response
        res.status(201).json({ message: "Identify created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create identify." });
    }
});

app.post('/api/createProtect', async (req, res) => {
    try {
        // Extract data from the request body
        const { reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score } = req.body;

        // Validate the required fields
        if (!reportId || !category || !subcategory || !oisFoundationalObjective || !maturityLevel || !informationSource || !score) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Call the createIdentity function with the extracted data
        await createProtect(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score);

        // Send a success response
        res.status(201).json({ message: "Protect created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create Protect." });
    }
});

app.post('/api/createDetect', async (req, res) => {
    try {
        // Extract data from the request body
        const { reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score } = req.body;

        // Validate the required fields
        if (!reportId || !category || !subcategory || !oisFoundationalObjective || !maturityLevel || !informationSource || !score) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Call the createIdentity function with the extracted data
        await createDetect(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score);

        // Send a success response
        res.status(201).json({ message: "Detect created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create Detect." });
    }
});

app.post('/api/createRespond', async (req, res) => {
    try {
        // Extract data from the request body
        const { reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score } = req.body;

        // Validate the required fields
        if (!reportId || !category || !subcategory || !oisFoundationalObjective || !maturityLevel || !informationSource || !score) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Call the createIdentity function with the extracted data
        await createRespond(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score);

        // Send a success response
        res.status(201).json({ message: "Respond created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create Respond." });
    }
});

app.post('/api/createRecover', async (req, res) => {
    try {
        // Extract data from the request body
        const { reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score } = req.body;

        // Validate the required fields
        if (!reportId || !category || !subcategory || !oisFoundationalObjective || !maturityLevel || !informationSource || !score) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Call the createIdentity function with the extracted data
        await createRecover(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score);

        // Send a success response
        res.status(201).json({ message: "Recover created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create Recover." });
    }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));