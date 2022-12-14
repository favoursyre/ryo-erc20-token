//I wanto to learn how to create an ERC-20 Token

//Useful librabries that I would be working with -->
const ethers = require("ethers"); //This imports the ether
const fs = require("fs");
require("dotenv").config(); //This imports the env

//Declaring the neccessary variable
//This function would handle the illustration for Alchemy
async function alchemy_node() {
  console.log("Alchemy Node \n");

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_RPC
  );
  const wallet = new ethers.Wallet(process.env.ALCHEMY_KEY, provider); //This connects the provider with the wallet private key

  const abi = fs.readFileSync("./RyoToken_sol_RyoToken.abi", "utf8");
  const binary = fs.readFileSync("./RyoToken_sol_RyoToken.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  //This handles the deployment of the contract
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  //console.log(`Contract details`, contract)

  //console.log(`Contract deployed to ${contract.address}`)
  console.log(`Deployment Receipt`, deploymentReceipt);
  console.log("");
  console.log("Contract deploy transaction", contract.deployTransaction);

  //Accessing the various functions of the contract
  console.log("\n");
  console.log("Accessing the contract functions");
  await contract.burn(2);
}

//This function handles the main deploying function
async function deploy_contract() {
  console.log("Token ether.js \n");

  //Calling the Alchemy function
  await alchemy_node();

  console.log("\nExecuted successfully!");
}

//This handles the callback for the main function
deploy_contract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
