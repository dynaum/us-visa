import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX({ extension: /\.mdx?$/ });

const repo = 'us-visa';
const isPagesBuild = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  basePath: isPagesBuild ? `/${repo}` : '',
  assetPrefix: isPagesBuild ? `/${repo}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isPagesBuild ? `/${repo}` : '',
  },
};

export default withNextIntl(withMDX(nextConfig));
