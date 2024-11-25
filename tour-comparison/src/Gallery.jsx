// Task 2: Create Tour List Component
import React, { useEffect, useState } from "react";
import './App.css'; // Import gallery CSS for styling

const Gallery = () => {
    const [tourList, setTourList] = useState([]); // State to store tour data
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const [loadError, setLoadError] = useState(""); // State to track errors that occur during fetching

    useEffect(() => {
        // Effect runs once when component fetches tour data
        const fetchToursData = async () => {
            try {
                // Using allorigins proxy to avoid CORS issue
                const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://course-api.com/react-tours-project')); //extra code provided from online as original link threw an error
                if (!response.ok) {
                    throw new Error("Failed to fetch tours."); // Error message if fetching fails
                }
                const data = await response.json();
                const tours = JSON.parse(data.contents); // Properly parse the response from `allorigins`
                setTourList(tours); // Set fetched data to state
            } catch (err) {
                setLoadError(err.message); // Set error message if fetching fails
            } finally {
                setIsLoading(false); // Set loading to false once fetching is done
            }
        };
        fetchToursData(); // Call function to fetch data
    }, []); // Empty array to run only once on component mount

    // Function to remove a tour from the list
    const handleRemoveTour = (tourId) => {
        setTourList(tourList.filter((tour) => tour.id !== tourId));
    };

    // Function to toggle the visibility of the description for a specific tour
    const handleToggleDescription = (tourId) => {
        setTourList(tourList.map((tour) =>
            tour.id === tourId ? { ...tour, showFullDescription: !tour.showFullDescription } : tour
        ));
    };

    // Show loading message while data is fetching
    if (isLoading) return <p>Loading tours...</p>;
    // Display error message if fetching fails
    if (loadError) return <p>Error: {loadError}</p>;

    // Return HTML for tour list, info, price, buttons, and toggles
    return (
        <div className="gallery">
            {tourList.map(({ id, name, info, image, price, showFullDescription }) => (
                <div key={id} className="tour-card">
                    <img src={image} alt={name} />
                    <div className="tour-info">
                        <h2>{name}</h2>
                        <p className="tour-price">${price}</p>
                        <p>
                            {showFullDescription ? info : `${info.substring(0, 100)}...`}
                            <button onClick={() => handleToggleDescription(id)}>
                                {showFullDescription ? "Show Less" : "Read More"}
                            </button>
                        </p>
                        <button className="not-interested" onClick={() => handleRemoveTour(id)}>
                            Not Interested
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery; // Export Gallery component as default