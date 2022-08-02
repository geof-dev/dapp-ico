const hre = require("hardhat");

async function main() {
  const MonICO = await hre.ethers.getContractFactory("MonICO");
  const monICO = await MonICO.deploy(100000, '0x09635F643e140090A9A8Dcd712eD6285858ceBef', 1659122887, 1662094011, 200000);
  await monICO.deployed();
  console.log("ICO deployed to:", monICO.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
