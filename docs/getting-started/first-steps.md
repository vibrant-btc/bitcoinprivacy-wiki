# Your First Steps

Now that you understand what Bitcoin privacy is, it is time to take your first steps toward actually using Bitcoin privately.

This page is your practical starting point. Do not try to do everything at once. Focus on building a private foundation one step at a time.

---

## Step 1: Stop Using Custodial Wallets

If your bitcoin is sitting on an exchange, in a brokerage account, or in a custodial app where you do not control the seed phrase, you do not yet control your bitcoin.

!!! warning "Your Keys Must Be Yours"

    The first thing you should do is move your bitcoin into a wallet where you control the private keys. This means a wallet that gives you a seed phrase and lets you back it up yourself.

    If you leave your bitcoin on a third-party platform, the platform can freeze it, censor it, or shut down entirely.

---

## Step 2: Learn the Difference Between Identity and Activity

Bitcoin privacy is about breaking links between:

- **Your real-world identity**
- **Your Bitcoin addresses**
- **Your transaction history**
- **Your internet activity**

The more links you prevent, the harder it is for outsiders to understand your finances.

!!! tip "Compartmentalize"

    Think of each source of bitcoin as a separate compartment.

    - KYC bitcoin goes in one compartment
    - Non-KYC bitcoin goes in another
    - CoinJoined bitcoin goes in another
    - Lightning funds go in another

    Never mix compartments unless you understand the privacy consequences.

---

## Step 3: Use a Wallet That Supports Privacy

Not all wallets are equal. Some wallets leak your data by default. Others give you the tools you need to stay private.

=== "Good Starting Features"

    A privacy-friendly wallet should ideally offer:

    - A fresh address for every receive
    - Coin control
    - Tor support or the ability to connect to your own node
    - Hardware wallet support
    - Clear labeling of UTXOs

=== "What to Avoid"

    Avoid wallets that:

    - Reuse addresses
    - Hide UTXOs from you
    - Force you to connect to third-party servers without control
    - Do not let you choose fees or coins
    - Mix privacy-sensitive data into their servers without telling you

---

## Step 4: Learn How to Receive Bitcoin Privately

When you receive bitcoin, the address you use matters.

### Use a Fresh Address Every Time

A good wallet should automatically generate a new receive address each time you ask for one. This prevents easy address reuse and makes it much harder for someone to build a complete picture of your wallet.

### Do Not Reuse Donation or Public Addresses

If you publish a Bitcoin address on a website, social profile, or invoice, assume it is now public forever. Do not use that address again for anything private.

### Separate Public and Private Receiving

If you need a public donation address, keep that wallet separate from your personal savings wallet. Never let public funds and private funds mix.

---

## Step 5: Learn How to Spend Privately

Spending is where most privacy mistakes happen.

!!! danger "Spending Can Reveal Everything"

    When you spend bitcoin, your wallet may combine several UTXOs into a single transaction. If those UTXOs came from different sources, you have just publicly linked them together.

To spend privately:

1. Use coin control to choose the exact UTXOs you want to spend
2. Avoid combining KYC and non-KYC bitcoin
3. Avoid consolidating coins unnecessarily
4. Learn CoinJoin before trying advanced spending

---

## Step 6: Build Your Privacy Stack Slowly

You do not need every tool on day one. A strong privacy stack is built in layers.

<div class="grid cards" markdown>

-   :material-wallet:{ .lg .middle } __Layer 1: Wallet__

    ---

    Choose a wallet where you control the keys and that supports fresh addresses.

-   :material-server:{ .lg .middle } __Layer 2: Node__

    ---

    Connect to your own node so wallet queries and balance lookups do not leak to third-party servers.

-   :material-shield-check:{ .lg .middle } __Layer 3: Acquisition__

    ---

    Buy bitcoin without KYC where possible so your identity is not attached at the source.

-   :material-shuffle:{ .lg .middle } __Layer 4: CoinJoin__

    ---

    Use CoinJoin to break transaction graph links and build post-mix privacy.

-   :material-lightning-bolt:{ .lg .middle } __Layer 5: Lightning__

    ---

    Use Lightning for some spending and receiving when it fits your privacy needs.

-   :material-brain:{ .lg .middle } __Layer 6: Advanced OPSEC__

    ---

    Tor, VPNs, secure messaging, strong passwords, and other protections matter too.

</div>

---

## A Simple Starter Plan

If you want a very simple first-week plan, do this:

1. Move bitcoin into a wallet you control
2. Turn on address generation for every receive
3. Stop reusing addresses
4. Learn what UTXOs are
5. Keep KYC and non-KYC bitcoin separate
6. Read the CoinJoin section before making any large on-chain spend
7. Connect your wallet to your own node when ready

