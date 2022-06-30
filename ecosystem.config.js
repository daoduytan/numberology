require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "Numerology",
      script: "yarn start",
      env: {
        PORT: process.env.PORT,
      },
    },
  ],
};
