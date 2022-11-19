import mongoose from 'mongoose';
import { config } from 'dotenv';
import { create_test_admin } from './create-test-admin.js';

config();

const { MONGO_URL } = process.env;

export default () => {

    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('connected to the db.');
        create_test_admin();
    });

    mongoose.connection.on('error', (err) => {
        console.log('db connection error :- ', err)
    });

    mongoose.connection.on('disconnected', () => {
        console.log('db is disconnected.');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('db has been disconnected due to app termination.');
            process.exit(0)
        });
    });
}
