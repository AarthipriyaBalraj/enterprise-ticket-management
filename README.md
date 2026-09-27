# Enterprise Ticket Management System

A backend REST API for managing enterprise support tickets using Node.js, Express.js, and PostgreSQL.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (RBAC)
- Create tickets
- View all tickets
- View ticket by ID
- Assign tickets to users
- Update ticket status
- Delete tickets
- Input validation
- Password hashing using bcryptjs
- Security using Helmet
- CORS support
- API rate limiting
- Morgan request logging
- Swagger API documentation

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcryptjs
- Swagger
- Git & GitHub

## Project Structure

```text
enterprise-ticket-management/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authcontroller.js
│   │   └── ticketcontroller.js
│   │
│   ├── middleware/
│   │   ├── authmiddleware.js
│   │   └── rolemiddleware.js
│   │
│   ├── models/
│   │   ├── ticketmodel.js
│   │   └── usermodel.js
│   │
│   ├── repositories/
│   │   ├── ticketRepository.js
│   │   └── userRepository.js
│   │
│   ├── routes/
│   │   ├── authroutes.js
│   │   └── ticketroutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── ticketService.js
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   ├── app.js
│   └── swagger.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


## Live Deployment

### API
https://enterprise-ticket-management-1.onrender.com

### Swagger API Documentation
https://enterprise-ticket-management-1.onrender.com/api-docs/