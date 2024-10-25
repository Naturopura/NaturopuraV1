/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Enable Webpack experiments
    config.experiments = {
      layers: true, // Enable the 'layers' feature
      asyncWebAssembly: true, // If you also need WebAssembly support
    };

    return config;
  },
};

export default nextConfig;
