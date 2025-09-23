import React from "react";
import FloatingButton from "./components/FloatingButton";

function App() {
  const handleClick = () => {
    alert("Floating button clicked!");
    // You can navigate to FileComplaint page or open a modal here
  };

  return (
    <div className="App">
      <h1 className="text-center mt-10">HearUs Platform</h1>
      {/* Other routes and content */}

      <FloatingButton onClick={handleClick} />
    </div>
  );
}

export default App;
