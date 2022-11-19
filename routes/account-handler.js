import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { accounts, users } from '../model/user-schema.js';

const create_account_handler = async (req, res, next) => {
    const obj = req.body;

    if (!obj?.phone) {
        return next({ message: 'phone is required.' });
    }

    let doc = await accounts.findOne({ phone: obj?.phone });

    if (!_.isEmpty(doc)) {
        return next({ message: 'account already exits.' })
    }

    const user = await users.findOne({ phone: obj?.phone });

    if (_.isEmpty(user)) {
        return next({ message: 'user does not exit. create user first then account.' });
    }

    obj.account_id = uuidv4();
    obj.user_id= user.user_id;
    obj.user_info = user;
    doc = await accounts.create(obj);
    res.send(doc);

}

const update_account_handler = async (req, res, next) => {
    const { phone, update } = req.body;

    if (!phone) {
        return next({ message: 'phone is required.' })
    }

    if (!update) {
        return next({ message: 'update object is required.' })
    }

    delete update?.account_id;
    delete update?.user_id;
    delete update?.user_info;
    delete update?.is_account_active;

    const doc = await accounts.findOneAndUpdate(
        { phone },
        { $set: update },
        { returnOriginal: false, runValidators: true }
    );

    res.send(doc);
}

const fetch_account_handler = async (req, res, next) => {
    const { phone } = req.body;

    if (!phone) {
        return next({ message: 'phone is required.' })
    }

    const doc = await accounts.findOne({ phone });

    if ( _.isEmpty(doc)) {
        return res.status(200).json({ msg: 'no account found' })
    }

    res.status(200).send(doc);
}

const delete_account_handler = async (req, res, next) => {
    const { phone } = req.body;

    if (!phone) {
        return next({ message: 'phone is required.' })
    }

    const doc = await accounts.deleteOne({ phone });

    res.status(200).send({ msg: 'account has been deleted.' });
}


export {
    create_account_handler,
    fetch_account_handler,
    update_account_handler,
    delete_account_handler
}