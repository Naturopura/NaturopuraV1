import React from "react";

const items = [
  {
    img: "https://images.pexels.com/photos/760281/pexels-photo-760281.jpeg",
    text: "Product Management",
  },
  {
    img: "https://media.istockphoto.com/id/468162128/photo/businessman-looking-to-graph.jpg?s=2048x2048&w=is&k=20&c=invnUSomXoSML5lsOq3ZVqs_i3MN0YdEVlUtFTm13AM=",
    text: "Product Selling",
  },
  {
    img: "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg",
    text: "Decentralization",
  },
  {
    img: "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg",
    text: "Product Purchase",
  },
  {
    img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
    text: "Secure Login",
  },
];

const ScrollingShowcase = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white py-8 border-t border-b border-gray-200 mt-16">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white via-transparent to-white  pointer-events-none"></div>
      {/* Use the custom CSS class from index.css here */}
      <div className="animate-marquee flex whitespace-nowrap">
        {items.concat(items).map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-4 py-2 flex-shrink-0"
          >
            <img
              src={item.img}
              alt={item.text}
              className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full border border-gray-300 shadow-sm"
            />
            <p className="text-gray-700 text-sm md:text-base font-medium whitespace-nowrap">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingShowcase;
