const { ethers } = require("hardhat");
const { PRIVATE_KEY, URL_ALCHEMY, CONTRACT_ADDRESS } = process.env;

async function main() {

        const contractAddress = CONTRACT_ADDRESS;
        const provider = new ethers.providers.JsonRpcProvider(URL_ALCHEMY);
        const admin = new ethers.Wallet(PRIVATE_KEY, provider);
        const myContract = await ethers.getContractAt('ERC20token', contractAddress, admin);
        const name = await myContract.name();
        const symbol = await myContract.symbol();
        const totalSupply = await myContract.totalSupply();
        const decimals = await myContract.decimals();
        console.log("ContractInfo:\n" + 
        "Description: " + name + "\n" +
        "Rinkiby testNet contract token address: 0x9E1765B00c1EE2eeB38c93EE2997c138024840D2" + "\n" + 
        "Symbol: " + symbol + "\n" + 
        "Total supply: " + totalSupply + "\n" +
        "Decimals: " + decimals + "\n"  
        );
}

main()
.then(() => process.exit(0))    
.catch((error) => {
  console.error(error);
  process.exit(1);
});