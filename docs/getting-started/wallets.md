---
description: Compare Bitcoin wallets by privacy features.
---

# Choosing a Wallet

A Bitcoin [wallet](../glossary.md#wallet) is just like your real wallet - it is a method of storing value. The main difference with a Bitcoin wallet is that it does not actually store bitcoin inside. Bitcoins exist solely on the distributed ledger (blockchain). A Bitcoin wallet stores the keys required to sign the transactions that send bitcoin.

!!! quote "Not Your Keys, Not Your Coins"

    If you are not in control of your private keys (your recovery/seed words) then you are not in control of your bitcoin. A good wallet gives you full control over your keys.

---

## What Makes a Wallet Private?

When evaluating a wallet's privacy capabilities, consider these features:

| Feature | Why It Matters |
|---------|---------------|
| **[Tor](../glossary.md#tor) support** | Hides your IP address from the nodes you connect to |
| **[Coin control](../glossary.md#coin-control)** | Lets you choose which UTXOs to spend, preventing accidental linking |
| **Address reuse prevention** | Automatically generates fresh addresses for each receive |
| **Node connection** | Connect to your own node instead of trusting third-party servers |
| **[CoinJoin](../glossary.md#coinjoin) support** | Built-in mixing for breaking transaction links |
| **[PayJoin](../glossary.md#payjoin-p2ep) support** | Poison the Common Input Ownership Heuristic |
| **Labeling** | Track where your UTXOs came from |

---

## Mobile Wallets

Mobile wallets provide the ultimate in convenience. They are on a device we generally have with us 24/7, which makes transacting anytime, any place, easy. This convenience comes with the trade-off that it may not be a suitable solution for storing a large proportion of your wealth.

Here are two of the best mobile wallets, [Ashigaru](https://ashigaru.rs) and [BlueWallet](https://bluewallet.io)

=== "Ashigaru Wallet"

    **Privacy Features:**

    - Connect to own node (Dojo)
    - Runs over Tor
    - CoinJoin (Whirlpool) + PayJoin (Stowaway)
    - Coin control
    - PayNyms (BIP47 stealth addresses)
    - Stonewall transactions
    - Ricochet for transactional distance

    **Limitations:** Android only

    **Best for:** Users who want maximum privacy on mobile

=== "BlueWallet"

    **Privacy Features:**
    
    - Connect to own node (via Electrum server)
    - PSBT and multi-sig
    - Create multiple accounts
    - Buy bitcoin within the app via Hodl Hodl
    - Coin control + labelling
    - Partial silent Payments support

    **Limitations:** No Tor support

    **Best for:** Beginners who want a simple, feature-rich wallet

---

## Desktop Wallets

Desktop wallets can offer more usability and a greater feature set. Most desktop wallets offer hardware wallet support. Computers are inherently more at risk of being exposed to malicious software compared to phones, so always double check the download source.

There is only one wallet that is reccomended today and that is [Sparrow Wallet](https://sparrowwallet.com):

**Privacy Features:**
- Connect to own node
- PSBT and multi-sig
- Coin control
- Can run over Tor
- Whirlpool integration (removed)
- Stonewall algorithm
- Extremely detailed transaction previews
- Hardware wallet support

---

## Choosing the Right Wallet

| Your Situation | Recommended Wallet |
|---------------|-------------------|
| **Beginner, mobile only** | BlueWallet (iOS/Android) |
| **Privacy-focused, mobile** | Samourai Wallet (Android) |
| **Privacy-focused, desktop** | Sparrow Wallet |
| **DIY, minimal supply chain risk** | SeedSigner |

!!! warning "Always Back Up Your Seed Phrase"

    Regardless of the type of wallet(s) you use, always ensure you have a physical seed backup. Write your 12 or 24 words on paper/metal and store them somewhere safe. Never store them digitally.

---

## What Comes Next

Now that you have a wallet, the next step is to run your own node to stop leaking your addresses to third-party servers.

[Running Your Own Node →](node.md)
