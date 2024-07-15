export const APP_CONFIG = () => {
  return {
    APP_PORT: process.env["APP_PORT"],
    APP_URL: process.env["APP_URL"],
    APP_EMAIL:{
        SUPPORT:process.env["SUPPORT_EMAIL"]
    },
  };
};
