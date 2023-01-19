import { ethers } from "hardhat";
import fs from 'fs';

async function main() {
  const RandomDAO = await ethers.getContractFactory("RandomDAO");
  const dao = await RandomDAO.deploy();
  await dao.deployed();
  fs.writeFileSync('./deployments/localhost.txt', dao.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
