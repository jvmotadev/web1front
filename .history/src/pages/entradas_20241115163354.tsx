import React, { useState } from 'react';
import { Layout } from "@/app/layout";

const Entradas = () => {
  // State to control whether the layout is minimized
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <div className="flex">
      {/* Pass the minimized state to the Layout */}
      <Layout isMinimized={isMinimized} />
      
      <main className="flex-1 p-6 overflow-auto">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Toggle Layout
        </button>
        <div className="flex justify-between gap-x-24">
          {/* Main content goes here */}
        </div>
      </main>
    </div>
  );
};

export default Entradas;
