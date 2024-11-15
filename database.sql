CREATE DATABASE  login_system;

USE login_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100)UNIQUE,
    password VARCHAR(255)
);
