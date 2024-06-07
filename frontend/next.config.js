/** @type {import('next').NextConfig} */
const config = {
    output: 'standalone',
    experimental: {
        serverActions: {
            allowedOrigins: [
                '*',
            ],
        },
    },
    images: {
        remotePatterns: [
            {
                hostname: 'wger.de',
            },
            {
                hostname: 'via.placeholder.com',
            },
        ],
    },
};

export default config;
