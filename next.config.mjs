/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Лендінг FinPilot (статична сторінка у public/finpilot/) відкривається за /finpilot
  async rewrites() {
    return [
      { source: "/finpilot", destination: "/finpilot/index.html" },
      { source: "/finpilot/", destination: "/finpilot/index.html" },
    ];
  },
};

export default nextConfig;
