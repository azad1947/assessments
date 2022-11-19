import _ from 'lodash';
import { policy } from './../model/policy-schema.js';
import csvtojson from 'csvtojson';
import { accounts, users } from '../model/user-schema.js';
import { v4 as uuidv4 } from 'uuid';
import { carrier } from '../model/carrier-schema.js';
import { lob } from '../model/lob-schema.js';
import { agents } from '../model/agent-schema.js';


export const upload_handler = async (req, res, next) => {
    try {
        const str = req.files.file.data.toString();
        const json_data = await csvtojson().fromString(str);

        for (const obj of json_data) {
            /*
            I have found few fields in 2-3 data in data.csv are not correct.
            So here I am skiping those data instead of commenting the validation in schema 
            for those fields.
            */
            const is_phone_correct = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(obj.phone);
            const is_zip_correct = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(obj.zip);
            const is_firstname_correct = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(obj.firstname);

            if (is_phone_correct && is_firstname_correct && is_zip_correct && obj.address && obj.city && obj.state) {
                // correcting few fields
                obj.applicant_id = obj['Applicant ID'];
                delete obj['Applicant ID'];

                obj.has_active_client_policy = obj['hasActive ClientPolicy'];
                delete obj['hasActive ClientPolicy'];

                obj.user_type = obj.userType;
                delete obj.userType;

                // here firstname is like 'Tatum Washinton' 
                const arr = obj.firstname.split(' ');
                obj.first_name = arr[0];
                obj.last_name = arr[arr.length - 1];

                delete obj.firstname;

                obj.address = {
                    address: obj.address,
                    state: obj.state,
                    city: obj.city,
                    zip: obj.zip
                }

                delete obj.state;
                delete obj.city;
                delete obj.zip;

                // inserting data into lob collection
                let existing_lob = await lob.findOne({ lob: obj.category_name });
                if (_.isEmpty(existing_lob)) {
                    const doc = { lob: obj.category_name, lob_id: uuidv4() };
                    existing_lob = await lob.create(doc);
                }

                // inserting data into carrier collection
                let existing_carrier = await carrier.findOne({ company_name: obj.company_name });
                if (_.isEmpty(existing_carrier)) {
                    const doc = {
                        company_name: obj.company_name,
                        company_id: uuidv4(),
                        lobs: [{
                            lob: existing_lob.lob,
                            lob_id: existing_lob.lob_id
                        }]
                    }
                    existing_carrier = await carrier.create(doc);
                } else {
                    const doc = existing_carrier.lobs.find((lob) => lob.lob_id === existing_lob.lob_id);
                    if (_.isEmpty(doc)) {
                        existing_carrier.lobs.push({
                            lob: existing_lob.lob,
                            lob_id: existing_lob.lob_id
                        })
                        await existing_carrier.save();
                    }
                }


                // inserting user info into users collection
                let existing_user = await users.findOne({ phone: obj.phone });
                if (_.isEmpty(existing_user)) {
                    existing_user = await users.create({ ...obj, user_id: uuidv4() });
                }

                // inserting data into policy collection
                let existing_policy = await policy.findOne({ policy_number: obj.policy_number });
                if (_.isEmpty(existing_policy)) {
                    existing_policy = await policy.create({
                        ...obj,
                        applicant_id: existing_user.user_id,
                        agency_id: existing_carrier.company_id
                    });
                }

                // inserting data into accounts
                let existing_account = await accounts.findOne({ phone: obj.phone });
                if (_.isEmpty(existing_account)) {
                    const doc = {
                        account_name: obj.account_name,
                        account_type: obj.account_type,
                        user_id: existing_user.user_id,
                        account_id: uuidv4(),
                        phone: obj.phone,
                        user_info: existing_user,
                        policy: [{
                            policy_type: existing_policy.policy_type,
                            policy_number: existing_policy.policy_number,
                            premium_amount_written: existing_policy.premium_amount_written,
                            premium_amount: existing_policy.premium_amount,
                            company_name: existing_policy.company_name,
                            category_name: existing_policy.category_name,
                            policy_start_date: existing_policy.policy_start_date,
                            policy_end_date: existing_policy.policy_end_date,
                            agency_id: existing_carrier.company_id
                        }]
                    }
                    existing_account = await accounts.create(doc);
                } else {
                    const doc = existing_account.policy.find((doc) => doc.policy_number === existing_policy.policy_number);
                    if (_.isEmpty(doc)) {
                        existing_account.policy.push({
                            policy_type: existing_policy.policy_type,
                            policy_number: existing_policy.policy_number,
                            premium_amount_written: existing_policy.premium_amount_written,
                            premium_amount: existing_policy.premium_amount,
                            company_name: existing_policy.company_name,
                            category_name: existing_policy.category_name,
                            policy_start_date: existing_policy.policy_start_date,
                            policy_end_date: existing_policy.policy_end_date,
                            agency_id: existing_carrier.company_id
                        })
                        await existing_account.save();
                    }
                }

                // insert data into agent collection
                /* 
                 there is no unique id for the agent in the data, only agent name is given.
                 two people can have same name. So I should not use the name for searching, inserting data into agent.  
                 I know this is wrong, but there is no other option for the given data.
                */
                let existing_agent = await agents.findOne({ first_name: obj.agent.split(' ')[0], last_name: obj.agent.split(' ')[1] });
                if (_.isEmpty(existing_agent)) {
                    const doc = {
                        first_name: obj.agent.split(' ')[0],
                        last_name: obj.agent.split(' ')[1],
                        agent_id: uuidv4()
                    }
                    await agents.create(doc);
                }

            }
        }

        res.status(200).json({ msg: 'data uploaded successfully.' })
    } catch (err) {
        next(err);
    }
}