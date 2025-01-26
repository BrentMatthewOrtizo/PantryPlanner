# **Pantry Planner**

---

## **Overview**

**Pantry Planner** is a user-centric web application designed to make meal planning seamless, efficient, and personalized. Built during **Irvine Hacks 2025**, this application leverages modern web development technologies and APIs to offer a unique experience for food enthusiasts and home cooks alike.

### **Team Members**
- **Brent Matthew Ortizo**  
  - Role: Fullstack Developer (Primarily Backend)  
  - Contributions: Backend logic, API integration, Firebase setup  
- **Ferdinand Paloma**  
  - Role: Frontend Developer  
  - Contributions: UI/UX design, page styling, React components  
- **Jodie Le**  
  - Role: Frontend Developer  
  - Contributions: UI/UX design, interactive features, user-facing components

---

## **Features**

### **User Authentication**
Secure sign-up and login functionality powered by Firebase Authentication.

### **Cuisine Preferences**
Users can select their favorite cuisines from an interactive grid.

### **Cooking Goals**
Tailor cooking goals based on user interests, such as:
- Cooking on a budget
- General cooking mastery
- Healthy cooking and recipes

### **Recipe Explorer**
Integration with the **Spoonacular API** to fetch recipes based on user-selected ingredients. Displays detailed recipe instructions, ingredients, and nutritional information.

### **AI-Powered Cooking Advice**
A chatbox powered by the **Groq API**, offering personalized cooking advice and tips.

### **Interactive User Hub**
A centralized dashboard to view selected preferences, goals, and recommended recipes.

### **Mobile-Responsive Design**
Fully responsive design ensuring usability across all devices.

---

## **Tech Stack**

### **Frontend**
- React.js (with Vite)
- Bootstrap CSS

### **Backend**
- Node.js

### **Database and Authentication**
- Firebase (Authentication & Firestore)

### **APIs**
- Spoonacular API: Recipe data and nutritional insights
- Groq API: AI-powered cooking assistant for real-time advice

### **Deployment**
- Vercel: For live deployment and scalability

---

## **How to Set Up the Project**

### **Step 1: Install Node.js and npm**
Ensure you have Node.js (version 16 or higher) and npm installed. Download them from the [official Node.js website](https://nodejs.org/).

### **Step 2: Set Up React.js with Vite**
1. **Create a New React Project Using Vite**
   ```npm create vite@latest pantry-planner --template react```
2. **Navigate to the Project Directory**
   ```cd pantry-planner```
3. **Install Dependencies**
   ```npm install```

### **Step 3: Clone the Repository**
Clone the Pantry Planer repository
```git clone <repository_url>```
Navigate into the project directory:
```cd <project_directory>```

### **Step 4: Configure Firebase**
1.	**Create a Firebase Project: Visit Firebase Console and create a new project.**
2.	**Enable Authentication: Enable Email/Password Authentication in the Firebase Authentication section.**
3.	**Set Up FirestoreCreate a Firestore database in test or production mode.**
4.	**Add Firebase Configuration: Replace the Firebase configuration in src/firebaseconfig/firebase.js with your Firebase project credentials**
```const firebaseConfig = {```
```apiKey: "YOUR_API_KEY",```
```authDomain: "YOUR_AUTH_DOMAIN",```
``` projectId: "YOUR_PROJECT_ID",```
```storageBucket: "YOUR_STORAGE_BUCKET",```
```messagingSenderId: "YOUR_MESSAGING_SENDER_ID",```
```appId: "YOUR_APP_ID"```
```};```

### **Step 5: Configure APIs**
1. **Obtain API Keys**
    *Spoonacular API: Sign up at Spoonacular API.*
    *Groq API: Obtain keys from Groq API Documentation.*
2. **Add API Keys to Environment Variables - Create a .env file in the root directory and add:**
```VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key```
```VITE_GROQ_API_KEY=your_groq_api_key```

### **Step 6: Start the Development Server**
Run the development server to preview the application
```npm run dev```

### **Step 7: Build the Project for Production**
```npm run build```

### **Step 8: Deploy to Vercel**
1. **Install Vercel CLI**
```npm install -g vercel```
2. **Deploy**
Deploy project to Vercel:
```vercel```
