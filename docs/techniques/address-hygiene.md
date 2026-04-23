---
description: Learn why address reuse is the number one privacy killer and how to practice good address hygiene
---

# Address Hygiene

Address hygiene is the foundation of Bitcoin privacy. It is the simplest and most effective privacy practice you can implement, and it costs nothing.

---

## What Is Address Hygiene?

Address hygiene means **never reusing a Bitcoin address**. Every time you receive bitcoin, you should use a fresh, never-before-used address.

!!! warning "Address Reuse Is the #1 Privacy Killer"

    When you reuse an address, you publicly link all transactions to that address. Anyone who learns your identity for that address can see your entire transaction history.

    Address reuse is the single most damaging privacy mistake you can make. It creates a deterministic, irrefutable link between all your transactions.

---

## Why Address Reuse Is So Damaging

=== "The Public Ledger Problem"

    Every Bitcoin transaction is recorded on the blockchain forever. If you reuse an address, every transaction to that address is publicly visible and linked together.

    Anyone can look up that address on a block explorer and see:

    - Every payment you have received
    - The total amount received
    - When you received it
    - Where the funds went when you spent them

=== "The Identity Link Problem"

    If your identity ever becomes linked to a reused address (through a KYC exchange, a public donation, a business transaction, etc.), then **every transaction to that address is now linked to your identity too**.

    This is not a probabilistic heuristic. It is a deterministic, irrefutable link.

=== "The Temporal Analysis Problem"

    When you reuse an address, analysts can study the timing of your transactions:

    - When do you typically receive funds?
    - How quickly do you spend them?
    - Do you have regular payment patterns?
    - Who do you transact with most often?

    This information can be used to build a detailed profile of your financial life.

---

## How to Practice Good Address Hygiene

=== "Use a Wallet That Generates Fresh Addresses"

    Most modern wallets automatically generate a new address each time you request one. This is the easiest way to practice good address hygiene.

    **Good wallets for this:**
    - Sparrow Wallet
    - Samourai Wallet
    - BlueWallet
    - Bitcoin Core
    - Electrum

=== "Never Give Out the Same Address Twice"

    Even if someone asks for "your Bitcoin address," give them a fresh one each time. Do not use a "main" address that you share with everyone.

=== "Do Not Reuse Public Addresses"

    If you publish a Bitcoin address on a website, social profile, or donation page, assume it is now public forever. Do not use that address again for anything private.

=== "Separate Public and Private Receiving"

    If you need a public donation address, keep that wallet separate from your personal savings wallet. Never let public funds and private funds mix.

---

## Reusable Payment Codes: A Better Way to Receive

If you receive bitcoin regularly from the same people or publish a receiving address publicly, generating a fresh address every time can become inconvenient. This is where **reusable payment codes** come in - they let you share one identifier while still receiving to unique addresses each time.

=== "BIP47 PayNyms"

    [BIP47](bip47.md) introduces **Payment Codes** - reusable identifiers you can share publicly. When someone wants to send you bitcoin, they use your payment code to generate a unique address that only you can spend from. Each sender gets a different address, preventing [address reuse](../glossary.md#address-reuse) while maintaining convenience.

    BIP47 is supported by wallets like [Samourai Wallet](../glossary.md#samourai-wallet), [Sparrow Wallet](../glossary.md#sparrow-wallet), and Ashigaru Wallet. It also enables **PayNyms** - human-friendly identities that make sharing payment codes easier.

    [Learn more about BIP47 PayNyms →](bip47.md)

=== "Silent Payments (BIP352)"

    [Silent Payments](silent-payments.md) is a newer protocol that also solves [address reuse](../glossary.md#address-reuse) without requiring a notification transaction like BIP47. You share one Silent Payment address, and senders derive unique, unlinkable [Taproot](../glossary.md#taproot) outputs for each payment.

    Silent Payments are supported by [Sparrow Wallet](../glossary.md#sparrow-wallet), [BlueWallet](../glossary.md#bluewallet), and [Cake Wallet](../glossary.md#cake-wallet).

    [Learn more about Silent Payments →](silent-payments.md)

!!! tip "Which Should You Use?"

    Both BIP47 and Silent Payments solve the same problem - receiving without [address reuse](../glossary.md#address-reuse). BIP47 has broader wallet support and an established ecosystem with PayNyms. Silent Payments has a cleaner on-chain footprint with no notification transaction. Check which wallets you and your regular senders support.

    [See a detailed comparison →](comparison.md)

---

## What About Change Addresses?

When you send bitcoin, your wallet typically creates two outputs:

1. **The payment output** - goes to the recipient
2. **The change output** - goes back to you

Good wallets automatically generate a fresh change address each time. This is part of good address hygiene and you do not need to do anything special.

!!! tip "Change Address Best Practices"

    - Your change address should be a fresh address from your wallet
    - It should use the same address type as your inputs (SegWit to SegWit)
    - It should not be reused
    - It should be labeled as "change" in your wallet

---

## Address Types and Privacy

| Address Type | Prefix | Privacy | Notes |
|-------------|--------|---------|-------|
| **Legacy (P2PKH)** | `1...` | Poor | Old format, higher fees, easily fingerprinted |
| **Nested SegWit (P2SH-P2WPKH)** | `3...` | Fair | Compatible with old wallets, but not optimal |
| **Native SegWit (Bech32)** | `bc1q...` | Good | Lower fees, better privacy, widely supported |
| **Taproot (Bech32m)** | `bc1p...` | Best | Newest format, best privacy, looks like any other script |

!!! tip "Use Native SegWit or Taproot"

    Native SegWit (bc1q) and Taproot (bc1p) addresses offer the best privacy and lowest fees. Most modern wallets support these.

    Taproot is particularly good for privacy because Taproot transactions look identical to any other complex script transaction. This makes it harder to identify your transaction type.

---

## Common Address Hygiene Mistakes

<div class="grid cards" markdown>

-   :material-alert:{ .lg .middle } __Reusing Exchange Withdrawal Addresses__

    ---

    Some people withdraw from an exchange to the same personal address multiple times. This publicly links all those withdrawals together.

-   :material-alert:{ .lg .middle } __Reusing Donation Addresses__

    ---

    Publishing a donation address on a website or social profile and continuing to use it for private receiving.

-   :material-alert:{ .lg .middle } __Reusing Invoice Addresses__

    ---

    Giving a client or customer the same address for multiple invoices. This links all those payments together.

-   :material-alert:{ .lg .middle } __Reusing Mining Pool Addresses__

    ---

    Receiving mining payouts to the same address repeatedly. This links all mining rewards together.

</div>

---

## Best Practices Summary

1. **Always use a fresh address** for each receive
2. **Never reuse public addresses** for private transactions
3. **Separate public and private wallets**
4. **Use Native SegWit or Taproot** addresses
5. **Let your wallet generate addresses automatically**
6. **Label your addresses** in your wallet for tracking
