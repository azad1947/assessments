import { admin_model } from '../model/admin-schema.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import _ from 'lodash';

config();

const admin_auth_handler = async (req, res, next) => {
    const { authorization } = req.headers;
    const { admin_jwt_secret } = process.env;
    const token = authorization && authorization.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, admin_jwt_secret, (err, user) => {
        if (err) {
            console.log('error occurred while verifying admin auth token ---> ', err.message);
            return res.sendStatus(403);
        }

        req.user = user
        next()
    })
}

const admin_login_handler = async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;
        const user = await admin_model.login({ email, phone, password });
        const info = { user_id: user.user_id, user_type: user.user_type, logged_in: true };
        const token = jwt.sign(info, process.env.admin_jwt_secret, { expiresIn: '7d' })
        res.status(200).json({ auth_token: token });
    } catch (err) {
        console.log('error occurred while super user login --> ', err.message);
        next(err);
    }
}

export {
    admin_auth_handler, admin_login_handler
}