import _ from 'lodash';
import { policy } from '../model/policy-schema.js';

const create_policy_handler = async (req, res, next) => {
    const obj = req.body;

    let doc = await policy.findOne({ policy_number: obj?.policy_number });

    if (_.isEmpty(doc)) {
        doc = await policy.create(obj);
        return res.send(doc);
    }

    res.json({ msg: 'policy_number already exists.' });

}

const update_policy_handler = async (req, res, next) => {
    const { policy_number, update } = req.body;

    if (!policy_number) {
        return next({ message: 'policy_number is required.' })
    }

    if (!update) {
        return next({ message: 'update object is required.' })
    }

    const doc = await policy.findOneAndUpdate(
        { policy_number },
        { $set: update },
        { returnOriginal: false, runValidators: true }
    );

    res.send(doc);
}

const fetch_policy_handler = async (req, res, next) => {
    const { policy_number } = req.body;

    if (!policy_number) {
        return next({ message: 'policy_number is required.' })
    }

    const doc = await policy.findOne({ policy_number });

    if (_.isEmpty(doc)) {
        return res.status(200).json({ msg: 'no policy found' })
    }

    res.status(200).send(doc);
}

const delete_policy_handler = async (req, res, next) => {
    const { policy_number } = req.body;

    if (!policy_number) {
        return next({ message: 'policy_number is required.' })
    }

    const doc = await policy.deleteOne({ policy_number });

    if (_.isEmpty(doc)) {
        return res.status(200).json({ msg: 'no policy found' })
    }

    res.sendStatus(200);
}

export {
    create_policy_handler,
    fetch_policy_handler,
    update_policy_handler,
    delete_policy_handler
}