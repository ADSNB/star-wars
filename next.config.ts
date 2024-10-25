import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_STARWARS_API_URL: "https://swapi.dev/api/starships/",
    NEXT_STARWARS_NET_API_URL: "https://localhost:7068/starwars",
    NEXT_STARWARS_NET_API_URL_AUTH: "https://localhost:7068/v1/authenticate",
  },
};

export default nextConfig;
