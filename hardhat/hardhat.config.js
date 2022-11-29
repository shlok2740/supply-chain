require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
    solidity: "0.8.0",
    networks: {
        dev: {
            url: "https://rpc-mumbai.maticvigil.com",
            accounts: [PRIVATE_KEY],
        },
    },
};
