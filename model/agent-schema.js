import mongoose from 'mongoose';

const { Schema } = mongoose;

const agent_schema = new Schema({
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
    },
    agent_id: {
        type: String,
        unique: true
    },
    user_type: { type: String, default: 'agent' },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now() },
});

const agents = mongoose.model('agent', agent_schema);

export { agents };