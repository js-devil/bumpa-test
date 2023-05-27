module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
            @import "./src/assets/styles/main.scss";
          `,
      },
    },
  },
};
