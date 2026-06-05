import React, { useState, useEffect } from 'react';
import api from '../api'; 

const AbonneForm = ({ abonnes, setAbonnes, editData }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    sexe: '',
    dateNaissance: '',
    telephone: '',
    email: '',
    typeAbonnement: '',
    dateInscription: '',
    dateFin: '',
    paiement: '',
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData && editData._id) {
      // 🔁 Modifier un abonné
      api.put(`/abonnes/${editData._id}`, formData)
        .then(res => {
          console.log("✅ Abonné modifié :", res.data);
          setAbonnes(prev =>
            prev.map(a => (a._id === editData._id ? res.data : a))
          );
        })
        .catch(err => {
          console.error("❌ Erreur de modification :", err);
        });
    } else {
      // ➕ Ajouter un nouvel abonné
      api.post('/abonnes', formData)
        .then(res => {
          console.log("✅ Abonné ajouté :", res.data);
          // ✅ Ajouter à la liste sans recharger
          setAbonnes(prev => [...prev, res.data]);
        })
        .catch(err => {
          console.error("❌ Erreur d'ajout :", err);
        });
    }

    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      prenom: '',
      sexe: '',
      dateNaissance: '',
      telephone: '',
      email: '',
      typeAbonnement: '',
      dateInscription: '',
      dateFin: '',
      paiement: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><h3>{editData ? 'Modifier un abonné' : 'Brancher un nouveau muscles'}</h3></td>
            <td><input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required /></td>
            <td><input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required /></td>
            <td>
              <select name="sexe" value={formData.sexe} onChange={handleChange} required>
                <option value="">-- Sexe --</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label>Date de Naissance:</label>
              <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} required />
            </td>
            <td><input name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" required /></td>
            <td><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /></td>
            <td>
              <select name="typeAbonnement" value={formData.typeAbonnement} onChange={handleChange} required>
                <option value="">-- Type d'abonnement --</option>
                <option value="Mensuel">Mensuel</option>
                <option value="Trimestriel">Trimestriel</option>
                <option value="Annuel">Annuel</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label>Date d’inscription :</label>
              <input type="date" name="dateInscription" value={formData.dateInscription} onChange={handleChange} required />
            </td>
            <td><label>Date de fin :</label>
              <input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} required />
            </td>
          </tr>
          <tr>
            <td><input name="paiement" value={formData.paiement} onChange={handleChange} placeholder="Paiement (ex: Payé)" required /></td>
            <td><button type="submit">{editData ? 'Modifier' : 'Brancher'}</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AbonneForm;
