/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
  
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "files.edgestore.dev",
        },
      ],
    },
  };
  
  export default nextConfig;
  