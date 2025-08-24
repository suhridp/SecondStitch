/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rpwgfzjbokbhybwzpjwl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};
