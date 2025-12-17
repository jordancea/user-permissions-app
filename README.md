# User Permissions App

A full-stack application for managing users, roles, and permissions.  
- **Frontend:** React + Vite + Material-UI + React Query  
- **Backend:** Node.js + Express + Sequelize + MySQL  
- Fully containerized with Docker and Docker Compose.

> **Note:** This project is for testing purposes. All users created by the seed have the password `password`.

---

## Table of Contents

- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Environment Variables](#environment-variables)  
- [Quick Start](#quick-start)  
- [Full Startup Instructions](#full-startup-instructions)  
- [Accessing the App](#accessing-the-app)  
- [Stopping the App](#stopping-the-app)  
- [Notes](#notes)  
- [Troubleshooting](#troubleshooting)

---

## Features

- User management (create, edit, delete users)  
- Role and permission management  
- Authentication with JWT and sessions  
- API documentation via Swagger at `/api-docs`  
- Database seeding on startup with test users and roles  

---

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed  
- [Docker Compose](https://docs.docker.com/compose/install/) installed  
- Free ports: `3000` (frontend), `4000` (backend), `3306` (MySQL)

---

## Environment Variables

### Backend `.env` (in `backend` folder):

```env
PORT=4000
NODE_ENV=development

DB_NAME=user_permission_roles
DB_USER=admin
DB_PASSWORD=admin
DB_HOST=db
DB_PORT=3306

JWT_SECRET=edeaa9166a475e5fa3f89ce80db461dc05c109cd949c5b0b22cb43854f41950c
SESSION_SECRET=ac3ba599ff2b336aa0ee67e00c54deb99885dae8f3b8d7420f174db5d324b761

### Frontend .env
VITE_API_URL=http://localhost:4000/api


git clone

Backend .env is already described above (create in backend folder)

Frontend .env is already described above (create in frontend folder)

docker compose up --build

THE passwords for all the users is: password

http://localhost:4000 -- backend
http://localhost:3000 -- frontend