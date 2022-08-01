const { ethers } = require("hardhat");

async function main() {
    const MonICO = await ethers.getContractFactory("MonICO");
    const monICO = await MonICO.attach("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");

    const initialBalance = await monICO.getBalance();
    console.log("Initial Balance :", ethers.utils.formatEther(initialBalance));

    const amount = ethers.utils.parseEther("0.5");
    await monICO.buyTokens({ value: amount });

    const balance = await monICO.getBalance();
    console.log("Balance :", ethers.utils.formatEther(balance));

    const balanceToken = await monICO.getBalanceToken();
    console.log("Balance Token :", ethers.utils.formatEther(balanceToken));

    const tokenAmount = await monICO.tokenAmount();
    console.log("token Amount:", ethers.utils.formatEther(tokenAmount));
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});