/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add .wasm as a resolvable extension
    config.resolve.extensions.push(".wasm");

    // Use the async WebAssembly loader
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    return config;
  },
};

export default nextConfig;
