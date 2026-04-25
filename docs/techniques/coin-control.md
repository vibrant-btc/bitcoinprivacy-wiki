---
description: Master coin control to choose which UTXOs to spend and prevent accidentally linking addresses on the blockchain
---

# Coin Control

Coin control is the ability to choose exactly which [UTXOs](../glossary.md#utxo) (Unspent Transaction Outputs) your wallet spends when creating a transaction. It is one of the most powerful privacy tools available to Bitcoin users.

---

## What Is Coin Control?

When you send bitcoin, your wallet needs to select UTXOs to fund the transaction. Without coin control, your wallet automatically picks UTXOs for you - usually choosing the ones that are most convenient or that minimize fees.

With coin control, **you choose which UTXOs to spend**. This gives you complete control over which addresses get linked together on the blockchain.

!!! tip "The Purse Analogy"

    Imagine you have a purse with several banknotes: a $20, a $10, and three $5 notes.

    Without coin control, someone else reaches into your purse and picks which notes to hand over.

    With coin control, you decide exactly which notes to use.

---

## Why Coin Control Matters for Privacy

=== "Preventing Accidental Linking"

    When you combine multiple UTXOs in a single transaction, you publicly link them together via the Common Input Ownership Heuristic.

    If one of those UTXOs came from a KYC exchange and another came from a non-KYC source, spending them together links your KYC identity to your non-KYC bitcoin.

    Coin control lets you avoid this by choosing to spend only UTXOs from the same source.

=== "Avoiding Dust Attacks"

    In a dusting attack, an adversary sends tiny UTXOs to your addresses. When you spend this dust alongside your other UTXOs, the attacker can link all those addresses together.

    With coin control, you can identify and freeze dust UTXOs, preventing them from being spent.

=== "Managing Post-Mix UTXOs"

    After a CoinJoin, you receive multiple UTXOs of equal value. Spending these carelessly can undo the mixing.

    Coin control lets you spend each post-mix UTXO independently, preserving the privacy gained from the CoinJoin.

---

## How to Use Coin Control

=== "In Sparrow Wallet"

    1. Open Sparrow Wallet
    2. Go to the "UTXOs" tab
    3. You will see all your UTXOs listed
    4. Select the UTXOs you want to spend by checking the boxes
    5. Create a new transaction
    6. Sparrow will only use the selected UTXOs

=== "In Ashigaru Wallet"

    1. Open Samourai Wallet
    2. Go to Settings > Transactions
    3. Enable "UTXO Freeze"
    4. Go to the UTXO list
    5. Freeze UTXOs you do not want to spend
    6. Only unfrozen UTXOs will be used

---

## Coin Control Best Practices

<div class="grid cards" markdown>

-   :material-label:{ .lg .middle } __Label Your UTXOs__

    ---

    Tag each UTXO by source: KYC, non-KYC, CoinJoin, mining, etc. This makes it easy to see which UTXOs can be safely spent together.

-   :material-snowflake:{ .lg .middle } __Freeze Dust UTXOs__

    ---

    Any UTXO under 1000 sats should be frozen. It might be a dusting attack.

-   :material-hand-back-right-off:{ .lg .middle } __Never Mix Sources__

    ---

    Do not spend KYC and non-KYC UTXOs together. Do not spend post-mix UTXOs with pre-mix UTXOs.

-   :material-shuffle:{ .lg .middle } __Spend Post-Mix UTXOs Independently__

    ---

    After a CoinJoin, spend each output separately. Never combine post-mix outputs in a single transaction.

-   :material-magnify:{ .lg .middle } __Review Before Sending__

    ---

    Always check which UTXOs your wallet is about to spend. Do not blindly trust automatic selection.

-   :material-lock:{ .lg .middle } __Freeze Suspicious UTXOs__

    ---

    If you receive an unexpected UTXO, freeze it. Do not spend it until you understand where it came from.

</div>

---

## Common Coin Control Mistakes

=== "Consolidating UTXOs"

    Combining many small UTXOs into one large UTXO publicly links all of them together. This is one of the worst things you can do for privacy.

=== "Spending Post-Mix UTXOs Together"

    After a CoinJoin, spending multiple post-mix outputs in the same transaction re-links them via CIOH. This completely destroys the anonymity gained from mixing.

=== "Ignoring Dust UTXOs"

    Spending dust UTXOs alongside your regular UTXOs can link addresses that should remain separate. Always freeze dust.

=== "Not Checking Before Sending"

    Letting your wallet automatically select UTXOs without reviewing them can lead to accidental linking. Always check before sending.

---

## When to Use Coin Control

| Situation | Action |
|-----------|--------|
| **Sending to a friend** | Use coin control to pick UTXOs from the same source |
| **After CoinJoin** | Spend each post-mix UTXO independently |
| **Received unexpected funds** | Freeze the UTXO and investigate |
| **Consolidating small UTXOs** | Only consolidate UTXOs that are already linked |
| **Paying a merchant** | Use UTXOs that are not privacy-sensitive |
| **Moving funds to cold storage** | Use coin control to avoid linking addresses |
