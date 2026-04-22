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

=== "Ashigaru Wallet (Android)"

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

=== "BlueWallet (iOS/Android)"

    **Privacy Features:**
    - Connect to own node (via Electrum server)
    - PSBT and multi-sig
    - Create multiple accounts
    - Buy bitcoin within the app via Hodl Hodl
    - Coin control + labelling
    - Silent Payments support

    **Limitations:** No Tor support

    **Best for:** Beginners who want a simple, feature-rich wallet

---

## Desktop Wallets

Desktop wallets can offer more usability and a greater feature set. Most desktop wallets offer hardware wallet support. Computers are inherently more at risk of being exposed to malicious software compared to phones, so always double check the download source.

=== "Sparrow Wallet (Mac/Windows/Linux)"

    **Privacy Features:**
    - Connect to own node
    - PSBT and multi-sig
    - Coin control
    - Can run over Tor
    - Whirlpool integration (removed)
    - Stonewall algorithm
    - Extremely detailed transaction previews
    - Hardware wallet support

    **Best for:** Privacy-focused users who want maximum control

=== "Bitcoin Core (Mac/Windows/Linux)"

    **Privacy Features:**
    - Built in node
    - Coin control + labelling
    - Can be run over Tor
    - Most trusted wallet (reference implementation)

    **Limitations:** No hardware wallet support within GUI, requires downloading the full blockchain (600GB+), complex

    **Best for:** Users who want to run a full node and wallet together

=== "Electrum (Mac/Windows/Linux)"

    **Privacy Features:**
    - Own node connection (not by default)
    - Coin control + labelling
    - Lightning
    - Extensive hardware wallet support
    - Multi-sig

    **Limitations:** UX lagging behind other implementations, connects to multiple third party servers by default

    **Best for:** Advanced users who want maximum features

---

## Choosing the Right Wallet

| Your Situation | Recommended Wallet |
|---------------|-------------------|
| **Beginner, mobile only** | BlueWallet (iOS/Android) |
| **Privacy-focused, mobile** | Samourai Wallet (Android) |
| **Privacy-focused, desktop** | Sparrow Wallet |
| **Cold storage** | Passport or Coldcard |
| **DIY, minimal supply chain risk** | SeedSigner |

!!! warning "Always Back Up Your Seed Phrase"

    Regardless of the type of wallet(s) you use, always ensure you have a physical seed backup. Write your 12 or 24 words on paper/metal and store them somewhere safe. Never store them digitally.

---

## What Comes Next

Now that you have a wallet, the next step is to run your own node to stop leaking your addresses to third-party servers.

[Running Your Own Node →](node.md)
