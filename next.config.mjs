/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backend.staffshaw.com",
                pathname: "/public/storage/blogs/**",
            },
        ],
    },
};

export default nextConfig;
