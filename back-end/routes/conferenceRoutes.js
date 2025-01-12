import express from 'express';
import * as confController from '../controllers/conferenceController.js';

export const router = express.Router();

router.get('/', confController.getAllConferences);
router.get('/search', confController.search);
router.get('/search/organizer/:organizerId', confController.getConferencesByOrganizer)

router.post("/",confController.createConference);

router.put('/:id', confController.updateConference);
router.delete('/:id', confController.deleteConference);


