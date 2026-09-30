// Prints the deploy wallet's preprod address, for the faucet. Creates `.seed` on first run.
import { PREPROD, deriveWallet } from "./wallet.js";

const { address } = deriveWallet();
console.log(`deploy wallet (preprod): ${address}`);
console.log(`fund it with tNIGHT at ${PREPROD.faucet}`);
