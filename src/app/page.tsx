"use client"; // This line is required for buttons to work in Next.js

import { useState } from "react";
import { db } from "../lib/firebase"; 
import { collection, addDoc } from "firebase/firestore"; 

export default function Home() {
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    setLoading(true);
    try {
      // This saves a document to the "users" collection
      await addDoc(collection(db, "users"), {
        name: "Test User",
        email: "test@example.com",
        date: new Date()
      });
      alert("Success! Data saved to Database.");
    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>My Database App</h1>
      <p>Click below to test the database connection</p>
      
      <button 
        onClick={saveData}
        disabled={loading}
        style={{ 
          padding: "15px 30px", 
          fontSize: "18px", 
          backgroundColor: "#0070f3", 
          color: "white", 
          border: "none", 
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        {loading ? "Saving..." : "Store Data to Database"}
      </button>
    </div>
  );
}