# Employee Review System

## Introduction

The Employee Review System is a web application designed to facilitate the performance review process within an organization. It allows managers to review their employees and employees to provide feedback on their peers.

## Features

- **User Authentication**: Secure login and registration for employees and managers.
- **Role-Based Access Control**: Different functionalities for managers and employees.
- **Review Management**: Managers can create, update, and delete reviews.
- **Feedback System**: Employees can provide feedback on their peers.
- **Dashboard**: Overview of pending and completed reviews.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB
- **Authentication**: Passport.js

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bajarappa/employee-review-system
   ```
2. Navigate to the project directory:
   ```bash
   cd employee-review-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=3000
     DB_URI=your_mongodb_uri
     SESSION_SECRET=your_session_secret
     ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

### Can I edit a review after submitting it?

No, once a review is submitted, it cannot be edited. Please ensure all information is correct before submitting.

### Who can see the reviews?

Only managers and the respective employees can see the reviews. Peer feedback is anonymized.

## Support

If you encounter any issues or have any questions, please open an issue on the [GitHub repository](https://github.com/yourusername/employee-review-system/issues).

## Roadmap

Future enhancements for the Employee Review System include:

- Adding email notifications for review submissions.
- Implementing a more advanced analytics dashboard.
- Integrating with third-party HR systems.
