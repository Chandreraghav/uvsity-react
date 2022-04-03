const withTM = require('next-transpile-modules')(['@date-io/date-fns','date-fns']); // pass the modules you would like to see transpiled
module.exports = withTM({
  reactStrictMode: true,
  eslint: {
    //   // Warning: This allows production builds to successfully complete even if
    //   // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});

 
