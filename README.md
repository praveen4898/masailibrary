# Bookstore API

This API provides functionality for managing books, user authentication, and placing orders in a bookstore.

## Endpoints

### Register User

- **Method**: POST
- **Endpoint**: /api/register
- **Description**: Allows customers to register. Passwords are hashed before storing.
- **Status Code**: 201
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "isAdmin": "boolean"
  }
- **Response**:
   {
  "msg": "New user has been registered successfully"
  }


### Login User
- **Method**: POST
- **Endpoint**: /api/login
- **Description**: Allows customers to login. Hashed passwords are compared to login.
- **Status Code**: 201
- **Request Body**:
  ```json
  {
  "email": "string",
  "password": "string"
  }
 - **Response**:
  {
  "msg": "User logged in successfully",
  "token": "string"
}









