import React from "react";

export const ProductDisplayCardPlaceholder = () => {
  return (
    <div className="card bg-gray-200 shadow-lg animate-pulse">
      <figure className="bg-gray-300 h-48 w-full"></figure>
      <div className="card-body">
        <h2 className="card-title bg-gray-300 h-6 w-3/4 mb-4"></h2>
        <p className="bg-gray-300 h-4 w-1/2 mb-4"></p>
        <div className="card-actions justify-end">
          <button className="btn btn-gray-300 h-10 w-24"></button>
        </div>
      </div>
    </div>
  );
};