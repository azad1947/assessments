import mongoose from 'mongoose';

const { Schema } = mongoose;

const carrier_schema = new Schema({
    /*I am making company name unique. because two company can not have same name
     and as there is no unique id for the company given in the data.csv. So it
     will help to uniquely identify and insert data in this collection.
    */
    company_name: { type: String, unique: true, required: [true, 'company name is required.'] },
    company_id: { type: String, unique: true, },
    lobs: [{
        lob: { type: String, required: [true, 'lob is required.'] },
        lob_id: { type: String, unique: true }
    }]
});

const carrier = mongoose.model('carrier', carrier_schema);

export { carrier };