import React from 'react';
import dayjs from 'dayjs';

const AlertesFinAbonnement = ({ abonnes = [] }) => {
  
  const today = dayjs().startOf('day');
  const dans7Jours = today.add(7, 'day');

 
  const finProche = abonnes.filter((a) => {
    if (!a.dateFin) return false;
    const fin = dayjs(a.dateFin, 'YYYY-MM-DD').startOf('day');
    return fin.isAfter(today.subtract(1, 'day')) && fin.isBefore(dans7Jours.add(1, 'day'));
  });

  return (
    <div style={{ backgroundColor: '#fff8e1', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
      <h3 style={{ color: '#d11500ff' }}>Ils transpirent leur dernière semaine d’abonnement !</h3>
      {finProche.length === 0 ? (
        <p>Aucune alerte.</p>
      ) : (
        <ul>
          {finProche.map((a, index) => (
            <li key={index}>
              <strong>{a.nom} {a.prenom}</strong> — Fin le {dayjs(a.dateFin).format('DD/MM/YYYY')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertesFinAbonnement;
