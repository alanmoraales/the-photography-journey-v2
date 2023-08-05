// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["alanmoraales.s3.amazonaws.com"],
  },
};

export default withPlaiceholder(nextConfig);
