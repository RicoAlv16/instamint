# Utiliser une image de node.js comme base
FROM node:16 as build

# Définir le répertoire de travail à /app
WORKDIR /app

# Copier les fichiers de package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build --prod

# Étape de production
FROM nginx:alpine

# Copier les fichiers de build de l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80 pour le serveur HTTP
EXPOSE 80

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
