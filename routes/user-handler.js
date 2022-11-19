import { users } from '../model/user-schema.js';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';


const create_new_user_handler = async (req, res, next) => {
    const obj = req.body;

    let user = await users.findOne({ phone: obj.phone });

    if (_.isEmpty(user)) {
        obj.user_id = uuidv4();
        user = new users(obj);
        await user.save();
        return res.status(200).json(user);
    }

    res.json({ msg: 'user already exists.' });

}

const fetch_user_handler = async (req, res, next) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ error: { msg: 'phone is required.' } })
    }

    const user = await users.findOne({ phone });

    if (_.isEmpty(user)) {
        return res.status(200).json({ msg: 'no user found' })
    }

    res.status(200).send(user);
}

const update_user_handler = async (req, res, next) => {
    const { phone, update } = req.body;

    if (!phone) {
        return next({ message: 'phone is required' })
    }

    if (!update || _.isEmpty(update)) {
        return next({ message: 'update object is required' })
    }

    delete update?.user_id;
    delete update?.user_type;
    delete update?.is_active;
    delete update?.created_at;

    const doc = await users.findOneAndUpdate({phone},{$set:update}, {runValidators:true, new:true});

    res.send(doc);
}


const delete_user_handler = async (req, res, next) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ error: { msg: 'phone is required.' } })
    }

    const user = await users.deleteOne({ phone });

    res.status(200).json({ msg: 'your account has been deleted.' });
}

export {
    create_new_user_handler,
    fetch_user_handler,
    update_user_handler,
    delete_user_handler
}