# 🏥 AIIMS-CONNECT (Hospital Management App)

AIIMS-CONN is a **React Native-based** hospital management system designed to streamline patient tracking, role-based access control (RBAC), and procedural documentation in medical institutions. The app is built with **Firebase Authentication**, **MongoDB**, and **Express.js**, ensuring a **secure** and **scalable** solution for healthcare professionals.

---

## 🚀 Tech Stack

### **Frontend (React Native)**
- **React Native** – Cross-platform mobile development
- **Expo** – Rapid prototyping and deployment
- **React Navigation** – Stack-based navigation
- **React Native Elements** – UI components
- **TypeScript** – Type safety
- **Firebase Authentication** – Secure login/signup
- **Axios** – API requests

### **Backend (Node.js & Express)**
- **Node.js + Express.js** – REST API backend
- **MongoDB (Mongoose)** – Database for patient data storage
- **Firebase Admin SDK** – Authentication & user roles
- **RBAC (Role-Based Access Control)** – Secure user-specific views

---

## 📌 Features
### ✅ **Authentication**
- Sign up / Login with Firebase Authentication
- Role selection (Doctor/Nurse) during signup
- Session persistence with Firebase Auth

### ✅ **Role-Based Access Control (RBAC)**
- **Doctor**: Read-only access, cannot modify patient forms  
- **Nurse**: Full write access to checklists & patient forms  

### ✅ **Patient Management**
- View & search patients
- Register new patients (Nurse only)
- Update patient status

### ✅ **Medical Workflow Checklists**
- **Procedure Planning**
- **Pre-Operation Sign-In**
- **Post-Operation Sign-Out**
- Real-time status tracking

---

## 🔧 Setup Instructions

### **1️⃣ Prerequisites**
Make sure you have:
- **Node.js** (v16 or later)
- **Expo CLI** (`npm install -g expo-cli`)
- **MongoDB Atlas / Local MongoDB**
- **Firebase Project Setup** (API Keys)

### **2️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/aiims-conn.git
cd aiims-conn

