
const mongoose = require('mongoose');
const abonneSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  sexe: { type: String, enum: ['Homme', 'Femme'], required: true },
  dateNaissance: { type: Date },
  telephone: { type: String },
  email: { type: String },
  typeAbonnement: { type: String, enum: ['Mensuel', 'Annuel'] },
  dateInscription: { type: Date, default: Date.now },
  dateFin: { type: Date },
  paiement: { type: String, enum: ['Payé', 'Non payé'] }
});

module.exports = mongoose.model('Abonne', abonneSchema);
