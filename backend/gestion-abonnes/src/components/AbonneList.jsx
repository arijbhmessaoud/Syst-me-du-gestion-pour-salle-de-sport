// src/components/AbonneList.jsx
import React from 'react';

function AbonneList({ abonnes }) {
  return (
    <div>
      <h2>Liste des abonnés</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Date d’inscription</th>
          </tr>
        </thead>
        <tbody>
          {abonnes.map((a, index) => (
            <tr key={index}>
              <td>{a.nom}</td>
              <td>{a.email}</td>
              <td>{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AbonneList;
