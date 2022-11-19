import { Router } from 'express';
import { async_handler } from './middleware.js';
import { admin_auth_handler, admin_login_handler } from './admin-handlers.js';
import { upload_handler } from './upload-handler.js';
import {
    create_new_user_handler,
    delete_user_handler,
    fetch_user_handler,
    update_user_handler
} from './user-handler.js';
import { create_policy_handler,
     delete_policy_handler, 
     fetch_policy_handler,
      update_policy_handler } from './policy-handler.js';
import { create_account_handler,
     delete_account_handler,
      fetch_account_handler,
       update_account_handler } from './account-handler.js';

const router = Router();

router.post('/admin/login', admin_login_handler);

router.use(async_handler(admin_auth_handler));

// upload csv data
router.post('/upload', upload_handler);

// create new user
router.post('/create/user', async_handler(create_new_user_handler));

// fetch user
router.get('/fetch/user', async_handler(fetch_user_handler));

// update user
router.put('/update/user', async_handler(update_user_handler));

// delete user
router.delete('/delete/user', async_handler(delete_user_handler));

// create account 
router.post('/create/user/account', async_handler(create_account_handler));

// fetch account
router.get('/fetch/user/account', async_handler(fetch_account_handler));

// update account
router.put('/update/user/account', async_handler(update_account_handler));

// delete account
router.delete('/delete/user/account', async_handler(delete_account_handler));


// create policy
router.post('/create/policy', async_handler(create_policy_handler));

// fetch policy
router.get('/fetch/policy', async_handler(fetch_policy_handler));

// update policy handler
router.put('/update/policy', async_handler(update_policy_handler));

// delete policy
router.delete('/delete/policy', async_handler(delete_policy_handler));


export default router;