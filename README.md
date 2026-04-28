# 🎥 YoutubeNodjs

![YoutubeNodjs Logo](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

YoutubeNodjs is a robust, production-ready backend application built with **Node.js**, **TypeScript**, and **Express**. It provides a comprehensive solution for managing YouTube-related content, user authentication, and administrative controls.

---

## 🌟 Key Features

-   **🔐 Secure Authentication**: JWT-based login and registration system.
-   **👤 User Management**: Full CRUD operations for user profiles.
-   **🛠️ Admin Dashboard**: Specialized routes for administrative oversight.
-   **📂 File Handling**: Integrated with **Multer** and **Cloudinary** for seamless media uploads.
-   **📧 Email Services**: Automated notifications via **Nodemailer**.
-   **📊 Data Export**: Export data to Excel files using the **xlsx** library.
-   **⏰ Automated Tasks**: Scheduled background jobs using **Cron**.

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16+)
-   MongoDB (Running locally or on Atlas)
-   Cloudinary Account (for media storage)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ahmedGHtarek0/YoutubeNodjs.git
    cd YoutubeNodjs
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your configurations (MongoDB URI, Cloudinary API keys, JWT Secret, etc.).

4.  **Run in Development Mode**:
    ```bash
    npm run dev
    ```

---

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Language**: TypeScript
-   **Framework**: Express.js
-   **Database**: MongoDB (Mongoose)
-   **Authentication**: JSON Web Tokens (JWT)
-   **Task Scheduling**: Node-Cron
-   **Storage**: Cloudinary

---

## 📁 Project Structure

```text
src/
├── DataBase/       # Database connection logic
├── middlewres/     # Auth and validation middlewares
├── routes/         # API endpoint definitions
├── services/       # Business logic (Cloudinary, Email, Cron)
└── index.ts        # Main entry point
```

---

## 📝 License

This project is licensed under the ISC License.

---

> [!TIP]
> For a deeper dive into the architecture and advanced configurations, check out the [Advanced README](./README_ADVANCED.md).
