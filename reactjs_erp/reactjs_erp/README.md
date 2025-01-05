# Authentication System Application

## SETUP

### 1. Clone the Repository:
```bash
git clone <repository-url>
```

### 2. If it's a Zip folder, unzip it and go to the **REACTJS_ERP MAIN FOLDER**.

### 3. Before running, check if Node.js is installed.

### 4. Navigate to the `cd Front-end` directory:
   - Run `npm start` (This will open the frontend login screen; before clicking the login, make sure to run the backend).

### 5. Start the local server using **XAMPP** [MySQL].

### 6. Create a database named `registration`:
   - Import the attached SQL file or run the SQL commands in your localhost database software (HeidiSQL or any other software).

### 7. Navigate to the `cd backend` directory:
   - Run `npm start` (Now you can log in to use the authentication system).

---

## Features
- Users can input their username and new password to reset their password.
- The backend checks if the username exists and then updates the password.
- Success and error messages are displayed after the request.
- Role-based login features will be added.
- Role-based sidebar will be added.

---

## Frontend

### Technologies Used
- **React**: For building the user interface.
- **React Bootstrap**: For styling and responsive layout.

---

## Backend

### Technologies Used
- **Node.js**: For backend development.
- **Express.js**: For routing and server-side logic.
