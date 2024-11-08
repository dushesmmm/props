/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      scrollRestoration: true,
    },
    webpack: (config, { isServer }) => {
      // Исправление для npm-пакетов, которые зависят от модуля `fs` и других
      if (!isServer) {
        config.resolve.fallback = {
          fs: false, // Устанавливаем fs в false для клиентской сборки
          tls: false, // Устанавливаем tls в false для клиентской сборки
          net: false, // Устанавливаем net в false для клиентской сборки, если нужно
        };
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  