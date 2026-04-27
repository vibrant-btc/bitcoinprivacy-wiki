---
description: Learn how Stonewall creates CoinJoin-like transactions solo to break heuristics and add plausible deniability
---

# Stonewall

[Stonewall](../glossary.md#stonewall) is a privacy technique that creates a transaction indistinguishable from a [CoinJoin](../glossary.md#coinjoin), but performed by a single user. It is designed to break the [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) by creating false ambiguity.

---

## What Is Stonewall?

Stonewall is a method of creating a transaction with 2 inputs and 4 outputs, where 2 of the outputs are equal in value. This structure mimics the appearance of a 2-party CoinJoin, making it difficult for chain analysis to determine which inputs belong to which outputs.

!!! tip "The Key Idea"

    A normal transaction with 2 inputs and 2 outputs clearly shows the sender is combining their own UTXOs. A Stonewall transaction looks like a CoinJoin between two parties, creating plausible deniability about who owns what.

---

## Stonewall Transaction Example

The image below shows a Stonewall transaction as analyzed by [am-i.exposed](https://am-i.exposed). Notice the 4 outputs with 2 being equal-value outputs, which mimics the appearance of a 2-party CoinJoin.

![Stonewall transaction scanned by am-i.exposed](../images/stonewall.png){ loading=lazy }

---

## How Stonewall Works

=== "Step 1: Create Two Inputs"

    The user selects two UTXOs from their wallet to use as inputs.

=== "Step 2: Create Four Outputs"

    The transaction has 4 outputs:
    - 2 outputs of equal value (the "CoinJoin" outputs)
    - 2 outputs of different values (change and payment)

=== "Step 3: Broadcast"

    The transaction is broadcast to the network. To an observer, it looks like a 2-party CoinJoin.

---

## Stonewall vs CoinJoin

| Feature | Stonewall | CoinJoin |
|---------|-----------|----------|
| **Parties** | 1 (appears as 2) | 5+ |
| **Privacy Gain** | Moderate | High |
| **Fees** | Higher (4 outputs) | Shared |
| **Speed** | Instant | Queue required |
| **Best For** | Quick privacy boost | Serious mixing |

---

## What's the Difference Between Stonewall and Stonewall x2?

A Stonewall x2 works exactly like a Stonewall in pattern, except that x2 is collaborative while Stonewall is not. Stonewall x2 involves a third party outside the payment who contributes bitcoin to boost privacy. In a regular Stonewall, the collaborator's role is played by the sender alone.

Continuing the bakery example: if Alice didn't find a collaborator like Bob, she could do a Stonewall by herself - both inputs would be hers, and she would receive three change outputs.

From the outside, the pattern would look the same.

Practical logic for Ashigaru spending tools:

- If the merchant does not support PayJoin/Stowaway, you can perform a collaborative spend Stonewall x2 with an external participant.
- If you don't find a collaborator, you can do a solo Stonewall that mimics the Stonewall x2 pattern.

!!! tip "Same Structure, Different Collaboration"

    Both transactions share the same structure on-chain. The difference collaborative vs non-collaborative is invisible to observers, which increases doubt - and privacy.

---

## Why Use a Stonewall Transaction?

Stonewall adds significant entropy to the transaction and confuses chain-analysis heuristics. From the outside, it can be misinterpreted as a small two-party coinjoin. In reality, it's a payment with a collaborator who remains net-neutral (in the x2 case) or a solo transaction designed to look like one.

Even if the observer identifies the Stonewall x2 pattern, they cannot know:

- Which of the two equal-amount outputs is the payment
- Whether Alice or Bob made the payment
- Whether the two inputs came from two different people or one person combining UTXOs

Because Stonewall solo and Stonewall x2 collaborative share the same pattern, distinguishing them without extra context is impossible, adding more doubt to the spend.

!!! info "The Ambiguity Is the Privacy"

    The ambiguity about who paid and who contributed which inputs/outputs is the privacy benefit.

---

## How to Do a Stonewall Transaction in Ashigaru

Stonewall was originally developed by the Samourai Wallet team and is now implemented in Ashigaru, the fork created after the Samourai developers' arrest.

Unlike Stowaway or Stonewall x2, Cahoots, Stonewall does not require PayNyms. It can be executed directly, without preparation or collaboration.

In practice, you don't need a guide just to make Stonewall - Ashigaru generates Stonewall automatically for each spend when your wallet has sufficient UTXOs.

1. Tap the `+` in the bottom-right, then select `Send`
2. Choose the account to spend from
3. Enter the transaction details: recipient address and amount to send, then press the arrow to confirm
4. You can adjust default fees for current network conditions. The most interesting element here is the transaction type: Ashigaru automatically selects `STONEWALL` when possible
5. Tap `PREVIEW` for more details - you'll see the Stonewall pattern: 2 inputs of equal amount, 2 outputs of equal amount, plus change outputs
6. If you prefer a simple payment, tap the pencil icon top-right, then switch `STONEWALL` to `Simple`
7. After checking all details, slide the green arrow at the bottom to sign and broadcast

---

## When to Use Stonewall

- When you want quick privacy without waiting for a CoinJoin round
- When you want to break a link between two UTXOs
- When you want to create plausible deniability about a transaction
- When CoinJoin is not available or practical
- When the merchant does not support PayJoin/Stowaway

---

## Stonewall Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use Sparrow Wallet__

    ---

    Sparrow Wallet has built-in Stonewall support. It makes creating Stonewall transactions easy.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Route your Stonewall transaction through Tor to hide your IP address.

-   :material-hand-back-right-off:{ .lg .middle } __Do Not Overuse__

    ---

    If every transaction you make is a Stonewall, it becomes a fingerprint. Use it strategically.

-   :material-shield-check:{ .lg .middle } __Combine with Other Techniques__

    ---

    Stonewall works best when combined with good address hygiene and coin control.

</div>

---

## Common Stonewall Mistakes

=== "Using Stonewall for Every Transaction"

    If every transaction you make has the Stonewall structure, it becomes a wallet fingerprint. Use it strategically.

=== "Not Using Tor"

    Without Tor, your IP is exposed and the Stonewall can be linked to you.

=== "Poor UTXO Selection"

    Make sure the inputs you use for Stonewall are not already linked together. Otherwise, you are just consolidating.
