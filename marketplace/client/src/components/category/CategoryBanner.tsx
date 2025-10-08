import React from "react"

interface CategoryBannerProps {
  slug?: string
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ slug }) => {
  return (
    <div className="relative min-h-[300px] mb-10 bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] flex items-center justify-center overflow-hidden rounded-xl">
      {/* Background SVG Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating leaves */}
        <svg
          className="absolute top-10 left-10 w-16 h-16 text-white/10 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>

        <svg
          className="absolute top-20 right-20 w-12 h-12 text-white/15 animate-bounce"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>

        {/* Decorative circles */}
        <div className="absolute top-16 right-1/4 w-32 h-32 rounded-full bg-white/5 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-white/8"></div>
        <div className="absolute top-1/3 left-16 w-20 h-20 rounded-full bg-white/6 animate-pulse"></div>

        {/* Farm/agriculture icons */}
        <svg
          className="absolute bottom-16 right-16 w-20 h-20 text-white/8"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12,2A2,2 0 0,1 14,4V8.5A0.5,0.5 0 0,1 13.5,9H10.5A0.5,0.5 0 0,1 10,8.5V4A2,2 0 0,1 12,2M12,10.5A3.5,3.5 0 0,1 15.5,14A3.5,3.5 0 0,1 12,17.5A3.5,3.5 0 0,1 8.5,14A3.5,3.5 0 0,1 12,10.5M12,12A2,2 0 0,0 10,14A2,2 0 0,0 12,16A2,2 0 0,0 14,14A2,2 0 0,0 12,12M7,18C7,18.66 7.34,19 8,19H16C16.66,19 17,18.66 17,18V17H7V18Z" />
        </svg>

        <svg
          className="absolute top-32 left-1/3 w-14 h-14 text-white/12 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C14,14 14,12 11,12C9.5,12 8.06,12.44 7,12.88V21A1,1 0 0,1 6,22A1,1 0 0,1 5,21V4A1,1 0 0,1 6,3Z" />
        </svg>

        {/* Wheat/grain stalks */}
        <svg
          className="absolute bottom-32 left-20 w-10 h-16 text-white/10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M12,4.74L11.38,8.26L7.74,8.74L11.38,9.26L12,12.74L12.62,9.26L16.26,8.74L12.62,8.26L12,4.74Z" />
        </svg>

        <svg
          className="absolute top-40 right-32 w-8 h-14 text-white/8"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M12,4.74L11.38,8.26L7.74,8.74L11.38,9.26L12,12.74L12.62,9.26L16.26,8.74L12.62,8.26L12,4.74Z" />
        </svg>

        {/* Abstract organic shapes */}
        <div className="absolute top-24 left-1/2 w-40 h-20 bg-white/3 rounded-full transform -rotate-12 animate-pulse"></div>
        <div className="absolute bottom-28 right-1/3 w-28 h-36 bg-white/4 rounded-full transform rotate-45"></div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Banner Content (centered) */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 capitalize drop-shadow-lg">
          {slug?.replace("_", " ")} Products
        </h1>
        <p className="text-md md:text-lg max-w-2xl mx-auto drop-shadow-md">
          Discover high-quality products from verified farmers in the{" "}
          <span className="font-semibold underline decoration-white/50">
            {slug?.replace("_", " ")}
          </span>{" "}
          category
        </p>
      </div>
    </div>
  )
}

export default CategoryBanner
