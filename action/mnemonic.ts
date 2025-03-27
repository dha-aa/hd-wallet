import * as bip39 from 'bip39';

export function  genMnemonic(){
    const mnemonic = bip39.generateMnemonic();
    return mnemonic
}