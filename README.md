BlueTrack CRM - Customer Relationship Management System

A full-stack web application for managing customer relationships, built using the MERN stack (MongoDB, Express.js, React.js, Node.js).


OVERVIEW

BlueTrack CRM is a comprehensive customer management solution that allows businesses to efficiently handle customer data, track interactions, and manage relationships. The application features secure user authentication, complete CRUD operations for customer records, and a responsive user interface designed for ease of use.


FEATURES

User Management
- Secure user registration and login system
- JWT-based authentication
- Password encryption using bcrypt
- Session management with token-based authorization

Customer Management
- Create new customer records with detailed information
- View all customers in an organized directory
- Update existing customer information
- Delete customer records with confirmation
- Real-time customer count statistics

User Interface
- Clean and modern design with professional blue color scheme
- Responsive layout that works on desktop, tablet, and mobile devices
- Intuitive navigation and user-friendly forms
- Real-time form validation and error handling
- Loading states and user feedback


TECHNOLOGY STACK

Frontend
- React 18 - JavaScript library for building user interfaces
- React Router DOM 6 - Declarative routing for React applications
- Axios - Promise-based HTTP client for API requests
- Vite - Next-generation frontend build tool
- CSS3 - Custom styling with modern design patterns

Backend
- Node.js - JavaScript runtime environment
- Express.js 5 - Web application framework
- MongoDB - NoSQL database for data persistence
- Mongoose - MongoDB object modeling for Node.js
- JSON Web Token - Secure authentication mechanism
- bcryptjs - Password hashing library


PROJECT STRUCTURE

The project is organized into two main directories:

client/ - Frontend application
  src/
    components/ - Reusable React components (Logo, CustomerModal, ProtectedRoute)
    pages/ - Page-level components (Register, Login, Dashboard)
    utils/ - Utility functions and configurations (api.js)
    App.jsx - Main application component
    main.jsx - Application entry point
    index.css - Global styles
  index.html
  package.json
  vite.config.js

server/ - Backend application
  models/ - Database schemas (User.js, Customer.js)
  routes/ - API route handlers (authRoutes.js, customerRoutes.js)
  middleware/ - Custom middleware (authMiddleware.js)
  server.js - Server configuration
  package.json
  .env - Environment variables


INSTALLATION AND SETUP

Prerequisites
You will need the following installed on your system:
- Node.js (version 16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

Backend Setup

1. Navigate to the server directory using your terminal
2. Install all required dependencies by running: npm install
3. Create a .env file in the server directory with these variables:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
4. Start the development server: npm run dev
5. The backend will run on http://localhost:5000

Frontend Setup

1. Open a new terminal and navigate to the client directory
2. Install dependencies: npm install
3. Start the development server: npm run dev
4. The frontend will run on http://localhost:5173


API ENDPOINTS

Authentication Routes

POST /api/auth/register - Register a new user
  Request body: name, email, password
  Response: Success message

POST /api/auth/login - Authenticate user
  Request body: email, password
  Response: JWT token and user information

Customer Routes (All routes require authentication)

GET /api/customers - Retrieve all customers for authenticated user
  Response: Array of customer objects

POST /api/customers - Create new customer
  Request body: customerName, email, phone, company
  Response: Created customer object

PUT /api/customers/:id - Update customer by ID
  Request body: customerName, email, phone, company
  Response: Updated customer object

DELETE /api/customers/:id - Delete customer by ID
  Response: Deletion confirmation message


DATABASE SCHEMA

User Schema
Fields: name (String), email (String, unique), password (String, hashed)

Customer Schema
Fields: customerName (String), email (String), phone (String), company (String), createdBy (ObjectId reference to User)


DEPLOYMENT

Frontend Deployment on Vercel

1. Push your code to a GitHub repository
2. Go to Vercel dashboard and import your project
3. Configure the build settings as follows:
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
4. Add environment variable: VITE_API_URL with value pointing to your backend API URL (must end with /api)
5. Deploy the application

Backend Deployment on Render

1. Ensure your code is pushed to GitHub
2. Create a new Web Service in Render dashboard
3. Configure the service:
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
4. Add the following environment variables:
   MONGO_URI: Your MongoDB connection string
   JWT_SECRET: Secret key for JWT
   PORT: 5000
5. Deploy the service

Live Application URLs

-Frontend: https://crm-assignment-xi.vercel.app
-Backend: https://bluetrack-crm-backend.onrender.com

The application is fully functional and deployed for demonstration and educational purposes.
