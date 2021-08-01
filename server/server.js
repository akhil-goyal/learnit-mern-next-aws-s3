import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import csrf from 'csurf';
import cookieParser from 'cookie-parser'

// Morgan has some issue with import syntax.
const morgan = require('morgan');
require('dotenv').config();

const csrfProtection = csrf({ cookie: true });

// Express Application
const app = express();

// Database Connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log(`MongoDB connected!`);
    })
    .catch((error) => console.log('Error while connecting to MongoDB : ', error));

// Middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// ROUTES - Importing all the routes dynamically so that
// we do not have to import them manually.
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// CSRF Protection
app.use(csrfProtection)

app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});