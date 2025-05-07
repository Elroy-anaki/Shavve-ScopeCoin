
# ScopeCoin

## Live

The application is deployed on Vercel. You can access it here: [Live Demo](https://shavve.vercel.app/auth/signIn)

## Table of Contents
1. [Project Description](#project-description)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Installation](#installation)
5. [API + Libraries](#api--libraries)
6. [Future Tasks](#future-tasks)

---

## Project Description

A mini application designed to allow users to:
- Track cryptocurrency market trends
- Convert between cryptocurrencies and fiat
- Save preferences and favorite coins
- Get real-time market data and currency values

---

## Tech Stack



Example:

- **Frontend:** Next.js, TailwindCSS, Shadcn
- **Backend:** Next.js API Routes, NextAuth.js, tRPC
- **Database:** PostgreSQL (Neon) with drizzle ORM
- **APIs:** CoinMarketCap, Alpha Vantage, Open Exchange Rates, cryproCompare
- **Email:** Nodemailer 

---

## Features

### 🔐 Authentication

This project includes a complete authentication system:

- **User Registration** – Users can sign up with email and password.
- **Login & Logout** – Secure session management.
- **Email Verification** – Validate email addresses post-registration.
- **Forgot Password** – Secure password reset via email.

### 📊 Dashboard

The dashboard provides a personalized experience:

- **Live Exchange Rates** – Real-time data on cryptocurrencies.
- **Favorites** – Save preferred cryptocurrencies for quick access.
- **Currency Conversion** – Convert between crypto and fiat instantly.
- **Real-Time Data -> (Web Socket)** – Always up-to-date via API integrations.
- **Quick access** – Client side searching

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=your-db-host
DB_PORT=your-db-port
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
DB_SSL=true
DB_URL=your-database-connection-url

# Authentication & Security
HASH_SALT=your-hash-salt
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# API Keys & External Services
ALPHA_VANTAGE_BASE_URL=https://www.alphavantage.co
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-api-key

OPEN_EXCHANGE_RATES_BASE_URL=https://openexchangerates.org/api
OPEN_EXCHANGE_RATES_API_KEY=your-open-exchange-rates-api-key

EXCHANGE_RATE_BASE_URL=https://v6.exchangerate-api.com/v6/
EXCHANGE_RATE_API_KEY=your-exchange-rate-api-key

NEXT_PUBLIC_COIN_MARKET_BASE_URL=https://pro-api.coinmarketcap.com
NEXT_PUBLIC_COIN_MARKET_API_KEY=your-coinmarketcap-api-key

NEXT_PUBLIC_CRYPTO_COMPARE_BASE_URL=wss://streamer.cryptocompare.com
NEXT_PUBLIC_CRYPTO_COMPARE_APY_KEY=your-cryptocompare-api-key

# Email Configuration
EMAIL_SENDER=your-email@example.com
EMAIL_SENDER_PASSWORD=your-email-password
EMAIL_SECURE=true

# Client
CLIENT_BASE_URL=http://localhost:3000
```
## Installation
### Clone repo 
```
git clone https://github.com/Elroy-anaki/Shavve.git
```
### Navigate to crypto-app
```
cd crypto-app
```
### Install dependencies
```
npm install
```
### Run the server
```
npm run dev
```
## API + Libraries
### API

 - CoinMarketCap API
 - Open Exchange Rates
 -  Alpha Vantage
### Libraries
 - **Zod** – TypeScript-first schema validation library used for validating and parsing inputs, especially in tRPC procedures.
 
- **NextAuth.js** – Complete open-source authentication solution for Next.js applications, supporting email/password, OAuth, and more.

- **tRPC** – Enables end-to-end typesafe APIs in Next.js without requiring REST or GraphQL, simplifying client-server communication with full type safety.

- **Nodemailer** – A module for Node.js to send emails. It supports various transport methods including SMTP, and is often used for sending confirmation emails, password resets, and notifications.

- **Drizzle** – A lightweight TypeScript ORM for SQL databases. It offers type-safe queries and simple schema management with minimal setup.

- **etc.**


## Future Tasks

- Add user profile customization
- Add dark mode
- etc.

