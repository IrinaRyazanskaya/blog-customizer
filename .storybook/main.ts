import path from "path";

import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    {
      name: "@storybook/addon-styling-webpack",

      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  esModule: true,
                  modules: {
                    auto: true,
                    namedExport: false,
                    exportLocalsConvention: "as-is",
                  },
                },
              },
            ],
          },
          {
            test: /\.s[ac]ss$/,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  esModule: true,
                  modules: {
                    auto: true,
                    namedExport: false,
                    exportLocalsConvention: "as-is",
                  },
                  importLoaders: 2,
                },
              },
              require.resolve("resolve-url-loader"),
              {
                loader: require.resolve("sass-loader"),
                options: {
                  implementation: require.resolve("sass"),
                  sourceMap: true,
                  sassOptions: {},
                },
              },
            ],
          },
        ],
      },
    },
    "@storybook/addon-webpack5-compiler-swc",
  ],
  webpackFinal: async (config) => {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        fonts: path.resolve(__dirname, "..", "./src/fonts"),
        src: path.resolve(__dirname, "..", "./src"),
        components: path.resolve(__dirname, "..", "./src/components"),
      };
    }

    return config;
  },
  framework: "@storybook/react-webpack5",
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
  docs: {
    autodocs: "tag",
  },
};

export default config;
