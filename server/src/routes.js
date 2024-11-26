const express = require('express');
const router = express.Router();
const data = require('./sample-data/subdivision.json');

router.get('/', (req, res) => {
	const { subdivisionStatusCode } = req.query;
	const filteredData =
		subdivisionStatusCode && subdivisionStatusCode !== 'All'
			? data.subdivisions.filter(
					(item) => item.subdivisionStatusCode === subdivisionStatusCode
			  )
			: data.subdivisions;

	res.status(200).json({ subdivisions: filteredData });
});

module.exports = router;
