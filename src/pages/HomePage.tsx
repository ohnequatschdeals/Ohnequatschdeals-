import React from "react";
import Button from ".@/components/Button";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Willkommen bei OhneQuatschDeals 🚀</h1>
      <p className="mb-4 text-lg text-gray-700">
        Dein smarter Deal-Finder für Internet, Handy & mehr.
      </p>
      <Button className="bg-green-600 hover:bg-green-700">
        Jetzt Angebote entdecken
      </Button>
    </div>
  );
};

export default HomePage;