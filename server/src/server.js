const express = require('express');
const cors = require('cors');
const subdivisions = require('./routes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/subdivisions', subdivisions);

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on localhost port ${PORT}`);
});
