const hre = require("hardhat");

async function main() {
  const ProductPurchase = await hre.ethers.getContractFactory("ProductPurchase");
  // The updated contract constructor takes no arguments, so deploy without parameters
  const productPurchase = await ProductPurchase.deploy();

  await productPurchase.waitForDeployment();

  const address = await productPurchase.getAddress();
  console.log(`ProductPurchase deployed to: ${address}`);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  // deployTransaction is undefined, so remove waiting for confirmations or use transaction.wait()
  // await productPurchase.deployTransaction.wait(5);

  // Verify the contract on Etherscan
  console.log("Verifying contract on Etherscan...");
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
    console.log("Contract verified successfully");
  } catch (error) {
    console.log("Error verifying contract:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
