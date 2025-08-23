/** @type {import('next').NextConfig} */
const SUPABASE_HOST = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "rpwgfzjbokbhybwzpjwl.supabase.co"; // fallback to your current host

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE_HOST,
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
