/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'de'], // Define supported languages
    defaultLocale: 'en', // Set the default language
  },
  output: 'standalone'
};

module.exports = nextConfig