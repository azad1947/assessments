import mongoose from 'mongoose';

const { Schema } = mongoose;

const user_schema = new Schema({
    first_name: {
        type: String,
        validate: {
            validator: val => /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(val),
            message: props => `${props.value} is not a name!`
        },
        required: [true, 'first name is required.']
    },
    last_name: {
        type: String,
        required: [true, 'last name is required.'],
        validate: {
            validator: name => /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name),
            message: props => `${props.value} is not a name!`
        }
    },
    user_id: {
        type: String,
        unique: true
    },
    user_type: { type: String, default: 'client' },
    is_active: Boolean,
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
        validate: {
            validator: (email) => /\S+@\S+\.\S+/.test(email),
            message: props => `${props.value} is not a valid email.`
        }
    },
    dob: {
        type: String,
        required: [true, 'dob is required.'],
        validate: {
            // YYYY-MM-DD
            validator: (dob) => /^\d{4}-\d{2}-\d{2}$/.test(dob),
            message: props => `${props.value} is not a valid date of birth.`
        }
    },
    gender: String,
    address: {
        address: { type: String, required: [true, 'address is required.'] },
        state: { type: String, required: [true, 'state is required.'] },
        city: { type: String, required: [true, 'city is required.'] },
        zip: {
            type: String, required: [true, 'zip is required.'],
            validate: {
                validator: (zip) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip),
                message: props => `${props.value} is not a valid zip.`
            }
        }
    }
});

const user_account_schema = new Schema({
    account_name: { type: String, required: [true, 'account_name is required.'] },
    account_type: { type: String, required: true },
    user_id: { type: String, required: true, unique: true },
    account_id: { type: String, required: true, unique: true },
    is_account_active: { type: Boolean, default: true },
    phone: {
        type: String,
        unique: true,
        validate: {
            validator: (phone) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone),
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    user_info: user_schema,
    policy: [{
        policy_type: String,
        policy_number: { type: String, unique: true, required: true },
        premium_amount_written: Number,
        premium_amount: Number,
        company_name: { type: String, required: true },
        category_name: { type: String, required: true },
        policy_start_date: { type: String, required: true },
        policy_end_date: { type: String, required: true },
        agency_id: { type: String, required: true }
    }]

})

const users = mongoose.model('user', user_schema);
const accounts = mongoose.model('account', user_account_schema);

export { users, accounts };