# MyHome

## Project Description
The **MyHome** is a web application designed to assist students in finding rental properties near Lakehead University. The platform connects students with landlords, allowing users to browse available properties and manage their profiles easily.

---

## Features
1. **User Authentication**:
   - Users can sign up with their name, email (must end with `@lakeheadu.ca`), and password.
   - Login functionality with session-based authentication.

2. **Property Listings**:
   - View available houses with details such as title, description, location, price, and the number of bedrooms and bathrooms.
   - "Interested" button to ping landlords, and a "Remove" button to eliminate unwanted listings from the view.

3. **Profile Management**:
   - Users can view and update their profile information.

4. **Sign Out**:
   - Secure sign-out functionality to end the session and redirect to the login page.

---

## Technologies Used
- **Frontend**:
  - Next.js for server-side rendering and React-based UI.
  - Tailwind CSS for styling.
- **Backend**:
  - API routes in Next.js for authentication and data fetching.
  - MSSQL for data storage and queries.
- **Database**:
  - Tables for storing user and property details.
  - Complex SQL queries for fetching and managing data.
- **Session Management**:
  - Cookies for secure session storage.

---

## Setup and Installation

### 1. Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or higher)
- NPM or Yarn
- MSSQL server

### 2. Install dependencies
npm install

### 3. Configure Environment Variables
Create a .env.local file in the project root with the following keys:
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_SERVER=<your-database-server>
DB_DATABASE=<your-database-name>
SESSION_PASSWORD=<your-session-password>

### 4. Run the Development Server
npm run dev 
The application will be accessible at http://localhost:3000.

### 5. Access the Login Page
Navigate to:
http://localhost:3000/login
This will take you to the login page.

# How it works:
## Sign-Up
Navigate to the Sign-Up Page.
Enter your name, email (must end with @lakeheadu.ca), and password.
Upon successful registration, the user is redirected to the Home Page.

## Login
Enter your registered email and password on the Login Page.
Successful login redirects to the Home Page.

## Home Page
Displays property listings fetched from the Houses table.
Users can interact with listings using:
Interested Button: Marks the property as "interested."
Remove Button: Removes the listing from the view.

## Profile Page
View and update your profile information.

## Sign-Out
Ends the session and redirects to the Login Page.