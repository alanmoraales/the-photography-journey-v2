// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"],
    loader: "custom",
    loaderFile: "./src/services/imageKitLoader.ts",
  },
};

export default withPlaiceholder(nextConfig);
