require("dotenv").config();

const getWebAddress = () => {
    return process.env.WEB_HOST || "http://localhost:3000";
};

const getServerAddress = () => {
    return process.env.SERVE_HOST || "http://localhost:8080";
};

module.exports = { getWebAddress, getServerAddress };
