import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  
  extension: /\.(md|mdx)$/,

})


module.exports = {
  images: {
    remotePatterns: [new URL('https://ziichat.com/images/image-feature-section-enhance-connectivity.png')],
  },
}

export default withMDX(nextConfig)
