import express from 'express';
import connect_to_mongo from './db/connection.js';
import { config } from 'dotenv';
import { error_handler } from './routes/middleware.js';
import admin_router from './routes/routes.js';
import file_upload from 'express-fileupload';

config();
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(file_upload());

app.get('/health', (req, res) => res.sendStatus(200));
app.use('/api/v1', admin_router);
app.use('/*', (req, res) => res.sendStatus(404));

app.use(error_handler);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}.`);
    connect_to_mongo();
})