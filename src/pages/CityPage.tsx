import React from 'react';
import { useParams } from 'react-router-dom';

const CityPage = () => {
  const { state, city } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-4">
        Dude Ranches in {city?.replace('-', ' ')}, {state?.replace('-', ' ')}
      </h1>
      <p className="text-muted-foreground">City page coming soon...</p>
    </div>
  );
};

export default CityPage;