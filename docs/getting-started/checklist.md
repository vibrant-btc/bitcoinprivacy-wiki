# Your Privacy Checklist

Use this checklist to track your Bitcoin privacy journey. Start with the basics and work your way up as you gain knowledge and confidence.

---

## Beginner: The Essentials

These are the absolute minimum steps everyone should take.

<div class="grid cards" markdown>

-   :material-wallet:{ .lg .middle } __Control Your Keys__

    ---

    Move your bitcoin into a wallet where you control the seed phrase. If you do not control the keys, you do not control the bitcoin.

-   :material-numeric-off:{ .lg .middle } __Never Reuse Addresses__

    ---

    Always use a fresh address for each receive. Address reuse is the number one privacy killer.

-   :material-label:{ .lg .middle } __Label Your UTXOs__

    ---

    Know where each UTXO came from: KYC, non-KYC, CoinJoin, dust, etc.

-   :material-hand-back-right-off:{ .lg .middle } __Never Mix KYC and Non-KYC__

    ---

    Keep your KYC and non-KYC bitcoin completely separate. Never spend them together.

-   :material-snowflake:{ .lg .middle } __Freeze Dust UTXOs__

    ---

    Any UTXO under 1000 sats should be frozen. It might be a surveillance attack.

-   :material-eye-off:{ .lg .middle } __Do Not Look Up Addresses on Public Explorers__

    ---

    Searching your own addresses from your home IP leaks your interest and links you to those addresses.

</div>

---

## Intermediate: Building Privacy

Once you have the basics, add these layers.

<div class="grid cards" markdown>

-   :material-server:{ .lg .middle } __Run Your Own Node__

    ---

    Connect your wallet to your own node so queries do not leak to third-party servers.

-   :material-shield-lock:{ .lg .middle } __Use a Hardware Wallet__

    ---

    Store your seed phrase on a dedicated hardware device that never touches the internet directly.

-   :material-shuffle:{ .lg .middle } __Use CoinJoin__

    ---

    Break the transaction graph by mixing your bitcoin with others.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Route all Bitcoin traffic through Tor to hide your IP address.

-   :material-hand-back-right:{ .lg .middle } __Practice Coin Control__

    ---

    Choose which UTXOs to spend. Do not let your wallet pick them automatically.

-   :material-message:{ .lg .middle } __Use Secure Messaging__

    ---

    Use Signal or similar for Bitcoin discussions. Never share seed phrases over any digital channel.

</div>

---

## Advanced: Maximum Privacy

For users who want the strongest possible privacy.

<div class="grid cards" markdown>

-   :material-shield-key:{ .lg .middle } __Use Multisig__

    ---

    Require multiple signatures to spend. This increases security and privacy.

-   :material-swap-horizontal:{ .lg .middle } __Use PayJoin__

    ---

    Poison the Common Input Ownership Heuristic by having the recipient contribute an input.

-   :material-cellphone-nfc:{ .lg .middle } __Use GrapheneOS__

    ---

    A hardened Android build that provides strong isolation and privacy.

-   :material-server-network:{ .lg .middle } __Self-Host Infrastructure__

    ---

    Run your own node, explorer, Electrum server, and Lightning node.

-   :material-magnify-scan:{ .lg .middle } __Audit Your Privacy__

    ---

    Learn about privacy with tools like am-i.exposed.

-   :material-shuffle-variant:{ .lg .middle } __Use BIP47 or Silent Payments__

    ---

    Reusable payment codes that generate a fresh address for each sender.

</div>

---

## How to Use This Checklist

1. **Start at the top** - Complete all Beginner items first
2. **Move to Intermediate** - Once comfortable, add Intermediate layers
3. **Advance gradually** - Do not rush into Advanced without understanding the basics
4. **Test your privacy** - Use tools like am-i.exposed to verify your progress
5. **Keep learning** - Privacy is not a destination, it is a journey



You do not need to implement every single item to have good privacy. Even doing the Beginner items puts you ahead of most Bitcoin users.

Focus on the items that fit your threat model and technical ability. Build your privacy stack one layer at a time.
