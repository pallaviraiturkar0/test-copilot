# Setup Instructions for Social App

## Prerequisites
- Node.js (version 14 or higher)
- MongoDB (installed locally or a MongoDB Atlas account)

## Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pallaviraiturkar0/test-copilot.git
   cd test-copilot
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment Variables**:
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
4. **Start the Server**:
   ```bash
   npm start
   ```

## Features
- **User Authentication**: Implemented with secure JWT tokens.
- **Real-time Chat**: Integrated using Socket.IO for instant messaging.
- **Notifications**: Real-time notifications for user activities.

## Additional Notes
- Ensure MongoDB is running before starting the application.
- For more customization, refer to the README.md file.