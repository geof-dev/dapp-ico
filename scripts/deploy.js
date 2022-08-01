const hre = require("hardhat");

async function main() {
  const MonToken = await hre.ethers.getContractFactory("MonToken");
  const monToken = await MonToken.deploy();
  await monToken.deployed();
  console.log("Token deployed to:", monToken.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
