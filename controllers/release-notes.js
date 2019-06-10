const releaseNotesModel = require('../models/release-notes.js');

exports.releaseNotesGet = (req, res, next) => {
    releaseNotesModel.getReleaseNotes().then(data => {
        res.send(data);
    }).catch(error => {
        console.log(error);
    });
};