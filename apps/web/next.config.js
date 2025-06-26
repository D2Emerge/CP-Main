const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@code-project/shared'],
  output: 'standalone',
  images: {
    domains: ['codeproject.com'],
  },
};

module.exports = nextConfig;
