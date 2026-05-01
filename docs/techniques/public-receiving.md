---
description: Learn how to receive Bitcoin publicly without reusing addresses, using BIP47 PayNyms, Silent Payments, separate wallets, and good labeling.
---

# Public Receiving

Public receiving means accepting bitcoin from people who may not contact you privately first. Examples include donations, tips, invoices, creator payments, open-source funding, or a payment link on a website.

This is difficult because a normal Bitcoin [address](../glossary.md#address) should only be used once. If you publish one static address and keep receiving to it, you create [address reuse](../glossary.md#address-reuse), which is one of the easiest ways to lose privacy.

---

## The Core Problem

A Bitcoin address is not like an email address. It should not be reused forever.

!!! danger "A Public Address Becomes Public Forever"

    If you put a Bitcoin address on a website, social profile, GitHub page, invoice, or poster, assume that address is now permanently connected to that context.

    Anyone can watch it forever and see every payment it receives.

If that address is later connected to your real identity, every payment to that address is connected too.

---

## What Public Address Reuse Reveals

If you reuse one public address, observers can learn:

- How many payments you received
- When people paid you
- How much you received in total
- Whether donations are increasing or decreasing
- When you later spend those funds
- Which other [UTXOs](../glossary.md#utxo) become linked if you spend them together

This is not a guess or a weak [heuristic](../glossary.md#heuristic). It is a direct public link.

---

## Better Ways to Receive Publicly

<div class="grid cards" markdown>

-   :material-account-key:{ .lg .middle } __BIP47 PayNyms__

    ---

    Share one reusable payment code. Senders create fresh addresses for you. Good wallet support, but the first connection normally needs a notification transaction.

    [Learn about BIP47 →](address-reuse/bip47.md)

-   :material-volume-off:{ .lg .middle } __Silent Payments__

    ---

    Share one Silent Payment address. Senders derive unique Taproot outputs without a notification transaction. Cleaner on-chain footprint, but harder wallet scanning.

    [Learn about Silent Payments →](address-reuse/silent-payments.md)

-   :material-lightning-bolt:{ .lg .middle } __Lightning + BOLT12__

    ---

    Useful for small tips and quick payments. For reusable public Lightning receiving, prefer [BOLT12 offers](../lightning/bolt12.md) when your wallet supports them, because they are designed for reusable payment requests with better receiver privacy.

    [Lightning Privacy →](../lightning/privacy.md)

-   :material-store:{ .lg .middle } __BTCPay Server__

    ---

    If you run a shop, donation page, or project site, [BTCPay Server](https://btcpayserver.org/) can automatically create a fresh on-chain receiving address for each invoice. This avoids publishing one static Bitcoin address forever.

-   :material-wallet:{ .lg .middle } __Separate Wallets__

    ---

    Keep public receiving separate from private savings. Do not mix public donations with personal funds unless you understand the privacy cost.

</div>

---

## Which Public Receiving Method Should You Use?

| Situation | Better option |
|---|---|
| You want a public donation identity with good wallet support | [BIP47 PayNym](address-reuse/bip47.md) |
| You want no notification transaction and accept newer wallet trade-offs | [Silent Payments](address-reuse/silent-payments.md) |
| You receive small tips or casual payments | [Lightning](../lightning/basics.md), preferably with [BOLT12 offers](../lightning/bolt12.md) when supported |
| You run a business with repeat customers | Fresh invoices, [BTCPay Server](https://btcpayserver.org/), BIP47, or another payment processor that avoids address reuse |
| You only need one private payment | Generate a fresh normal address and give it privately |

!!! tip "Use the Simplest Tool That Avoids Address Reuse"

    You do not need the most advanced tool for every situation. The main rule is simple: do not publish a normal Bitcoin address and reuse it forever.

---

## Keep Public and Private Funds Separate

Public receiving creates public context. If you receive donations to a public project, those funds are linked to that project. If you later spend those funds together with private savings, you may link your private wallet to the public project.

Good separation means:

1. Use a dedicated wallet or account for public receiving
2. Label every incoming payment
3. Avoid spending public and private UTXOs together
4. Avoid consolidating public donations into private savings
5. Use [coin control](coin-control.md) before spending

??? warning "Why Mixing Public and Private Funds Is Risky"

    Imagine you receive donations for a public project. Later, you spend one donation UTXO together with a personal savings UTXO.

    The [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) now suggests both UTXOs belong to the same person or wallet. That can connect your private savings to the public project.

---

## Public Receiving Best Practices

<div class="grid cards" markdown>

-   :material-numeric-off:{ .lg .middle } __Never Reuse a Normal Address__

    ---

    Do not publish a static `bc1...` address for long-term receiving.

-   :material-account-box:{ .lg .middle } __Use a Payment Code__

    ---

    Prefer BIP47 or Silent Payments when you need a reusable public identifier.

-   :material-label:{ .lg .middle } __Label Everything__

    ---

    Track where each payment came from so you do not accidentally mix contexts.

-   :material-wallet-outline:{ .lg .middle } __Separate Public Wallets__

    ---

    Use a separate wallet or account for public receiving.

-   :material-shuffle-disabled:{ .lg .middle } __Avoid Consolidation__

    ---

    Do not combine many public donations unless they are already meant to be linked.

-   :material-incognito:{ .lg .middle } __Use Tor When Possible__

    ---

    Protect your network privacy when checking balances or spending.

</div>

---

## Common Mistakes

=== "Publishing One Address Forever"

    This is the classic mistake. Everyone can see every payment to that address.

=== "Using a Personal Wallet for Donations"

    Public donations and private savings should not live in the same wallet unless you are very careful with [coin control](coin-control.md).

=== "Looking Up Donation Addresses From Home"

    Searching your own public address on a block explorer from your home IP can link your interest in that address to your network identity.

=== "Sweeping Donations Into Savings"

    A large sweep or [consolidation](../analysis/consolidation.md) can link many donors and your savings wallet together.

---

## Key Takeaways

1. Public receiving is different from private one-to-one receiving
2. Never publish and reuse a normal Bitcoin address
3. Use BIP47, Silent Payments, BOLT12 Lightning offers, BTCPay Server, or fresh invoices instead
4. Keep public funds separate from private funds
5. Label UTXOs and use coin control before spending

---

## References

- [BIP47 PayNyms](address-reuse/bip47.md)
- [Silent Payments](address-reuse/silent-payments.md)
- [BOLT12 Offers](../lightning/bolt12.md)
- [BTCPay Server](https://btcpayserver.org/)
- [Address Hygiene](address-reuse/index.md)
- [Coin Control](coin-control.md)
