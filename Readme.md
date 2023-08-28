# Data Entry Application API Endpoints

This README file provides an overview of the API endpoints for the Data Entry Application. These endpoints are used to manage user authentication, user data, and password reset functionalities.

**Endpoint:** `https://mahallu-server.vercel.app/api`

## User Authentication and Management

### Sign Up
**Endpoint:** `POST /signup`
**Description:** Allows users to create a new account by providing their details.

### Log In
**Endpoint:** `POST /login`
**Description:** Enables users to log into their accounts by providing valid credentials.

### Update User Profile
**Endpoint:** `PATCH /me/:id`
**Description:** Allows users to update their own profile information. Requires authentication.

### Get All Users
**Endpoint:** `GET /`
**Description:** Retrieves a list of all users. This endpoint is restricted to users with 'superAdmin' role. Requires authentication.

### Get User by ID
**Endpoint:** `GET /:id`
**Description:** Retrieves user information by their user ID. Requires authentication.

### Forgot Password
**Endpoint:** `POST /forgot-password`
**Description:** Initiates the process to reset a forgotten password. An email is sent to the user with instructions.

### Reset Password
**Endpoint:** `POST /reset-password`
**Description:** Allows users to reset their password using a reset token received via email. Requires authentication.


## Mahallu Management

### Create Mahallu
**Endpoint:** `POST /`
**Description:** Creates a new Mahallu entry. Only accessible to users with 'superAdmin' role. Requires authentication.

### Get All Mahallu
**Endpoint:** `GET /`
**Description:** Retrieves a list of all Mahallu records.

### Get Mahallu Details by ID
**Endpoint:** `GET /details/:id`
**Description:** Retrieves detailed information about a specific Mahallu by its ID. Requires authentication.

### Get All Mahallu Overview
**Endpoint:** `POST /details/`
**Description:** Retrieves an overview of all Mahallu records, including summary information. Requires authentication.

### Get Mahallu by ID
**Endpoint:** `GET /:id`
**Description:** Retrieves a specific Mahallu record by its ID.

### Update Mahallu
**Endpoint:** `PATCH /:id`
**Description:** Updates information of a specific Mahallu. Accessible to users with 'superAdmin' role. Requires authentication.

### Delete Mahallu
**Endpoint:** `DELETE /:id`
**Description:** Deletes a specific Mahallu entry. Accessible to users with 'superAdmin' role. Requires authentication.

## Entry Management

### Create Entry
**Endpoint:** `POST /`
**Description:** Creates a new entry. Only accessible to users with 'admin' or 'superAdmin' roles. Requires authentication.

### Get All Entries
**Endpoint:** `GET /`
**Description:** Retrieves a list of all entries. This endpoint is restricted to users with 'superAdmin' role. Requires authentication.

### Get My Mahallu Entries
**Endpoint:** `GET /my-mahallu/data`
**Description:** Retrieves entries specific to the user's Mahallu. Accessible to users with 'admin' role. Requires authentication.

### Get Home Data
**Endpoint:** `GET /home/data`
**Description:** Retrieves data for the application's home page. Requires authentication.

### Get Entry by ID
**Endpoint:** `GET /:id`
**Description:** Retrieves a specific entry by its ID.

### Update Entry
**Endpoint:** `PATCH /:id`
**Description:** Updates information of a specific entry. Accessible to users with 'admin' role. Requires authentication.

### Delete Entry
**Endpoint:** `DELETE /:id`
**Description:** Deletes a specific entry. Accessible to users with 'admin' role. Requires authentication.

## District API Routes

### Create District
**Endpoint:** `POST /`
**Description:** Creates a new district. Only accessible to users with 'superAdmin' role. Requires authentication.

### Get All Districts
**Endpoint:** `GET /`
**Description:** Retrieves a list of all district records.

### Get District by ID
**Endpoint:** `GET /:id`
**Description:** Retrieves a specific district by its ID.

### Update District by ID
**Endpoint:** `PUT /:id`
**Description:** Updates information of a specific district by its ID.

### Delete District by ID
**Endpoint:** `DELETE /:id`
**Description:** Deletes a specific district by its ID.