// Importation du module 'http' de Node.js pour créer un serveur HTTP
const http = require('http');

// Importation de l'application Express depuis le fichier 'app.js'
const app = require('./app');

// Fonction pour normaliser le port en un nombre, une chaîne ou false
const normalizePort = val => {
  const port = parseInt(val, 10); // Convertit la valeur en entier

  if (isNaN(port)) { // Vérifie si la conversion a échoué
    return val; // Retourne la valeur d'origine si ce n'est pas un nombre
  }
  if (port >= 0) { // Vérifie si le port est un nombre positif
    return port; // Retourne le port s'il est valide
  }
  return false; // Retourne false pour les valeurs invalides
};

// Définition du port sur lequel le serveur va écouter
const port = normalizePort(process.env.PORT || '3000'); // Utilise le port défini dans les variables d'environnement ou 3000 par défaut
app.set('port', port); // Définit le port pour l'application Express

// Gestionnaire d'erreurs pour le serveur HTTP
const errorHandler = error => {
  if (error.syscall !== 'listen') { // Vérifie si l'erreur est liée à l'écoute du serveur
    throw error; // Lance l'erreur si ce n'est pas le cas
  }
  const address = server.address(); // Récupère l'adresse du serveur
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port; // Formate l'adresse pour l'affichage
  switch (error.code) { // Gère les différents codes d'erreur
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.'); // Affiche une erreur si des privilèges élevés sont nécessaires
      process.exit(1); // Quitte le processus avec un code d'erreur
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.'); // Affiche une erreur si le port est déjà utilisé
      process.exit(1); // Quitte le processus avec un code d'erreur
      break;
    default:
      throw error; // Lance l'erreur pour les autres cas
  }
};

// Création du serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

// Écoute des événements 'error' et 'listening' sur le serveur
server.on('error', errorHandler); // Utilise le gestionnaire d'erreurs défini précédemment
server.on('listening', () => { // Affiche un message lorsque le serveur commence à écouter
  const address = server.address(); // Récupère l'adresse du serveur
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port; // Formate l'adresse pour l'affichage
  console.log('Listening on ' + bind); // Affiche un message indiquant sur quel port ou pipe le serveur écoute
});

// Le serveur écoute sur le port défini précédemment
server.listen(port);