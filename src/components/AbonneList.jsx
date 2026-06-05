import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AbonneList = ({ abonnes, onEdit, onDelete }) => {
  
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(abonnes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Abonnes");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "liste_abonnes.xlsx");
  };

  const genererRecu = (abonne) => {
    const date = new Date().toLocaleDateString();

    const recuHTML = `
      <html>
  <head>
    <title>Reçu de Paiement</title>
    <style>
      body {
        font-family: "Poppins", Arial, sans-serif;
        background: linear-gradient(135deg, #c83712ff, #8d681dff);
        color: #333;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      .receipt-container {
        background: #fff;
        border-radius: 15px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        width: 420px;
        padding: 30px;
        text-align: center;
        animation: fadeIn 0.8s ease;
      }

      h2 {
        color: #c83712ff;
        margin-bottom: 20px;
        font-size: 22px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      p {
        margin: 10px 0;
        font-size: 16px;
      }

      .info strong {
        color: #8d681dff;
      }

      .divider {
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #8d2005d5, #844f19ff);
        margin: 15px 0 20px 0;
        border-radius: 2px;
      }

      .print-btn {
        margin-top: 25px;
        padding: 12px 25px;
        background-color: #8d681dff;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s ease;
      }

      .print-btn:hover {
        background-color: #a77d2b;
        transform: scale(1.05);
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  </head>

  <body>
    <div class="receipt-container">
      <h2> BOUM ! Ils gardent la forme… et leur abonnement aussi !</h2>
      <div class="divider"></div>

      <p class="info"><strong>Date :</strong> ${date}</p>
      <p class="info"><strong>Nom :</strong> ${abonne.nom}</p>
      <p class="info"><strong>Prénom :</strong> ${abonne.prenom}</p>
      <p class="info"><strong>Type d’abonnement :</strong> ${abonne.typeAbonnement}</p>
      <p class="info"><strong>Montant payé :</strong> ${abonne.paiement} TND</p>

      <button class="print-btn" onclick="window.print()"> Imprimer</button>
    </div>
  </body>
</html>

    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(recuHTML);
    newWindow.document.close();
  };

  return (
    <div>
      <h3>Les avatars du club</h3>
      <button 
        onClick={exportToExcel} 
        style={{ 
          marginBottom: '10px', 
          backgroundColor: '#d32f2f', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '5px', 
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Exporter les forces🏋️
      </button>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Sexe</th>
            <th>Naissance</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Abonnement</th>
            <th>Inscription</th>
            <th>Fin</th>
            <th>Paiement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {abonnes.map((a, index) => (
            <tr key={index}>
              <td data-label="Nom">{a.nom}</td>
              <td data-label="Prénom">{a.prenom}</td>
              <td data-label="Sexe">{a.sexe}</td>
              <td data-label="Naissance">{a.dateNaissance}</td>
              <td data-label="Téléphone">{a.telephone}</td>
              <td data-label="Email">{a.email}</td>
              <td data-label="Abonnement">{a.typeAbonnement}</td>
              <td data-label="Inscription">{a.dateInscription}</td>
              <td data-label="Fin">{a.dateFin}</td>
              <td data-label="Paiement">{a.paiement}</td>
              <td data-label="Actions">
                <button className="btn btn-edit" onClick={() => onEdit(index)}>Modifier</button>
                <button className="btn btn-delete" onClick={() => onDelete(index)}>Supprimer</button>
                <br />
                <button className="btn btn-recu" onClick={() => genererRecu(a)} style={{ marginTop: '5px' }}> Reçu</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbonneList;
