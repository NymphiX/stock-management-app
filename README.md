# Stock Management Application

## Overview

This is a stock management application built with ReactJS, NodeJS, Apollo Server, and PostgreSQL. The application allows users to manage products and track the movement of stock in and out of warehouses.

## Technologies

- **Backend**: NodeJS with TypeScript/JavaScript
- **Frontend**: ReactJS
- **Database**: PostgreSQL
- **API**: GraphQL (Apollo Server) & REST API

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine using the following command:
```sh
https://github.com/NymphiX/stock-management-app.git
cd stock-management-app
```
### Step 2: Install Dependencies

```sh
npm install
```

### Step 3: Set Up Environment Variables

Create a .env file in /backend directory with the following content:

```sh
# .env
DATABASE_URL=postgres://username:pass@localhost:5432/dbname
REST_API_URL=https://api.mathjs.org/v4/
```

Replace 'username', 'pass' and 'dbname' with your PostgreSQL details.

### Step 4: Initialize the PostgreSQL database:

```sh
psql -U username -d dbname -f ../database/init.sql
```

### Step 5: Start the backend server:

```sh
npm start
```
### Step 6: Setup frontend, navigate to the frontend directory:

```sh
cd ../frontend
```

### Step 7: Install dependencies:

```sh
npm install
```

### Step 8: Start the frontend development server:

```sh
npm start
```

Usage
Open your browser and navigate to http://localhost:3000.
Use the Product Entry Screen to add products and view the product list.
Use the Warehouse Stock Movement Screen to manage stock movements for each warehouse.

The application assumes that the list of warehouses is already available in the database.
The REST API used for calculation operations is the Math.js API.


