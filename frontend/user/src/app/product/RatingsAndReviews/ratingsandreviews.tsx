"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiThumbsUp, FiThumbsDown, FiMoreHorizontal } from "react-icons/fi";
import Image from "next/image";
import mango from "@/assets/yellow-mango.png";

const reviews = [
  {
    id: 1,
    rating: 5,
    review: "Looking awesome 😍😍😍",
    customer: "Naturopura Customer",
    daysAgo: "4 days ago",
    helpful: 0,
    notHelpful: 0,
    image: mango,
  },
  {
    id: 2,
    rating: 1,
    review: "Amazing",
    customer: "Gourav Behera",
    daysAgo: "8 days ago",
    helpful: 1,
    notHelpful: 1,
    image: mango,
  },
];

const RatingsAndReviews = () => {
  const [menuVisible, setMenuVisible] = useState(null);
  const [reviewData, setReviewData] = useState(reviews); // State to manage reviews
  const menuRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Handle outside clicks to close the menu
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (id: null) => {
    setMenuVisible((prevVisible) => (prevVisible === id ? null : id));
  };

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent closing due to document click
    setDropdownVisible(!dropdownVisible);
  };

  const handleHelpfulClick = (id: number) => {
    setReviewData((prevData) =>
      prevData.map((review) =>
        review.id === id ? { ...review, helpful: review.helpful + 1 } : review
      )
    );
  };

  const handleNotHelpfulClick = (id: number) => {
    setReviewData((prevData) =>
      prevData.map((review) =>
        review.id === id
          ? { ...review, notHelpful: review.notHelpful + 1 }
          : review
      )
    );
  };

  return (
    <div className="p-6 mt-20 max-w-4xl -ml-4">
      {/* Ratings Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Ratings & Reviews
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-xl">(4.9) 1.2K Reviews</span>
          </div>
        </div>
        <button className="bg-[#7FA200] font-semibold text-white text-lg px-4 py-2 rounded">
          Rate Product
        </button>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 space-y-6">
        {reviewData.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 flex flex-col space-y-4"
          >
            {/* Display Image Above Review Details */}
            {review.image && (
              <div className="mb-4">
                <Image
                  src={review.image}
                  alt="Customer uploaded"
                  width={70}
                  height={70}
                  className="rounded-md object-cover border"
                />
              </div>
            )}
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`text-white text-sm font-semibold py-1 px-2 rounded ${
                      review.rating >= 4 ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {review.rating} ★
                  </div>
                  <span className="text-gray-700 font-medium">
                    {review.review}
                  </span>
                </div>
                <div className="text-gray-500 text-sm">
                  {review.customer} • {review.daysAgo}
                </div>
              </div>
              <div
                className="flex items-center space-x-4 relative"
                ref={menuRef}
              >
                {/* Helpful and Not Helpful Buttons */}
                <button
                  className="flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => handleHelpfulClick(review.id)}
                >
                  <FiThumbsUp className="mr-1" /> {review.helpful}
                </button>
                <button
                  className="flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => handleNotHelpfulClick(review.id)}
                >
                  <FiThumbsDown className="mr-1" /> {review.notHelpful}
                </button>

                {/* Three Dots Menu */}
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(review.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiMoreHorizontal />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-28 duration-300 bg-white shadow-lg border rounded-md transition-all 
                    ${
                      menuVisible === review.id
                        ? "opacity-100 transform scale-100"
                        : "opacity-0 transform scale-95 pointer-events-none"
                    }`}
                  >
                    <button
                      onClick={() => setMenuVisible(null)} // Close menu when "Edit Review" is clicked
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Edit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsAndReviews;
