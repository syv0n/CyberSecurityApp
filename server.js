const express = require('express');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const frontendRoutes = require('./routes/frontendRoutes')
const scoreRoutes = require('./routes/scoreRoutes');

const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }) );
app.use(cors());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/', frontendRoutes)

app.use(express.static(path.join(__dirname, 'Frontend')));

app.get('/proile', (req, res) => {
   res.json({ message: "This is the profile endpoint" })
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));