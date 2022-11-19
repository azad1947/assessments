import mongoose from 'mongoose';

const { Schema } = mongoose;

const lob_schema = new Schema({
    lob: { type: String, unique: true, required: true },
    lob_id: { type: String, unique: true }
});

const lob = mongoose.model('lob', lob_schema);

export { lob };