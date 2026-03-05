🐾 Pet Clinic Management System

A modern web application for managing patients in a pet clinic.

The application allows clinic staff to add, edit, search, filter, and delete patients in an intuitive interface connected to a MongoDB database.

🌐 Live Demo
https://pet-clinic-48qi.onrender.com/

✨ Features

🧾 Patients Table
Display all patients in a clean table UI
Built with React Table

🔎 Search & Filtering
Column search
Enum filtering for pet type

↕️ Sorting
Sort patients by clicking table headers

➕ Add Patient
Open modal form
Insert patient into MongoDB

✏️ Edit Patient
Update existing patient data

🗑 Delete Patient
Remove patient from the database

⚡ Instant UI Updates
Powered by React Query for caching and automatic refetch

📱 Responsive UI
Works on desktop and mobile

🏗 Tech Stack

Frontend / Framework
⚛️ React
⚡ React Remix
📊 React Table
🔄 React Query

Backend
🟢 Node.js
🗄 MongoDB

Styling
🎨 Tailwind CSS

Deployment
☁️ Render

Create a .env file:
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=pet_clinic

🚀 Running the Project Locally

Install dependencies
npm install

Start the development server
npm run dev

The app will run at
http://localhost:5173

☁️ Deployment

The application is deployed on Render.
Every push to the connected GitHub repository automatically triggers a new build and deployment.

🧠 Key Concepts Implemented

Feature-based component architecture
Server / client separation in Remix
MongoDB database connection management
React Query data synchronization
Reusable UI components
Form validation with schemas
Clean separation of API routes

👩‍💻 Author

Developed by Yael Eisenstat
Full-stack developer specializing in:
React
TypeScript
Node.js
MongoDB
Modern frontend architecture