import express from 'express';
import * as confController from '../controllers/conferenceController.js';

export const router = express.Router(); // /conference

router.get('/', confController.getAllConferences);
router.get('/search', confController.search);
//router.get('/organizer/:organizerId', confController.getConferencesByOrganizer);
router.get('/organizer/:organizerId', (req, res, next) => {
    console.log(`Incoming request for organizer ID: ${req.params.organizerId}`); next(); },
    confController.getConferencesByOrganizer);
router.post("/",confController.createConference);

router.put('/:id', confController.updateConference);
router.delete('/:id', confController.deleteConference);


