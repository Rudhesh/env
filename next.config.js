// @ts-check

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode : false,
    images: {
        domains: ['images.unsplash.com'], // Specify allowed domains for images
    },
};

module.exports = withNextIntl(config);
