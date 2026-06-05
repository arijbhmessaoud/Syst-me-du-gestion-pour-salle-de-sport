// src/components/AbonneForm.jsx
import React, { useState } from 'react';

function AbonneForm({ onAdd }) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ nom, email, date });
    setNom('');
    setEmail('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un abonné</h2>
      <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AbonneForm;
