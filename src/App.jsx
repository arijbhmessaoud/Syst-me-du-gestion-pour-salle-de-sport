// src/App.jsx
import React, { useState, useEffect } from 'react';
import AbonneForm from './components/AbonneForm';
import Authentification from './components/Authentification';
import AbonneList from './components/AbonneList';
import AlertesFinAbonnement from './components/AlertesFinAbonnement';
import api from './api'; // Axios configuré
import './index.css';

function App() {
  const [abonnes, setAbonnes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [token, setToken] = useState(null); // ✅ Gère l'état de connexion

  // Charger la liste des abonnés depuis le backend
  useEffect(() => {
    api.get('/abonnes')
      .then((res) => {
        setAbonnes(res.data);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des abonnés :', err);
      });
  }, []);

  // ✅ Fonction appelée après login réussi
  const handleLoginSuccess = (token) => {
    setToken(token);
    console.log("Connexion réussie !", token);
  };

  // Supprimer un abonné
  const handleDelete = (index) => {
    const abonne = abonnes[index];
    api.delete(`/abonnes/${abonne._id}`)
      .then(() => {
        const updated = abonnes.filter((_, i) => i !== index);
        setAbonnes(updated);
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression :", err);
      });
  };

  // Préparer la modification
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(abonnes[index]);
  };

  // ✅ Rendu conditionnel : connexion OU tableau/formulaire
  return (
    <div className="App">
      {!token ? (
        // 🔐 Si pas connecté → page Authentification
        <Authentification onLoginSuccess={handleLoginSuccess} />
      ) : (
        // ✅ Si connecté → afficher le tableau et le formulaire
        <>
          <h1>BOUM! (Body On Ultrat Mode)</h1>

          <AbonneForm
            abonnes={abonnes}
            setAbonnes={setAbonnes}
            editIndex={editIndex}
            editData={editData}
            setEditIndex={setEditIndex}
            setEditData={setEditData}
          />

          <AbonneList
            abonnes={abonnes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <AlertesFinAbonnement abonnes={abonnes} />
        </>
      )}
    </div>
  );
}

export default App;
