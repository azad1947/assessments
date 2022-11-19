#run the app
1. `npm run dev` it will send the error stack
2. `npm run prod` it will not send the error stack

once the app runs, it will generate a test user.
copy the creds logged on console and login `http://localhost:3000/api/v1/admin/login` to get the `auth_token` and send in the header as `authorization: Bearer auth_token`  

`curl --location --request POST 'http://localhost:3000/api/v1/admin/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@admin.com",
    "password": "test@123"
}'`

# upload data.csv
route `http://localhost:3000/api/v1/upload`  
upload data.csv file  
`curl --location --request POST 'http://localhost:3000/api/v1/upload' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--form 'file=@"/home/azad/Downloads/data-sheet.csv"'`

# user apis
1. fetch user `http://localhost:3000/api/v1/fetch/user`  
method: 'GET'  
body -  `{phone: phone}`  


2. create user -> `http://localhost:3000/api/v1/create/user`    
body - `{
     {
        "first_name": "Jacinto",
        "last_name": "Deland",
        "phone": "6880282402",
        "email": "warrior@comcast.net",
        "dob": "1980-07-11",
        "gender": "",
        "address": {
            "address": "744 Peters Creek Pkwy Uppr B",
            "state": "NC",
            "city": "Winston Salem",
            "zip": "27103-3874"
        }
}`   
`curl --location --request POST 'http://localhost:3000/api/v1/create/user' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name": "Lura",
    "last_name": "Lucca",
    "phone": "8677356559",
    "email": "madler@yahoo.ca",
    "dob": "1960-02-11",
    "gender": "",
    "address": {
        "address": "170 MATTHIAS CT",
        "state": "NC",
        "city": "MOCKSVILLE",
        "zip": "27028"
    }
}'`

3. update user - `http://localhost:3000/api/v1/update/user`  
method - `PUT`  
body: `{
    phone: phone,
    update: {update object}
}`   
`curl --location --request PUT 'http://localhost:3000/api/v1/update/user' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone": "8677356559",
    "update": {
        "first_name": "Lura",
        "last_name": "Lucca",
        "email": "madler@yahoo.ca",
        "dob": "1960-02-11",
        "gender": "",
        "address": {
            "address": "170 MATTHIAS CT",
            "state": "NC",
            "city": "MOCKSVILLE",
            "zip": "27028"
        }
    }
}'`

4. delete user - `http://localhost:3000/api/v1/delete/user`  
method - `DELETE`  
body - `{
    phone: phone
}`  
`curl --location --request DELETE 'http://localhost:3000/api/v1/delete/user' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone": "8677356559"
}'`

# user account api
1. create account - `http://localhost:3000/api/v1/create/user/account`  
method - `POST`  
body {}  
`curl --location --request POST 'http://localhost:3000/api/v1/create/user/account' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone": "8677356559",
    "first_name": "Lura",
    "last_name": "Lucca",
    "email": "madler@yahoo.ca",
    "dob": "1960-02-11",
    "account_type":"personal",
    "account_name":"abcd bcd",
    "gender": "",
    "address": {
        "address": "170 MATTHIAS CT",
        "state": "NC",
        "city": "MOCKSVILLE",
        "zip": "27028"
    }
}'`  

2. fetch account - `http://localhost:3000/api/v1/fetch/user/account`   
method - `GET`  
`curl --location --request GET 'http://localhost:3000/api/v1/fetch/user/account' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone": "8677356559"
}'`

3. update account - `http://localhost:3000/api/v1/update/user/account`  
Method - `PUT`  
`curl --location --request PUT 'http://localhost:3000/api/v1/update/user/account' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone": "8677356559",
    "update": {
        "first_name": "Lura",
        "last_name": "Lucca",
        "email": "madler@yahoo.ca",
        "dob": "1960-02-11",
        "account_type": "personal",
        "account_name": "abcd bcd",
        "gender": "",
        "address": {
            "address": "170 MATTHIAS CT",
            "state": "NC",
            "city": "MOCKSVILLE",
            "zip": "27028"
        }
    }
}'`

4. delete account `curl --location --request DELETE 'http://localhost:3000/api/v1/delete/user/account' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone": "8677356559"
}'`

# policy apis
1. create policy `curl --location --request POST 'http://localhost:3000/api/v1/create/policy' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "agent": "Alex Watson",
    "user_type": "Active Client",
    "policy_mode": 12,
    "producer": "Brandie Placencia",
    "policy_number": "YEEX9MOIBU7X",
    "premium_amount_written": "",
    "premium_amount": "1180.83",
    "policy_type": "Single",
    "company_name": "Integon Gen Ins Corp",
    "category_name": "Commercial Auto",
    "policy_start_date": "2018-11-02",
    "policy_end_date": "2019-11-02",
    "csr": "Tami Ellison",
    "account_name": "Lura Lucca & Owen Dodson",
    "first_name": "Lura",
    "last_name": "Lucca",
    "account_type": "Commercial",
    "dob": "1960-02-11",
    "phone": "8677356559",
    "email": "madler@yahoo.ca",
    "gender": "",
    "address": {
        "address": "170 MATTHIAS CT",
        "state": "NC",
        "city": "MOCKSVILLE",
        "zip": "27028"
    },
    "primary": "",
    "applicant_id": "9bba57e8-ba3d-4ed1-9dac-4376ab30fff1",
    "agency_id": "0120c6a9-b3bc-46c8-b2cb-7c63f73b1914",
    "has_active_client_policy": "",
    "__v": 0
}'`   

2. fetch policy `curl --location --request GET 'http://localhost:3000/api/v1/fetch/policy' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "policy_number": "YEEX9MOIBU7X"
}'`  

3. delete policy `curl --location --request DELETE 'http://localhost:3000/api/v1/delete/policy' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "policy_number": "YEEX9MOIBU7X"
}'`   

4. update policy `curl --location --request PUT 'http://localhost:3000/api/v1/update/policy' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjMzZTBhMjItMTAzZS00MjY4LWFjY2MtNDg2ZjRjNWQwMmUxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJsb2dnZWRfaW4iOnRydWUsImlhdCI6MTY2ODg4MjM0OSwiZXhwIjoxNjY5NDg3MTQ5fQ.NEyxTqh9ITx_DVtA1lqhjxE-ULGVWRh8QOV6mswxfxA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "policy_number": "YEEX9MOIBU7X",
    "update": {
        "agent": "Alex Watson",
        "user_type": "Active Client",
        "policy_mode": 12,
        "producer": "Brandie Placencia",
        "premium_amount_written": "",
        "premium_amount": "1180.83",
        "policy_type": "Single",
        "company_name": "Integon Gen Ins Corp",
        "category_name": "Commercial Auto",
        "policy_start_date": "2018-11-02",
        "policy_end_date": "2019-11-02",
        "csr": "Tami Ellison",
        "account_name": "Lura Lucca & Owen Dodson",
        "first_name": "Lura",
        "last_name": "Lucca",
        "account_type": "Commercial",
        "dob": "1960-02-11",
        "phone": "8677356559",
        "email": "madler@yahoo.ca",
        "gender": "",
        "address": {
            "address": "170 MATTHIAS CT",
            "state": "NC",
            "city": "MOCKSVILLE",
            "zip": "27028"
        },
        "primary": "",
        "applicant_id": "9bba57e8-ba3d-4ed1-9dac-4376ab30fff1",
        "agency_id": "0120c6a9-b3bc-46c8-b2cb-7c63f73b1914",
        "has_active_client_policy": "",
        "__v": 0
    }
}'`



