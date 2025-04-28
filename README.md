# Hd-Wallet Generator App


## Overview
This project is a React-based application that generates and manages cryptocurrency wallets using mnemonics and private/public keys. It is built with Next.js and Zustand for state management.

![brave_screenshot_localhost](https://github.com/user-attachments/assets/1ddd8c06-fcee-4252-bce0-52994639bd91)
## Features
- Generate a new mnemonic phrase.
- Import a custom mnemonic.
- Generate wallet keys based on the mnemonic.
- Copy public and private keys to the clipboard.
- Toggle visibility of mnemonic and private keys.
- Remove individual wallets or clear all wallets.

## Technologies Used
- **Next.js** (React framework for server-side rendering and static site generation)
- **TypeScript** (for type safety)
- **Zustand** (for state management)
- **Lucide React** (for icons)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/dha-aa/hd-wallet.git
   cd wallet-generator
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

## Project Structure
```
📂 wallet-generator
├── 📂 components
├── 📂 pages
│   ├── index.tsx (Main UI)
├── 📂 store
│   ├── useZustand.ts (State management with Zustand)
├── 📂 actions
│   ├── keygen.ts (Generates keys)
│   ├── mnemonic.ts (Generates mnemonic phrases)
├── package.json
├── README.md
```

## Usage
- Click **Generate Mnemonic** to create a new mnemonic phrase.
- Click **Import** to enter a custom mnemonic manually.
- Click **Add Wallet** to generate wallet keys based on the mnemonic.
- Click **Copy** to copy the mnemonic or keys to the clipboard.
- Click **Show/Hide** to toggle visibility of private keys.
- Click **Clear All Wallets** to remove all generated wallets.

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License
This project is licensed under the MIT License.



