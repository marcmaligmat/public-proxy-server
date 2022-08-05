/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: [
      "scontent-ort2-2.xx.fbcdn.net",
      "static.xx.fbcdn.net",
      "scontent-dfw5-2.xx.fbcdn.net",
      "scontent-dfw5-1.xx.fbcdn.net",
      "scontent-ort2-1.xx.fbcdn.net",
      "media.istockphoto.com",
    ],
  },
}

module.exports = nextConfig
// // next.config.js
// module.exports = {
//   images: {
//     domains: [
//       "scontent-ort2-2.xx.fbcdn.net",
//       "static.xx.fbcdn.net",
//       "scontent-dfw5-2.xx.fbcdn.net",
//       "scontent-dfw5-1.xx.fbcdn.net",
//     ],
//   },
// }

// module.exports = {
//   experimental: {
//     images: {
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "*.xx.fbcdn.net",
//         },
//       ],
//     },
//   },
// }
