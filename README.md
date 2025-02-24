# Capstone Server - Ecommerce Website API

This is the server-side application for the Ecommerce Website inspired by Amazon. It is built with **Node.js**, **Express**, **JWT**, **Bcrypt**, **Mongoose**, and **Cloudinary**. This server provides RESTful API endpoints that power the frontend application of the project.

> **Note:** This project is part of the capstone project for Strive School and is under active development.

## Live Demo

Check out the deployed server here:  
[https://onestopshop-next.vercel.app](https://onestopshop-next.vercel.app)

## Client Repository

The corresponding client-side code can be found here:  
[Capstone Client Repository](https://github.com/JokeryEU/capstone_client)

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This server application handles the backend logic for the ecommerce website. It manages user authentication, product management, order processing, and integrates with third-party services like Cloudinary for image storage. JWT and Bcrypt are utilized to secure authentication and user data.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express:** Web framework for building APIs.
- **JWT (JSON Web Tokens):** For secure authentication.
- **Bcrypt:** For hashing passwords.
- **Mongoose:** For interacting with MongoDB.
- **Cloudinary:** For image upload and storage.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JokeryEU/capstone_server.git
   cd capstone_server
   ```
## Install dependencies:
```bash
   npm install
```

## Configuration

   **Environment Variables:**

   - Create a .env file in the root directory of the project.
   - Copy the contents of the provided .env-example file into your .env file.
   - Fill in the necessary configuration values such as:
     - MONGO_URI - MongoDB connection string.
     - JWT_SECRET - Secret key for signing JWT tokens.
     - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET - Cloudinary credentials.
     - Any other required environment variables as specified in the .env-example.

   Example:
```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Usage

To run the server locally:

 1. **Start the server:**
   
 ```bash
 npm start
 ```

The server will run on the specified port (default is usually 5000 or as defined in your environment variables). Access the API endpoints via http://localhost:<PORT>.

2. **Development Mode:**

If you have a tool like Nodemon set up for development, you can start the server in development mode:

```bash
    npm run dev
```

## Project Structure

Below is a high-level overview of the project structure:
```bash
├── src
│   ├── controllers    # API endpoint logic
│   ├── models         # Mongoose models for MongoDB
│   ├── routes         # Express routes
│   ├── middlewares    # Custom middleware (e.g., authentication)
│   └── utils          # Utility functions and helpers
├── test               # Automated tests (if available)
├── .env-example       # Sample environment configuration
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:    
```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes:
```bash
git commit -m "Add your feature or fix"
```
4. Push your branch:
```bash
git push origin feature/your-feature-name
```
5. Open a Pull Request for review.

## License

This project is licensed under the ISC License.
