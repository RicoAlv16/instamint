# Utiliser une image de node.js comme base
FROM node:16

# Définir le répertoire de travail à /app
WORKDIR /app

# Copier les fichiers de package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 3000 pour le serveur HTTP
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
