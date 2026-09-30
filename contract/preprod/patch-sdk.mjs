// Patch the release-candidate wallet SDK for today's preprod indexer.
//
// The RC unshielded wallet asks the indexer for `protocolVersion` on
// UnshieldedTransactionsProgress; preprod's indexer does not serve that field
// yet and rejects the whole subscription. This drops the one field from the
// query and defaults it to 0, which the wallet already reads as "no version
// signal". Idempotent; runs on postinstall. Remove once preprod's indexer or
// the SDK catches up.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "node_modules", "@midnight-ntwrk");
const FRAG_OLD = "          type: __typename\n          highestTransactionId\n          protocolVersion\n        }";
const FRAG_NEW = "          type: __typename\n          highestTransactionId\n        }";
const changed = [];

const edit = (rel, fn) => {
  const p = join(root, rel);
  const s = readFileSync(p, "utf8");
  const t = fn(s);
  if (t !== s) { writeFileSync(p, t); changed.push(rel); }
};

for (const rel of ["wallet-sdk-indexer-client/dist/graphql/subscriptions/UnshieldedTransactions.js", "wallet-sdk-indexer-client/dist/graphql/generated/gql.js"]) {
  edit(rel, (s) => s.split(FRAG_OLD).join(FRAG_NEW).split(FRAG_OLD.replaceAll("\n", "\\n")).join(FRAG_NEW.replaceAll("\n", "\\n")));
}

edit("wallet-sdk-indexer-client/dist/graphql/generated/graphql.js", (s) => {
  const start = s.indexOf("export const UnshieldedTransactionsDocument");
  const end = s.indexOf("\n", start);
  const line = s.slice(start, end);
  const i = line.indexOf('"value": "UnshieldedTransactionsProgress"');
  const field = '{ "kind": "Field", "name": { "kind": "Name", "value": "protocolVersion" } }';
  const j = line.indexOf(field, i);
  if (i < 0 || j < 0) return s;
  return s.slice(0, start) + line.slice(0, j - 2) + line.slice(j + field.length) + s.slice(end);
});

for (const v of ["v1", "v2"]) {
  edit(`wallet-sdk-unshielded-wallet/dist/${v}/SyncSchema.js`, (s) =>
    s.replace(/(export const ProgressSchema = Schema\.Struct\(\{[\s\S]*?)protocolVersion: Schema\.Number,/,
      "$1protocolVersion: Schema.optionalWith(Schema.Number, { default: () => 0 }),"));
}

console.log(changed.length ? `patched preprod SDK: ${changed.join(", ")}` : "preprod SDK patch already applied");
