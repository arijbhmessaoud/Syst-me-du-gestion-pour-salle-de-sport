const express = require('express');
const router = express.Router();
const Abonne = require('../models/Abonne');


// GET - Liste des abonnés
router.get('/', async (req, res) => {
  const abonnes = await Abonne.find();
  res.json(abonnes);
});

// POST - Ajouter un abonné
router.post('/', async (req, res) => {
  try {
    const newAbonne = new Abonne(req.body);
    await newAbonne.save();
    res.status(201).json(newAbonne);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Modifier un abonné
router.put('/:id', async (req, res) => {
  try {
    const abonne = await Abonne.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(abonne);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Supprimer un abonné
router.delete('/:id', async (req, res) => {
  try {
    await Abonne.findByIdAndDelete(req.params.id);
    res.json({ message: 'Abonné supprimé' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
