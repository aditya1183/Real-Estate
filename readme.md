# Real Estate Management System

## Project Description

This project is a Real Estate Management System built with React and Vite. It allows users to upload properties for rent and sale, providing a comprehensive platform for both property owners and potential tenants or buyers. The application is designed with a focus on user experience and security, featuring full authentication and various functionalities to ensure a smooth operation.

## Features

- **Property Upload**: Users can easily upload their properties for rent or sale.
- **Full Authentication**: The application includes a robust authentication system to ensure secure access for users.
- **Password Management**: Users can reset their passwords and recover forgotten passwords through a secure process.
- **API Authentication**: All API endpoints are secured and require authentication for access.
- **OTP Verification**: An OTP verification system is implemented to enhance security during user registration and login processes.
- **Admin Access**: Admins can access a dedicated admin page. Upon accessing the admin page, admins must enter their credentials, after which an OTP is sent to the admin's registered email. This OTP must be entered to gain access to the admin functionalities.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Babel**: Used for Fast Refresh in development.
- **SWC**: An alternative to Babel for Fast Refresh, providing faster builds.




## Payment Module
The payment module in this project is designed to provide a seamless and secure payment experience. It integrates Razorpay for payment processing and includes the following key features:

Order Creation:
The backend generates a payment order with Razorpay, including the amount and currency, ensuring transactions are properly recorded.

Payment Gateway Integration:
A user-friendly Razorpay payment interface is implemented on the frontend, allowing users to make payments using various methods such as credit/debit cards, UPI, wallets, and net banking.

Payment Verification:
After payment completion, the backend verifies the transaction's authenticity using Razorpay's signature verification to ensure secure payment processing.

Payment Status Tracking:
The module tracks and updates the payment status in the database for both successful and failed transactions, ensuring accurate record-keeping.

Error Handling:
The module handles errors such as invalid payment details, failed transactions, or network issues gracefully, providing appropriate feedback to users.

Secure Data Handling:
Sensitive data is encrypted and securely transmitted, complying with best practices for user privacy and security.

This module enables smooth integration of payment functionality, enhancing the overall user experience.



## Getting Started

To get started with this project, clone the repository and install the necessary dependencies:

```bash
git clone [REPOSITORY_URL]
cd [PROJECT_DIRECTORY]
npm install