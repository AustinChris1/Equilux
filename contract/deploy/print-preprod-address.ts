/**
 * Print a Preprod unshielded address to paste into the faucet.
 * Does not sync a wallet and does not need funds.
 *
 *   cd contract && pnpm faucet-address
 *
 * Optional: MIDNIGHT_SEED=64-hex-chars  (otherwise a demo seed is used —
 * use Lace if you want an address you can spend from).
 */
import { Buffer } from "node:buffer";
import { setNetworkId, getNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { HDWallet, Roles } from "@midnight-ntwrk/wallet-sdk-hd";
import { createKeystore } from "@midnight-ntwrk/wallet-sdk-unshielded-wallet";

setNetworkId("preprod");

const SEED = (process.env.MIDNIGHT_SEED ?? "00000000000000000000000000000000000000000000000000000000000000ab").replace(
  /^0x/,
  "",
);

const FAUCET = "https://midnight-tmnight-preprod.nethermind.dev/";

const hd = HDWallet.fromSeed(Buffer.from(SEED, "hex"));
if (hd.type !== "seedOk") throw new Error("bad seed — need 32 bytes hex");
const derived = hd.hdWallet.selectAccount(0).selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust]).deriveKeysAt(0);
if (derived.type !== "keysDerived") throw new Error("key derivation failed");
const ks = createKeystore(derived.keys[Roles.NightExternal], getNetworkId());
hd.hdWallet.clear();

const address = ks.getBech32Address();
console.log("");
console.log("  Equilux · Midnight Preprod faucet");
console.log("  --------------------------------");
console.log(`  Unshielded address (paste this):`);
console.log(`    ${address}`);
console.log("");
console.log(`  Faucet (1,000 tNIGHT per request, rate-limited):`);
console.log(`    ${FAUCET}`);
console.log("  Also: https://midnight.network/test-faucet");
console.log("");
console.log("  Then in Lace (network = Preprod): Tokens → Generate tDUST.");
console.log("  Fees are paid in tDUST, which accrues from registered tNIGHT (~5 min).");
console.log("");
console.log("  Note: faucet tokens do not make the Vercel site talk to Docker.");
console.log("  They fund a Preprod deploy once the wallet SDK can sync that network.");
console.log("");
