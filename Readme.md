# Course Management API

## Overview
This project is a **Course Management API** that enables users to register, sign in, view available courses, and purchase them. The application also includes an admin interface for managing users and courses, with proper authentication and authorization.

## Features
- **User Authentication**: Users can sign up and sign in using their credentials, and their data is securely stored with hashed passwords.
- **Course Management**: Admins can create, update, and view courses, while users can purchase and preview courses.
- **User Purchases**: Users can purchase courses, and the system tracks their purchase history.
- **JWT Authentication**: JWT tokens are used to authenticate users and admins, ensuring secure access to the API.

## Recent Changes
### **Express JSON Middleware Added**
- In response to the need for handling incoming JSON requests efficiently, the `express.json()` middleware was added to the application. This enables the server to properly parse incoming requests with JSON payloads.

### **Code Structure and Routes**
- **User Routes** (`/user`): Handles user signup, signin, and viewing purchased courses.
- **Course Routes** (`/course`): Allows users to purchase and preview courses.
- **Admin Routes** (`/admin`): Provides admin functionalities like user management and course management.

### **MongoDB Integration**
- Connected the app to MongoDB using Mongoose, allowing for persistent data storage.
- Data related to users, courses, and purchases is saved and queried from MongoDB.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/oldskoolmoron/course-selling-app.git
