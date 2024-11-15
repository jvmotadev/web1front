import React from 'react';
import { Layout } from "@/app/layout";

const Entradas = () => {
  return (
    <div className="flex">
      {/* Pass collapsible="icon" to start collapsed */}
      <Layout collapsible="icon">
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between gap-x-24">
            {/* Add your main content here */}
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Entradas;
