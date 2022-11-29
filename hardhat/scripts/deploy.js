const { ethers } = require("hardhat");

async function main() {
    const Supply = await ethers.getContractFactory("Supply");
    const supply = await Supply.deploy();
    await supply.deployed();

    console.log("Supply deployed to: ", supply.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
