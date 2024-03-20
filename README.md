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


### Get All Books
- **Method**: GET
- **Endpoint**: /api/books
- **Description**: Returns a list of all available books.
- **Status Code**: 200

 - **Response**:
    Array of book objects


### Get Book by ID
- **Method**: GET
- **Endpoint**: /api/books/:id
- **Description**:Returns the details of a specific book identified by its ID.
- **Status Code**: 200
- **Query Parameters**: category (optional), author (optional)
- **Response**: Array of book objects


### Add New Book
- **Method**: POST
- **Endpoint**: /api/books
- **Description**: Allows admin to add new books to the system.
- **Status Code**: 201
- **Request Body**:
  ```json
  {
  "title": "string",
  "author": "string",
  "category": "string",
  "price": "number",
  "quantity": "number"
}

 - **Response**:
  {
  "msg": "New book has been added successfully"
}

### Update Book Details
- **Method**: PUT / PATCH
- **Endpoint**: /api/books/:id
- **Description**: Allows admin to update the details of a specific book identified by its ID.
- **Status Code**: 204
- **Request Body**:
  ```json
 {
  "title": "string",
  "author": "string",
  "category": "string",
  "price": "number",
  "quantity": "number"
}


 - **Response**:
  {
  "msg": "book has been updated successfully"
}


### Delete Book
- **Method**: DELETE
- **Endpoint**: /api/books/:id
- **Description**: Allows admin to delete a specific book identified by its ID.
- **Status Code**: 202

 - **Response**:
 {
  "msg": "Book has been deleted successfully"
}


### Place Order
- **Method**: POST
- **Endpoint**:  /api/order
- **Description**: Allows the customer to place an order for a list of books.
- **Status Code**: 201
- **Request Body**:
  ```json
{
  "books": ["string"],
  "totalAmount": "number"
}
 - **Response**:
  {
  "msg": "Order placed successfully"
}


### Place Order
- **Method**: GET
- **Endpoint**:  /api/orders
- **Description**:Allows admin to view all the orders placed so far with the user and book details.
- **Status Code**: 200

 - **Response**:
 Array of order objects with populated user and book data.

### Authentication
Protected routes require JWT token-based authorization. Include the token in the Authorization header for protected routes.


























