import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
import _ from 'lodash';

const admin_schema = new Schema({
    first_name: {
        type: String,
        validate: {
            validator: val => /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(val),
            message: props => `${props.value} is not a name!`
        },
        required: [true, 'first name is required.']
    },
    last_name: {
        type: String,
        validate: {
            validator: name => /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name),
            message: props => `${props.value} is not a name!`
        },
        required: [true, 'first name is required.']
    },
    user_id: {
        type: String,
        unique: true
    },
    user_type: { type: String, default: 'admin' },
    created_at: { type: Date, default: Date.now() },
    phone: {
        type: String,
        unique: true,
        validate: {
            validator: (phone) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone),
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    email: {
        type: String,
        required: [true, 'email is required.'],
        unique: true,
        validate: {
            validator: (email) => /\S+@\S+\.\S+/.test(email),
            message: props => `${props.value} is not a valid email.`
        }
    },
    password: { type: String, min: 6, required: [true, 'password is required.'] }
});

admin_schema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

admin_schema.statics.login = async function (obj) {

    if (!obj?.phone && !obj?.email) {
        throw Error('email or phone is required.');
    }

    if (!obj?.password) {
        throw Error('password is required.');
    }

    const query = {}

    if (obj?.email) {
        query.email = obj?.email;
    }

    if (obj?.phone) {
        query.phone = obj?.phone;
    }

    const user = await this.findOne(query);

    if (_.isEmpty(user)) {
        throw Error('no user found.');
    } else {
        const auth = await bcrypt.compare(obj?.password, user.password);

        if (auth) {
            return user;
        }

        throw Error('incorrect password');
    }
};

const admin_model = mongoose.model('admin', admin_schema);

export { admin_model }