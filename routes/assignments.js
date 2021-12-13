let Assignment = require('../model/assignment');

// Retrieving all items (GET) :
function getAssignments(req, res) {
    Assignment.find((err, assignments) => {
        if (err) {
            res.send(err)
        }
        res.send(assignments);
    });
}

// Retrieving an item by id (GET) :
function getAssignment(req, res) {
    let assignmentId = req.params.id;
    Assignment.findOne({ id: assignmentId }, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })
}

// Adding an item (POST) :
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateRendu = req.body.dateRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST item received : ");
    console.log(assignment)

    assignment.save((err) => {
        if (err) {
            res.send('Error adding item : ', err);
        }
        res.json({ message: `${assignment.nom} saved !` })
    })
}

// Updating an item (PUT) :
function updateAssignment(req, res) {
    console.log("UPDATE item received : ");
    console.log(req.body);

    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: `${assignment.nom} saved !` })
        }
    });
}

// Removing an item (DELETE) :
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${assignment.nom} deleted !` });
    })
}


module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };