/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minimate.s3.amazonaws.com",
        port: "",
        pathname: "/users/**",
      },

      {
        protocol: "https",
        hostname: "minimate.s3.amazonaws.com",
        port: "",
        pathname: "/shopitem/**",
      },
    ],
  },
};

export default nextConfig;
