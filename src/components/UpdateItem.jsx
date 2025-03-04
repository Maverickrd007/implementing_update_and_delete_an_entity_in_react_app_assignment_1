import React, { useState, useEffect } from "react";

const API_URI = "https://your-api-url.com/items"; // Replace with actual API URI

const UpdateItem = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing item
  useEffect(() => {
    fetch(`${API_URI}/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setUpdatedValue(data.name || ""); // Adjust according to API response
      })
      .catch((error) => console.error("Error fetching item:", error));
  }, [itemId]);

  // Handle input change
  const handleChange = (e) => {
    setUpdatedValue(e.target.value);
  };

  // Handle update
  const handleUpdate = () => {
    fetch(`${API_URI}/${itemId}`, {
      method: "PUT", // Use PATCH if updating only specific fields
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setMessage("Item updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setMessage("Failed to update item.");
      });
  };

  if (!item) return <p>Loading item...</p>;

  return (
    <div>
      <h2>Update Item</h2>
      <p>Current Value: {item.name}</p>
      <input type="text" value={updatedValue} onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateItem;
