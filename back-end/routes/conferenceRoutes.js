import express from 'express';
import * as confController from '../controllers/conferenceController.js';

export const router = express.Router();

router.get('/', confController.getAllConferences);
router.get('/search',confController.search);

router.post("/",confController.createConference);


