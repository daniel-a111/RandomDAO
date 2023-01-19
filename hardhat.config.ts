import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  // defaultNetwork: "polygon",
  // defaultNetwork: "aws",
  // defaultNetwork: "localhost",
  networks: {
    hardhat: {
      gas: 6000000
    },
    localhost: {
      chainId: 14333,
      // url: "http://127.0.0.1:8545"
      url: "http://127.0.0.1:8545",
      accounts: ['8e5c1922942e035df3ee910ec254a2564c8903495baa12d79b7943952b15107b']

    },
    aws: {
      chainId: 31337,
      url: "http://100.24.205.203:8545"
    },
    polygon: {
      chainId: 137,
      url: "https://polygon-mainnet.g.alchemy.com/v2/UfvWQbLFTEBndoHds9JnDgwzUpepU1Z5",
      accounts: ['8e5c1922942e035df3ee910ec254a2564c8903495baa12d79b7943952b15107b']
    }
  },
  // paths: {
  //   sources: "./contracts",
  //   tests: "./test",
  //   cache: "./cache",
  //   artifacts: "./artifacts"
  // },
};

export default config;
