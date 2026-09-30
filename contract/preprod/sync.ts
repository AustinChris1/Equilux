// Syncs the deploy wallet with preprod, saving state every minute so a restart
// resumes where it stopped. Prints progress, balances and the address.
import * as Rx from "rxjs";
import { openWallet } from "./wallet.js";

const log = (m: string) => console.log(`[preprod ${new Date().toISOString().slice(11, 19)}] ${m}`);
const big = (_k: string, v: unknown) => (typeof v === "bigint" ? v.toString() : v);

const { facade, address, persist } = await openWallet(log);
log(`address ${address}`);

const saver = setInterval(() => persist().then(() => log("state saved"), (e) => log(`save failed: ${e?.message ?? e}`)), 60_000);

facade.state().pipe(Rx.throttleTime(30_000)).subscribe((s: any) => {
  const du = s?.dust?.state?.progress ?? s?.dust?.progress;
  const sh = s?.shielded?.state?.progress ?? s?.shielded?.progress;
  log(`synced=${s?.isSynced} shielded ${sh?.appliedIndex}/${sh?.highestRelevantWalletIndex} · dust ${JSON.stringify(du, big)?.slice(0, 160)}`);
});

const synced: any = await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s: any) => s.isSynced)));
await persist();
clearInterval(saver);
log("SYNCED with preprod");
log(`unshielded balances ${JSON.stringify(synced.unshielded?.balances ?? {}, big)}`);
log(`dust coins ${synced.dust?.availableCoins?.length ?? 0}`);
process.exit(0);
