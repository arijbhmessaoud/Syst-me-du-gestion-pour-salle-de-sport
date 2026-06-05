# Backend — Gestion des abonnés

Ce dossier contient les sources du backend pour gérer les abonnés de la salle de sport (API Express + MongoDB via Mongoose). Les fichiers principaux du backend sont situés à la racine du projet : `server.js`, `routes/`, `models/`.

## Prérequis

- Node.js (>= 14)
- npm
- une instance MongoDB (locale ou distante) ; configurez l'URL dans un fichier `.env` (voir `config/db.js`).

## Installer et lancer le serveur

Exécutez ces commandes depuis la racine du projet :

```
npm install
```

Pour lancer le serveur en production :

```
npm start
```

Pour lancer en développement avec redémarrage automatique (nodemon) :

```
npm run dev
```

Le serveur écoute par défaut selon la configuration dans `server.js` (habituellement `http://localhost:3000` ou le port défini dans `.env`).

## Configuration

- Créez un fichier `.env` à la racine avec au minimum :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ma_base
```

- La connexion à MongoDB est gérée dans `config/db.js`.

## Structure importante

- `server.js` : point d'entrée de l'API
- `routes/` : définitions des routes (ex. `abonneRoutes.js`)
- `models/` : modèles Mongoose (ex. `Abonne.js`, `Admin.js`)
- `controllers/` : logique métier (ex. `abonneController.js`)

## Mettre le projet sur GitHub

Si vous souhaitez que je crée le dépôt et pousse le code, dites-moi le nom du dépôt GitHub et si je peux utiliser `gh` (GitHub CLI). Sinon, suivez les étapes générales :

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Je peux exécuter ces commandes pour vous ici si vous confirmez et fournissez le nom du dépôt.

