
async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ERC20token = await ethers.getContractFactory("ERC20token");
  const erc20token = await ERC20token.deploy('ERC20token', 'BLR', 18);

  console.log("Token contract address:", erc20token.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });