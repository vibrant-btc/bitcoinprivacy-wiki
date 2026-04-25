---
description: Learn how UTXOs work, why they matter for privacy, and how coin control helps prevent accidental address linking
---

# Understanding UTXOs

Understanding UTXOs (Unspent Transaction Outputs) is the single most important foundation for Bitcoin privacy. If you understand UTXOs, you understand why Bitcoin privacy works the way it does.

---

## The UTXO Model Explained

Most people are used to thinking about money like a bank account. Your bank account has a single balance - say, $1,000. When you spend $50, the bank subtracts $50 from your balance and you have $950 left. Simple.

!!! danger "Bitcoin Does NOT Work This Way"

    Bitcoin does not have account balances. Instead, your wallet holds a collection of **UTXOs** - individual chunks of bitcoin, each with a specific value.

    Think of UTXOs like physical banknotes in your purse.

=== "The Purse Analogy"

    Imagine you have a physical purse with these banknotes:

    - One $20 note
    - One $10 note
    - Three $5 notes

    Your total is $45, but you do not have a single $45 note. You have **five separate notes** that add up to $45.

    **Each of these notes is like a UTXO in Bitcoin.**

=== "How Spending Works"

    Let us say you want to buy something that costs $25. You cannot hand over "exactly $25" because you do not have a $25 note. Instead, you have to:

    1. Pick one or more notes that add up to at least $25
    2. Hand them over to the seller
    3. Receive change back

    For example, you might hand over the $20 note and the 10 dollar note ($30 total). The seller keeps $25 and gives you $5 in change.

    **After this transaction:**

    - The seller has your $20 and $10 notes
    - You have a new $5 note (change) plus your original three $5 notes
    - Your total is still correct, but the specific notes you hold have changed

---

## Why UTXOs Matter for Privacy

Here is the critical privacy insight: **when you combine multiple UTXOs in a single transaction, you publicly link them together on the blockchain.**

Going back to the purse example: imagine someone is watching every transaction you make. They see you hand over a $20 note and a $10 note together. They now know that whoever made that transaction owned both of those notes at the same time.

??? warning "The Common Input Ownership Heuristic"

    In Bitcoin terms: if a transaction spends UTXO A and UTXO B together, anyone looking at the blockchain knows that whoever made that transaction controlled both UTXO A and UTXO B.

    This is called the [Common Input Ownership Heuristic (CIOH)](../glossary.md#common-input-ownership-heuristic), and it is the foundation of all Bitcoin surveillance.

=== "The Privacy Problem"

    Every time you receive bitcoin, you receive it to a new UTXO. If you receive bitcoin 10 times, you have 10 UTXOs. When you want to spend bitcoin, your wallet picks some of those UTXOs to spend.

    If your wallet picks 3 UTXOs to combine in a single transaction, it has just publicly linked those 3 UTXOs together. Anyone analyzing the blockchain now knows they belong to the same person.

=== "The Linking Chain"

    If one of those UTXOs was ever linked to your real identity (through a KYC exchange, a public address, a business transaction), then all 3 UTXOs are now linked to your identity too.

    And if you later spend those 3 UTXOs alongside 2 more UTXOs, you have now linked 5 UTXOs together. The chain grows with every careless transaction.

---

## Coin Control: Taking Control of Your UTXOs

**[Coin control](../glossary.md#coin-control)** is the ability to choose which UTXOs to spend in a transaction. Without coin control, your wallet automatically picks UTXOs for you, and it usually picks them in a way that is convenient but not private.

With coin control, you can:

- Choose UTXOs that are already linked together (avoiding new linking)
- Avoid spending UTXOs that came from KYC sources alongside non-KYC UTXOs
- Avoid spending dust UTXOs that might be surveillance attacks
- Keep your UTXOs separated by source and purpose
- **Label your UTXOs** - Tag each UTXO with notes about where it came from (KYC exchange, non-KYC purchase, CoinJoin output, etc.) so you always know what you are spending

??? tip "Good Wallets with Coin Control"

    - **[Sparrow Wallet](../glossary.md#sparrow-wallet)** - Excellent coin control with detailed UTXO information
    - **[Ashigaru Wallet](../glossary.md#ashigaru-wallet)** - Coin control with labeling
    - **[BlueWallet](../glossary.md#bluewallet)** - Basic coin control

---

## UTXO Consolidation: The Privacy Disaster

**Consolidation** is when you combine many UTXOs into a single UTXO. This is like taking all the separate notes in your purse and exchanging them for one big note.

On the blockchain, a consolidation transaction looks like this:

- **Many inputs** (all your separate UTXOs)
- **One output** (the consolidated UTXO)

!!! danger "This Is the Worst Thing You Can Do for Privacy"

    A consolidation transaction publicly declares that all of those input addresses belong to the same person. If any one of them is ever linked to your identity, all of them are.

---

## Best Practices for UTXO Privacy

<div class="grid cards" markdown>

-   :material-hand-back-right-off:{ .lg .middle } __Never Consolidate__

    ---

    Never combine UTXOs unless they are already linked together. Each consolidation publicly links all inputs.

-   :material-toggle-switch:{ .lg .middle } __Use Coin Control__

    ---

    Always choose which UTXOs to spend. Do not let your wallet pick them automatically.

-   :material-label:{ .lg .middle } __Label Your UTXOs__

    ---

    Label each UTXO by source: KYC, non-KYC, CoinJoin, dust, etc.

-   :material-snowflake:{ .lg .middle } __Freeze Dust UTXOs__

    ---

    Any UTXO under 1000 sats should be frozen. It might be a surveillance attack.

-   :material-link-off:{ .lg .middle } __Never Mix KYC and Non-KYC__

    ---

    Keep your KYC and non-KYC bitcoin completely separate. Never spend them together.

-   :material-shuffle:{ .lg .middle } __Use CoinJoin__

    ---

    CoinJoin breaks the links between your UTXOs by creating ambiguity about which input funded which output.

</div>

---

## What Comes Next

Now that you understand UTXOs, the next step is to understand how chain analysis companies use this information to track you.

[How Chain Analysis Works →](chain-analysis.md)
