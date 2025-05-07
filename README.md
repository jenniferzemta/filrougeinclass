
THEME : CONCEPTION ET REALISATION D'AUNE APPLICATION D'AIDE AUX RA ET RS


Description

Cette application est conçue pour faciliter le travail des Responsables Administratifs (RA) et Responsables Scolarité (RS) en automatisant et simplifiant leurs tâches quotidiennes. L'application offre des fonctionnalités adaptées à leurs besoins spécifiques.

Technologies Utilisées
Frontend: React.js (npm create vite@latest frontend -- --template frontend)

Backend: Laravel (composer create-project laravel/laravel backend)

Base de données: MySQL

Autres:

TailwindCSS (pour le styling)

Axios (pour les requêtes HTTP)

React Router (pour la navigation)

<!--  -->
<!-- Fonctionnalités Principales -->
Pour les RA:
Gestion des dossiers administratifs

Suivi des documents

Génération de rapports automatisés

Tableau de bord personnalisé

Pour les RS:
Gestion des inscriptions

Suivi académique des étudiants

Gestion des emplois du temps

<!-- Installation -->

Prérequis
Node.js (v9+)
PHP (v8.0+)
Composer
MySQL/PhpMyAdmin

<!-- Étapes d'installation -->
Backend (Laravel)

bash
# Cloner le dépôt
git clone [] backend
cd backend

# Installer les dépendances
composer install

# Configurer le fichier .env
cp .env.example .env
# Modifier les variables d'environnement selon votre configuration

# Générer la clé d'application
php artisan key:generate

# Lancer les migrations et seeders
php artisan migrate --seed

# Démarrer le serveur
php artisan serve


<!-- Frontend (React) -->

bash
# Dans un nouveau terminal, depuis la racine du projet
cd frontend

# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
🌐 Accès
Frontend: http://localhost:5173

Backend: http://localhost:8000

API: http://localhost:8000/api

<!-- Structure du Projet -->
.
├── backend/          # Dossier Laravel
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── ...
├── frontend/         # Dossier React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
├── README.md


 <!-- Variables d'Environnement -->
Créez un fichier .env dans le dossier backend basé sur .env.example et configurez:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_de_la_base
DB_USERNAME=root
DB_PASSWORD=


<!-- Pour React -->
créez un fichier .env dans le dossier frontend:

VITE_API_BASE_URL=http://localhost:8000/api

<!-- Contribution -->
Forkez le projet

Créez votre branche (git checkout -b feature/AmazingFeature)

Committez vos changements (git commit -m 'Add some AmazingFeature')

Pushez vers la branche (git push origin feature/AmazingFeature)

Ouvrez une Pull Request

✉️ Contact
Votre nom : ZEMTA JENNIFER - laurejennifer06@gmail.com