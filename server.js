let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// DB connexion link :
const uri = 'mongodb+srv://user:user@democluster.pbqqo.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};


// DB connexion attempt :
mongoose.connect(uri, options)
    .then(() => {
            console.log("Connected to cloud data base !");
            console.log("at URI = " + uri);
            console.log("Check if it works : http://localhost:8010/api/assignments")
        },
        err => {
            console.log('Connexion error : ', err);
        });


// Allow cross-domain connexions (CORS) :
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


// Implementing forms :
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let port = process.env.PORT || 8010;


// Implementing routes :
const prefix = '/api';

app.route(prefix + '/assignments')
    .get(assignment.getAssignments)
    .post(assignment.postAssignment)
    .put(assignment.updateAssignment);
app.route(prefix + '/assignments/:id')
    .get(assignment.getAssignment)
    .delete(assignment.deleteAssignment);


// Starting server :
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);
module.exports = app;