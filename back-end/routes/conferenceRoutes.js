import express from 'express';
import * as confController from '../controllers/conferenceController.js';

export const router = express.Router(); // /conference

router.get('/', confController.getAllConferences);
router.get('/search', confController.search);
router.get('/organizer/:organizerId', confController.getConferencesByOrganizer);
router.get('/:name', confController.getConferencesByNameHandler);
router.get('/organizer-authors/:organizerId', confController.getPendingAuthorsByOrganizerId)
router.get('/reviewer/:reviewerId',confController.getConferencesByReviewer);

router.post("/",confController.createConference);

router.put('/:id', confController.updateConference);
router.delete('/:id', confController.deleteConference);


