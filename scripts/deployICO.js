const hre = require("hardhat");

async function main() {
  const MonICO = await hre.ethers.getContractFactory("MonICO");
  const monICO = await MonICO.deploy(100000, '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', 1659122887, 1662094011, 200000);
  await monICO.deployed();
  console.log("ICO deployed to:", monICO.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
