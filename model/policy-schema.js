import mongoose from 'mongoose';

const { Schema } = mongoose;

const policy_schema = new Schema({
    agent: { type: String, required: [true, 'agent is required.'] },
    user_type: String,
    policy_mode: Number,
    producer: String,
    policy_number: { type: String, unique: true, required: [true, 'policy_number is required.'] },
    premium_amount_written: String,
    premium_amount: String,
    policy_type: String,
    company_name: { type: String, required: [true, 'company_name is required.'] },
    category_name: { type: String, required: [true, 'category_name is required.'] },
    policy_start_date: {
        type: String,
        required: [true, 'policy_start_date is required.'],
        validate: {
            // YYYY-MM-DD
            validator: (date) => /^\d{4}-\d{2}-\d{2}$/.test(date),
            message: props => `${props.value} is not a valid policy_start_date.`
        }
    },
    policy_end_date: {
        type: String,
        required: [true, 'policy_start_date is required.'],
        validate: {
            // YYYY-MM-DD
            validator: (date) => /^\d{4}-\d{2}-\d{2}$/.test(date),
            message: props => `${props.value} is not a valid policy_end_date.`
        }
    },
    csr: String,
    account_name: { type: String, required: [true, 'account_name is required.'] },
    first_name: { type: String, required: [true, 'first_name is required.'] },
    last_name: { type: String, required: [true, 'last_name is required.'] },
    account_type: String,
    dob: {
        type: String,
        required: [true, 'policy_start_date is required.'],
        validate: {
            // YYYY-MM-DD
            validator: (dob) => /^\d{4}-\d{2}-\d{2}$/.test(dob),
            message: props => `${props.value} is not a valid dob.`
        }
    },
    phone: {
        type: String,
        required: [true, 'phone is required.'],
        validate: {
            validator: (phone) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone),
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: [true, 'email is required.'],
        validate: {
            validator: (email) => /\S+@\S+\.\S+/.test(email),
            message: props => `${props.value} is not a valid email.`
        }
    },
    gender: String,
    address: {
        address: { type: String, default: null, required: [true, 'address is required.'] },
        state: { type: String, default: null, required: [true, 'state is required.'] },
        city: { type: String, default: null, required: [true, 'city is required.'] },
        zip: {
            type: String,
            required: [true, 'zip is required.'],
            validate: {
                validator: (zip) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip),
                message: props => `${props.value} is not a valid zip.`
            }
        }
    },
    primary: String,
    applicant_id: { type: String, required: [true, 'applicant_id is required.'] },
    agency_id: { type: String, required: [true, 'agency_id is required.'] },
    has_active_client_policy: String
});

const policy = mongoose.model('policy', policy_schema);

export { policy };