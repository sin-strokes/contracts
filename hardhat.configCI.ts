import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ETH_RPC, GOERLI_RPC, OVA_BETA_RPC, PRIVATE_ETH_RPC_PREFIX } from './rpc';

// Fallbacks are the well-known Hardhat default test accounts, used only when
// secrets are not configured (e.g. CI runs triggered from forks).
const DEFAULT_ADMIN_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const DEFAULT_TEAM_KEY = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const DEFAULT_USER_A_KEY = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const DEFAULT_USER_B_KEY = "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6";
const DEFAULT_USER_C_KEY = "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926b";

const adminKey = process.env.ADMIN_WALLET_KEY || DEFAULT_ADMIN_KEY;
const teamKey = process.env.TEAM_WALLET_KEY || DEFAULT_TEAM_KEY;

const testAccounts = [
  {
    privateKey: adminKey,
    balance: "10000000000000000000000000",
  },
  {
    privateKey: teamKey,
    balance: "10000000000000000000",
  },
  {
    privateKey: process.env.USER_A_WALLET_KEY || DEFAULT_USER_A_KEY,
    balance: "10000000000000000000",
  },
  {
    privateKey: process.env.USER_B_WALLET_KEY || DEFAULT_USER_B_KEY,
    balance: "10000000000000000000",
  },
  {
    privateKey: process.env.USER_C_WALLET_KEY || DEFAULT_USER_C_KEY,
    balance: "10000000000000000000",
  },
];

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
          // viaIR: true
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1_000_000,
          },
          metadata: {
            bytecodeHash: 'none',
          },
        },
      }
    ]
  },
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      forking: {
        url: PRIVATE_ETH_RPC_PREFIX + process.env.ALCHEMY_KEY!,
        enabled: true,
        blockNumber: 22917626,
      },
      accounts: testAccounts,
      loggingEnabled: false,
    },
    ova: {
      url: OVA_BETA_RPC,
      chainId: 0x7A69,
      accounts: [adminKey, teamKey],
      gas: "auto",
      gasPrice: "auto",
      allowUnlimitedContractSize: true,
    },
    eth: {
      url: ETH_RPC,
      chainId: 0x1,
      accounts: [adminKey, teamKey],
      gas: "auto",
      gasPrice: "auto",
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
