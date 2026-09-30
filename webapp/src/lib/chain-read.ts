/**
 * Reads an Equilux contract's public state straight from a Midnight indexer and
 * decodes it with the compiled contract. No server of ours in between: what the
 * page shows is what the chain holds.
 */
import { ContractState } from "@midnight-ntwrk/compact-runtime";
import { ledger } from "../../../contract/build/contract/index.js";
import type { LedgerView } from "./api";
import { ledgerView } from "./browser-contract";

export type ChainNetwork = "preprod" | "local";

export const INDEXERS: Record<ChainNetwork, { label: string; url: string }> = {
  preprod: { label: "Midnight preprod (public testnet)", url: "https://indexer.preprod.midnight.network/api/v4/graphql" },
  local: { label: "Local Midnight node (this machine)", url: "http://127.0.0.1:8088/api/v3/graphql" },
};

const hexToBytes = (h: string) => new Uint8Array(h.match(/../g)?.map((x) => parseInt(x, 16)) ?? []);

export async function readContract(network: ChainNetwork, address: string): Promise<LedgerView> {
  const clean = address.trim().toLowerCase().replace(/^0x/, "");
  if (!/^[0-9a-f]{64,}$/.test(clean)) throw new Error("That is not a contract address (expected hex).");
  let res: Response;
  try {
    res = await fetch(INDEXERS[network].url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: "query($address: HexEncoded!) { contractAction(address: $address) { state } }", variables: { address: clean } }),
    });
  } catch {
    throw new Error(`Could not reach the ${INDEXERS[network].label} indexer.`);
  }
  const body = await res.json().catch(() => null);
  if (body?.errors?.length) throw new Error(`The indexer rejected the query: ${body.errors[0].message}`);
  const state = body?.data?.contractAction?.state as string | undefined;
  if (!state) throw new Error("No contract with that address on this network.");
  let view: LedgerView;
  try {
    view = ledgerView(ledger(ContractState.deserialize(hexToBytes(state)).data), clean);
  } catch {
    throw new Error("A contract exists at that address, but it is not an Equilux reporting contract of this version.");
  }
  return view;
}
