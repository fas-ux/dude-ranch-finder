import React from 'react';
import { useParams } from 'react-router-dom';

const CityCategoryPage = () => {
  const { state, city, category } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-4">
        {category?.replace('-', ' ')} in {city?.replace('-', ' ')}, {state?.replace('-', ' ')}
      </h1>
      <p className="text-muted-foreground">Category page coming soon...</p>
    </div>
  );
};

export default CityCategoryPage;