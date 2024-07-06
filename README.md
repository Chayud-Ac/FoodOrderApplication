# FoodOrderApplication

Building food order full stack application including User Interface and Admin panel using stack of reactJS , MongoDB , Express , Node JS& Stripe
This is my first project for building full stack application the structure of the project might not that good but you can explore more  details of each part in Figma file here which I created diagram for each section of the project
Figma : https://www.figma.com/board/WlrPXfQbbnU9d4f7TYk8D6/FoodOrderApplication?t=Fg2r5CC0ziyGBUtd-0


## Features

### User Features

- **Sign Up**: Users can create a new account. 
- **Login**: Users can log in to their existing account.
- **Order Food**: Users can browse the menu and place orders.
- **Make Payment**: Users can make payments for their orders.
- **Track Order**: Users can track the status of their orders in real-time.

### Admin Features

- **Add Item**: Admins can add new food items to the menu.
- **Delete Item**: Admins can delete existing food items from the menu.
- **List Items**: Admins can view a list of all available food items.
- **Update Order Tracking**: Admins can update the status of orders 


## Project Structure

The project is divided into three main parts:

1. **Frontend**: The user interface built with React.
2. **Admin Panel**: The admin interface built with React.
3. **Backend**: The server-side application built with Node.js , Express , and MongoDB


## Dependencies of each section
1. **Frontend**:  axios , react , react-dom , react-router-dom , react-toastify
2. **admin**:  axios , react , react-dom , react-router-dom , react-toastify
3. **admin**:  bcrypt , cors , dotenv , express , jsonwebtoken , mongoose , multer , nodemon , stripe , validator




# Setup the Project

## mongoDB
Firstly , vist the mongodb website and set up the database and the connection key
as well as visit the stripe website to create the API test key


## frontend setup and start

```bash
cd frontend/
npm install
npm run dev
```

## admin setup and start

```bash
cd admin/
npm install
npm run dev
```

## backend setup and start
create .env in backend root directory to store environment variable and credential data

MONGO_URI= "xxxxxxxxxxxxxxxxxxxxxxx"
PORT = "xxxxxxxxxxxxxxxxxxxxxx"
JWT_SECRET="xxxxxxxxxxxxxxxx"
STRIPE_SECRET_KEY="xxxxxxxxxxxxxxxxxxxxx"
SUPERADMIN_EMAIL="xxxxxxxxxxxxxxxxx"
SUPERADMIN_PASSWORD="xxxxxxxxxxxxxxxxxxxxx"

```bash
cd backend/
npm install
npm run server
```




