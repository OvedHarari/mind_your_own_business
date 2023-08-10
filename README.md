# Mind Your Own Business

This project was writen on React with bootstrapped.

## Project Description

The project is a platform that connects businesses with potential customers in a user-friendly way.
Users can Sign up to platform as casual users or business users and an Admin user can grant Admin permition to other users.

### Users for testing:

1. Casual user - casual1@test.com , password- 12345678
2. Business user - business1@test.com , password- 12345678
3. Casual user - admin1@test.com , password- 12345678
4. Blocked user - blocked1@test.com , password- 12345678

### Basic functionality:

1. users can sign up as casual users or business users
2. password validation regex on signup/login
3. form validation using formik with yup.
4. user profile image conditionat renderin acording to gender (in case the user did not add image URL)
5. Dark\Light mode support and responsive display.
6. Google Geocoder service upon new business card creation and\or update.
7. Google Maps service on buliness details card marking business location.

### Casual users functionality:

1. View existing business cards and details.
2. Mark favorite business cards and view them/remuve them on the main/fav tabs.

### business users functionality:

1. All Casual users functionality is available.
2. Ability to add new business cards including all CRAD functionality.
3. Additional My Cards tab to manage you own cards.

### Admin users functionality:

1. All Business users functionality is available.
2. Additional Admin tab - to manage all existing users.
3. Update Users Details
4. Changing users role (casual/ business/ Admin).
5. Block user from accessing the platform.
6. Delete Users.

## Getting Started

### Installing

1. Run 'npm install' to get all required modules and installations

### Environment variables

1. REACT_APP_API="http://localhost:8000"
2. REACT_APP_GOOGLE_MAPS_API_KEY="ADD_YOUR_GOOGLE_API_KEY" || Contact Oved Harari at [ovedhar@gmail.com] to get a API key

### Starting the project

To get the project up and running, run the following in different Terminals

1. Terminal One: "json-server --watch db.json --port 8000"
1. Terminal Two: "npm start"

## Authors

Oved Harari
[ovedhar@gmail.com](https://oved-harari-portfolio.netlify.app)

## Version History

- v1.0
