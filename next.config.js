require("dotenv").config();
const webpack = require("webpack");

module.exports = {
   webpack: (config,options) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: options,
        },
      ],
    })
       return config
  },
};
