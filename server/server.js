import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';

// Morgan has some issue with import syntax.
const morgan = require('morgan');
require('dotenv').config();

// Express Application
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ROUTES - Importing all the routes dynamically so that
// we do not have to import them manually.
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});