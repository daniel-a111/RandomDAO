import { ethers } from "hardhat";
import { expect } from "chai";
import {BigNumber} from 'ethers';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { sha256 } from "../src/utils";

function to32bytes(hex: string) {
  if (hex.startsWith('0x'))
    hex = hex.substring(2);
  for (let i = hex.length; i<64; i++)
    hex = '0'+hex;
  return hex;
}

function toHex(bn: BigNumber) {
  return to32bytes(bn.toHexString());
}

function searchRandom(hex: string) {
    let nonce = 0;
    let bn = BigNumber.from(hex);
    let start: number, end: number;
    
    start = new Date().getTime();
    while(true) {
        let next: BigNumber = bn.add(nonce);
        let r = sha256(Buffer.from(toHex(next), 'hex')).digest('hex');
    
        if (r.startsWith('00000')) {
            end = new Date().getTime();
            return nonce;
        }
        nonce++;
    }
}


describe("RandomDAO", async () => {

  const deploy = async () => {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const RandomizerGov = await ethers.getContractFactory('Gov');
    await RandomizerGov.deploy(addr2.address, addr3.address);

    const Randomizer = await ethers.getContractFactory('RandomDAO');
    const randomizer = await Randomizer.deploy();
    const { coin } = await loadCoin(await randomizer.coin());

    const Staking = await ethers.getContractFactory('Staking');
    const staking = await Staking.deploy(coin.address);

    await randomizer.set_staking(staking.address);

    return { randomizer, coin, staking };
  };

  const loadCoin = async (address: string) => {
    const RNDM = await ethers.getContractFactory('RNDM');
    const coin = RNDM.attach(address);
    return { coin };
  };

  it("Can Deploy RandomDAO and RNDM", async function () {
    let { randomizer, coin } = await loadFixture(deploy);
    expect(randomizer?.address).to.not.equal(undefined);
    expect(coin?.address).to.not.equal(undefined);
  });

  it("Can transfer coin", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    let { coin } = await loadFixture(deploy);
    expect(await coin.balanceOf(owner.address)).to.be.equals(ethers.utils.parseEther("100.0").toString());
    
    await coin.transfer(addr1.address, ethers.utils.parseEther("30.0"));
    await coin.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("10.0"));

    expect(await coin.balanceOf(owner.address)).to.be.equals(ethers.utils.parseEther("70.0").toString());
    expect(await coin.balanceOf(addr1.address)).to.be.equals(ethers.utils.parseEther("20.0").toString());
    expect(await coin.balanceOf(addr2.address)).to.be.equals(ethers.utils.parseEther("10.0").toString());
  });
    
  it("RNDM Can Be mined", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    let { randomizer, coin } = await loadFixture(deploy);
    let start: number, end: number;

    let seed = await randomizer.connect(addr1).seed();
    // start = new Date().getTime();
    await randomizer.connect(addr1).mine(BigNumber.from(searchRandom(seed)));
    // end = new Date().getTime();
    expect(await coin.balanceOf(addr1.address)).to.be.equals(ethers.utils.parseEther("1.0").toString());
  });
});


