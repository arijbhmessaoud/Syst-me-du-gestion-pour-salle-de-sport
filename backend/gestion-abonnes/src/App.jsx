// src/App.jsx
function App() {
  return (
    <div>
      <h1>Gestion des abonnés</h1>
    </div>
  );
}


// src/App.jsx
import { useState } from 'react';
import AbonneForm from './components/AbonneForm';
import AbonneList from './components/AbonneList';

function App() {
  const [abonnes, setAbonnes] = useState([]);

  const ajouterAbonne = (abonne) => {
    setAbonnes([...abonnes, abonne]);
  };

  return (
    <div>
      <h1>Dashboard Admin - Salle de sport</h1>
      <AbonneForm onAdd={ajouterAbonne} />
      <AbonneList abonnes={abonnes} />
    </div>
  );
}

export default App;
