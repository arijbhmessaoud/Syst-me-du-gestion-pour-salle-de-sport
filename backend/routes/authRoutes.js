const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Nom d'utilisateur invalide" });
    }

    // Si tu veux plus tard : compare hashed password avec bcrypt
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    res.json({ token: 'votre_token_sans_jwt_pour_le_moment' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
