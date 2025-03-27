import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";

export function Genkeys(mnemonic: string, num: number) {
    let keys: { publickey: string; privatekey: string }[] = [];  
    const seed = bip39.mnemonicToSeedSync(mnemonic); 

    for (let i = 0; i < num; i++) {
        const path = `m/44'/501'/${i}'/0'`;  
        const derived = derivePath(path, seed.toString("hex")).key; 
        const keypair = Keypair.fromSeed(derived);

        keys.push({
            publickey: keypair.publicKey.toBase58(),
            privatekey: bs58.encode(keypair.secretKey),
        });
    }

    return keys;  // Return the array with all generated keys
}
