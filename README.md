# SIMM 5300 C Self-Assessment

This project is a web application designed for self-assessment using the SIMM 5300 C framework. It allows users to input scores for various components and calculate a final assessment score.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
- **MySQL**: Ensure you have MySQL installed on your machine.
- **Visual Studio Code**: Recommended for editing and running the project.
- **MySQL Database Manager or PostgreSQL Manager Extension**: Install these extensions in Visual Studio Code for database management.

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

Clone this repository to your local machine 

### 2. Set Up the Database

Using MySQL

Open Visual Studio Code and install the MySQL Database Manager extension or postgreSQL manager

Connect to your MySQL server using the following credentials:
Host: localhost
User: root
Password: root
Database: SIMM_5300C

Use the Dump202410.sql file to create tables and insert initial data.

### 3. Install Project Dependencies

Navigate to the project directory in your terminal and run:
```bash
npm install
```

###4. Start the Application

Start the application by running:

```bash
npm run start
```
