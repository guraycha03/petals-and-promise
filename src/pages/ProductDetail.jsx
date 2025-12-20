import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <div className="pt-32 px-6 text-center">
      <h2 className="font-serif text-3xl">Gown Details</h2>
      <p className="mt-4">Currently viewing gown ID: {id}</p>
    </div>
  );
};

export default ProductDetail;