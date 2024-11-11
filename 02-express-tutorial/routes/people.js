const express = require('express');
const router = express.Router();
const {
	addPerson,
	getPeople,
	getPerson,
	deletePerson,
	updatePerson
} = require('../controllers/people');
const { PERSON_ID_STR } = require('../constants');

router.route('/').get(getPeople).post(addPerson);
router
	.route(`/:${PERSON_ID_STR}`)
	.get(getPerson)
	.delete(deletePerson)
	.put(updatePerson);

module.exports = router;
