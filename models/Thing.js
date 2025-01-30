// Création d'un schéma de données pour les objets Thing avec Mongoose
const mongoose = require('mongoose');

// La méthode 'Schema' de mongoose nous permet de créer un schéma de données qui contient les champs souhaités pour chaque objet de type Thing.
const thingSchema = mongoose.Schema({
    title: { type: String, required:true },
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    price: {type: Number, required: true},
    userId: {type: String, required: true},
});

// La méthode 'model' de mongoose nous permet de créer un modèle et de le rendre disponible pour notre application.
module.exports = mongoose.model('Thing', thingSchema);