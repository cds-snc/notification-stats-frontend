require("dotenv").config();

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    STATS_API_URL:
      process.env.STATS_API_URL ||
      "https://stats.staging.notification.cdssandbox.xyz/",
  },
};
