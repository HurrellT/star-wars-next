import { withExpo } from "@expo/next-adapter";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "react-native",
    "expo",
    "nativewind",
    "react-native-css-interop",
    "@hurrellt/ui",
    "react-native-safe-area-context",
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default withExpo(nextConfig);

