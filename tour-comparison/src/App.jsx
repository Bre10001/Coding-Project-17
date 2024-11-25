// Task 1: Create Root Component

import React from "react"; // Import React library
import Gallery from "./Gallery.jsx"; // Import Gallery component
import './App.css'; // Import app CSS for styling

function App() { // Define App component
    return ( // Return header and Gallery component HTML
        <div>
            <h1>The Tour Comparison App</h1>
            <Gallery />
        </div>
    );
}

export default App; // Export App as default component
