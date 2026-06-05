const Abonne = require('../models/Abonne');

exports.getAllAbonnes = async (req, res) => {
  const abonnes = await Abonne.find();
  res.json(abonnes);
};

exports.createAbonne = async (req, res) => {
  const newAbonne = new Abonne(req.body);
  await newAbonne.save();
  res.status(201).json(newAbonne);
};

exports.updateAbonne = async (req, res) => {
  const abonne = await Abonne.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(abonne);
};

exports.deleteAbonne = async (req, res) => {
  await Abonne.findByIdAndDelete(req.params.id);
  res.json({ message: 'Abonné supprimé' });
};

