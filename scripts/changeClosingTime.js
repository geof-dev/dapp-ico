const { ethers } = require("hardhat");

async function main() {
    const MonICO = await ethers.getContractFactory("MonICO");
    const monICO = await MonICO.attach("0xc5a5C42992dECbae36851359345FE25997F5C42d");

    await monICO.changeClosingTime(1659434031);
    console.log("Done!");
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});