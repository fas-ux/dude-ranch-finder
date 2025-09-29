import React from 'react';
import { useParams } from 'react-router-dom';

const GuidePage = () => {
  const { slug } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-4">
        {slug?.replace('-', ' ')}
      </h1>
      <p className="text-muted-foreground">Guide content coming soon...</p>
    </div>
  );
};

export default GuidePage;