let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateRendu: Date,
    nom: String,
    rendu: Boolean
});

module.exports = mongoose.model('assignments', AssignmentSchema);