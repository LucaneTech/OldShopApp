import React, { useState } from "react";

export interface CardElementProps {
  title: string;
  _id:number
  category?: string;
  description?: string;
  price: number;
  offerPrice: number;
  imageUrl: string;
  userId: number;
  rating?: number;
  onAdd?: (title: string, quantity: number) => void;
}

const CardElement: React.FC<CardElementProps> = ({
    _id,
  title,
  category = "Product",
  description,
  price,
  offerPrice,
  imageUrl,
  rating = 0,
  onAdd,
}) => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(1);
    onAdd?.(title, 1);
  };

  const increment = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      onAdd?.(title, newCount);
      return newCount;
    });
  };

  const decrement = () => {
    setCount((prev) => {
      const newCount = Math.max(prev - 1, 0);
      onAdd?.(title, newCount);
      return newCount;
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all bg-white p-4 w-full max-w-56">
      <div className="group cursor-pointer flex items-center justify-center">
        <img
          className="group-hover:scale-105 transition-transform duration-300 w-32 h-32 object-contain"
          src={imageUrl}
          alt={title}
          onClick={() => (window.location.href = `http://localhost:3000/api/stuff/${_id}`)}
        />
      </div>

      <div className="mt-3 text-gray-600 text-sm">
        <p className="capitalize text-gray-400">{category}</p>
        <p className="text-gray-800 font-semibold text-lg truncate">{title}</p>

        {description && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{description}</p>
        )}

        {rating > 0 && (
          <div className="text-yellow-400 text-sm mt-1">
            {"★".repeat(Math.round(rating)) +
              "☆".repeat(5 - Math.round(rating))}
          </div>
        )}

        <div className="flex items-end justify-between mt-3">
          <p className="text-indigo-500 font-medium">
            ${offerPrice}
            <span className="text-gray-400 line-through ml-1 text-xs">
              ${price}
            </span>
          </p>

          <div className="text-indigo-500">
            {count === 0 ? (
              <button
                onClick={handleAdd}
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 w-[80px] h-[34px] rounded-full text-indigo-600 font-medium active:scale-95 transition"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                    stroke="#615fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-[80px] h-[34px] bg-indigo-500/20 rounded-full select-none">
                <button
                  onClick={decrement}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  −
                </button>
                <span className="w-5 text-center">{count}</span>
                <button
                  onClick={increment}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardElement;
