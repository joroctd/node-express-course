let { people } = require('../data');
const { PERSON_ID_STR } = require('../constants');

let lastId = people[people.length - 1].id;

const addPerson = (req, res) => {
	const { name } = req.body;

	if (!name) {
		res.status(400).json({ success: false, message: 'Please provide a name' });
	} else {
		people.push({ id: ++lastId, name });
		res.status(201).json({ success: true, name });
	}
};

const getPeople = (req, res) => {
	res.json(people);
};

const getPerson = (req, res) => {
	const id = parseInt(req.query[PERSON_ID_STR]);
	const person = people.find(p => p.id === id);

	if (!person) {
		res.status(404).json({ message: 'That person was not found.', id });
	} else res.json(person);
};

const deletePerson = (req, res) => {
	const id = parseInt(req.params[PERSON_ID_STR]);
	const personIndex = people.findIndex(i => i.id === id);

	if (personIndex === -1) {
		res.status(404).json({
			success: false,
			message: `${PERSON_ID_STR} of ${id} not found.`
		});
	} else {
		people = people.filter(p => p.id !== id);
		res.status(200).json({ success: true, id });
	}
};

const updatePerson = (req, res) => {
	const { name } = req.body;
	const id = parseInt(req.params[PERSON_ID_STR]);
	const personIndex = people.findIndex(p => p.id === id);

	if (personIndex === -1) {
		res.status(404).json({
			success: false,
			message: `${PERSON_ID_STR} of ${id} not found.`
		});
	} else if (!name) {
		res.status(400).json({ success: false, message: 'Please provide a name' });
	} else {
		people[personIndex] = Object.assign(people[personIndex], { name });
		res.status(200).json({ success: true, data: people[personIndex] });
	}
};

module.exports = {
	addPerson,
	getPeople,
	getPerson,
	deletePerson,
	updatePerson
};
