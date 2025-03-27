"use client";

import { useState } from "react";
import { Genkeys } from "@/action/keygen";
import { genMnemonic } from "@/action/mnemonic";
import { useMnoStore } from "@/store/useZustand";
import { Copy, Eye, EyeOff, Trash2, Key, FileText } from "lucide-react";

export default function Home() {
  const {
    mnemonic,
    keys,
    numberofwal,
    setMnemonic,
    addKey,
    removeWallet,
    clearAllWallets,
    incrementWalletCount,
    resetWalletCount,
  } = useMnoStore();

  const [customMnemonic, setCustomMnemonic] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<{ [key: number]: boolean }>({});

  // Generate a new mnemonic
  const handleClickMnemonic = () => {
    const mnemo = genMnemonic();
    setMnemonic(mnemo);
    setShowInput(false);
    resetWalletCount();
  };

  // Generate keys for the current mnemonic
  const handleClickGenerateKeys = () => {
    if (!mnemonic) return alert("Please generate or enter a mnemonic first.");
    const newKeys = Genkeys(mnemonic, numberofwal);
    const normalizedKeys = Array.isArray(newKeys) ? newKeys : [newKeys];

    normalizedKeys.forEach((key) => addKey(key));
  };

  // Import custom mnemonic
  const handleImportMnemonic = () => {
    if (!customMnemonic.trim()) return alert("Mnemonic cannot be empty.");
    setMnemonic(customMnemonic.trim());
    setCustomMnemonic("");
    setShowInput(false);
    resetWalletCount();
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Toggle private key visibility
  const togglePrivateKeyVisibility = (index: number) => {
    setShowPrivateKeys((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="h-screen w-full overflow-auto flex flex-col items-center bg-gray-50 text-black p-8 space-y-8">
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 w-full mb-6">
        <button
          className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-2xl transition transform hover:scale-105 shadow-lg flex items-center gap-2"
          onClick={handleClickMnemonic}
        >
          <FileText size={18} /> Generate Mnemonic
        </button>
        <button
          className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-2xl transition transform hover:scale-105 shadow-lg flex items-center gap-2"
          onClick={handleClickGenerateKeys}
        >
          <Key size={18} /> Add Wallet ({numberofwal})
        </button>
        {keys.length > 0 && (
          <button
            className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-2xl transition transform hover:scale-105 shadow-lg flex items-center gap-2"
            onClick={clearAllWallets}
          >
            <Trash2 size={18} /> Clear All Wallets
          </button>
        )}
      </div>

      {/* Mnemonic Section */}
      {mnemonic && (
        <div className="p-6 border border-black rounded-2xl w-full max-w-lg text-center shadow-xl bg-white relative">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">Mnemonic</p>
            <button className="text-sm text-blue-600 hover:underline" onClick={() => setShowInput(!showInput)}>
              {showInput ? "Cancel" : "Import"}
            </button>
          </div>
          {showInput ? (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Enter custom mnemonic"
                className="w-full p-2 border rounded-md text-sm font-mono"
                value={customMnemonic}
                onChange={(e) => setCustomMnemonic(e.target.value)}
              />
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm" onClick={handleImportMnemonic}>
                Set Mnemonic
              </button>
            </div>
          ) : (
            <div className="relative flex justify-between items-center mt-2 border p-2 rounded-md bg-gray-100">
              <p className="text-gray-800 text-sm font-mono truncate">
                {showMnemonic ? mnemonic : "••••••••••••••••••••••••••••••••••••"}
              </p>
              <div className="flex gap-2">
                <button className="hover:text-blue-600" onClick={() => setShowMnemonic(!showMnemonic)}>
                  {showMnemonic ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button className="hover:text-blue-600" onClick={() => copyToClipboard(mnemonic)}>
                  <Copy size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Wallets Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
        {keys.map((key, index) => (
          <div key={index} className="border border-black rounded-2xl p-5 shadow-xl bg-white relative">
            <p className="text-sm font-semibold text-blue-700">Solana Account</p>

            {/* Public Key */}
            <p className="text-sm font-semibold mt-2">Public Key:</p>
            <div className="flex justify-between items-center gap-2 border p-2 rounded-md bg-gray-100">
              <p className="text-xs text-gray-900 font-mono truncate max-w-[80%]">{key.publickey}</p>
              <button className="hover:text-blue-600" onClick={() => copyToClipboard(key.publickey)}>
                <Copy size={18} />
              </button>
            </div>

            {/* Private Key */}
            <p className="text-sm font-semibold mt-3">Private Key:</p>
            <div className="flex justify-between items-center gap-2 border p-2 rounded-md bg-gray-100">
              <p className="text-xs text-gray-900 font-mono truncate max-w-[80%]">
                {showPrivateKeys[index] ? key.privatekey : "••••••••••••••••"}
              </p>
              <div className="flex gap-2">
                <button className="hover:text-blue-600" onClick={() => togglePrivateKeyVisibility(index)}>
                  {showPrivateKeys[index] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button className="hover:text-blue-600" onClick={() => copyToClipboard(key.privatekey)}>
                  <Copy size={18} />
                </button>
              </div>
            </div>

            {/* Remove Wallet Button */}
            <button
              onClick={() => removeWallet(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
