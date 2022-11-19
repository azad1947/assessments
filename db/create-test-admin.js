import _ from 'lodash';
import { admin_model } from '../model/admin-schema.js';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

config();

const test_admin = {
    first_name: 'test',
    last_name: 'admin',
    user_type: 'admin',
    phone: 1234567890,
    email: 'admin@admin.com',
    password: 'test@123'
}

/*
    when the app runs first time, it will create a super user with the above details.
*/

export const create_test_admin = async () => {
    let admin = await admin_model.findOne({ phone: test_admin.phone });
    if (_.isEmpty(admin)) {
        test_admin.user_id = uuidv4();
        await admin_model.create(test_admin);
    }

    console.log('\x1b[33mplease use below (phone / email & password) to login.! \x1b[0m');
    console.log(`\x1b[32mphone - ${test_admin.phone}`);
    console.log(`\x1b[32memail - ${test_admin.email}`);
    console.log(`\x1b[32mpassword - ${test_admin.password}`);

}
