const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');




connectDB();

 
app.use(cors());
app.use(express.json()); 

app.use('/api/abonnes', require('./routes/abonneRoutes'));
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
app.get('/', (req, res) => {
    res.send('API Salle de Sport en ligne');
  });
  


