import express from 'express';
const router = express.Router();
import {
	addPerson,
	getPeople,
	getPerson,
	deletePerson,
	updatePerson
} from '../controllers/people.js';
import { constants } from '../data.js';
const { PERSON_ID_STR } = constants;

router.route('/').get(getPeople).post(addPerson);
router
	.route(`/:${PERSON_ID_STR}`)
	.get(getPerson)
	.delete(deletePerson)
	.put(updatePerson);

export default router;
