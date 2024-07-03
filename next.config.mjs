/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minimate.s3.amazonaws.com",
        port: "",
        pathname: "/users/**",
      },
    ],
  },
};

export default nextConfig;
