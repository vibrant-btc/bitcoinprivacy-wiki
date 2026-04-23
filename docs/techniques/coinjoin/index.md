---
description: Learn how CoinJoin works, why it is the most powerful onchain privacy tool, and the different implementations available
---

# CoinJoin Intro

[CoinJoin](../../glossary.md#coinjoin) is the most powerful [onchain](../../glossary.md#onchain) privacy tool available to Bitcoin users. It breaks the transaction graph by creating ambiguity about which input funded which output.

---

## What Is CoinJoin?

A CoinJoin is a [collaborative transaction](../../glossary.md#collaborative-transaction) where multiple users combine their inputs and outputs into a single transaction. When done correctly, an outside observer cannot determine which input funded which output.

!!! tip "The Restaurant Analogy"

    Imagine a group of friends goes to a restaurant. Instead of each person paying separately, they put all their orders on one bill and split the cost equally.

    The waiter sees the total bill but cannot tell who ordered what. CoinJoin works the same way - the blockchain sees the total transaction but cannot tell which input funded which output.

---

## How CoinJoin Works

=== "Step 1: Registration"

    Multiple users register to participate in a CoinJoin. Each user contributes one or more inputs of equal value.

=== "Step 2: Coordination"

    A coordinator (which can be a server or a peer-to-peer protocol) collects all the inputs and outputs.

=== "Step 3: Signing"

    Each participant signs the transaction, but only for their own inputs. No participant can see which inputs belong to which other participants.

=== "Step 4: Broadcasting"

    Once all signatures are collected, the transaction is broadcast to the Bitcoin network.

---

## Why CoinJoin Is So Powerful

=== "Breaking the Common Input Ownership Heuristic"

    The [Common Input Ownership Heuristic](../../glossary.md#common-input-ownership-heuristic) ([CIOH](../../glossary.md#cioh)) assumes that all inputs in a transaction belong to the same person. CoinJoin deliberately violates this assumption.

    In a 5-party CoinJoin, 5 different people each contribute inputs. The CIOH would incorrectly assume all inputs belong to one entity.

=== "Creating Exponential Ambiguity"

    For a 5-party CoinJoin with equal outputs, there are 1,496 valid interpretations of which input funded which output. This is 10.55 bits of [entropy](../../glossary.md#boltzmann-entropy).

    For a 7-party CoinJoin, there are 426,833 interpretations (18.70 bits).

    For an 8-party CoinJoin, there are 9,934,563 interpretations (23.24 bits).

    This exponential growth in ambiguity makes CoinJoin the most effective privacy tool available.

=== "The Only Positive Privacy Signal"

    CoinJoin is the ONLY technique that actively improves your privacy by creating ambiguity. Every other privacy technique can only prevent you from losing privacy - CoinJoin actually adds to it.

---

## Types of CoinJoin

=== "Whirlpool"

    Developed by [Samourai Wallet](../../glossary.md#samourai-wallet). Uses a 5-party model with fixed denominations (50k, 100k, 1M, 5M, 50M [sats](../../glossary.md#satoshi-sat)).

    **Pros:**
    - Simple to use
    - Fixed denominations make it easy to identify
    - Good [anonymity set](../../glossary.md#anonymity-set)

    **Cons:**
    - Limited to 5 parties
    - Fixed denominations can be limiting
    - Requires Samourai Wallet or compatible

    [Learn more about Whirlpool →](whirlpool.md)

=== "Wasabi Wallet (WabiSabi)"

    Uses a larger [anonymity set](../../glossary.md#anonymity-set) (50-150 parties) with flexible denominations. Uses the [WabiSabi](../../glossary.md#wabisabi) protocol.

    **Pros:**
    - Large anonymity set
    - Flexible denominations
    - Desktop wallet

    **Cons:**
    - Higher fees for large rounds
    - Wasabi has faced regulatory pressure

    [Learn more about Wasabi Wallet →](wasabi.md)

=== "JoinMarket"

    A peer-to-peer marketplace for CoinJoin. [Makers](../../glossary.md#maker) provide liquidity and earn fees, [Takers](../../glossary.md#taker) initiate CoinJoins.

    **Pros:**
    - No central coordinator
    - Flexible party sizes
    - Makers earn fees

    **Cons:**
    - More complex to use
    - Requires more technical knowledge
    - Slower to find counterparties

    [Learn more about JoinMarket →](joinmarket.md)

---

## CoinJoin Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Do Multiple Rounds__

    ---

    One round of CoinJoin is not enough. Do multiple rounds to increase your [anonymity set](../../glossary.md#anonymity-set).

-   :material-hand-back-right-off:{ .lg .middle } __Never Spend Post-Mix UTXOs Together__

    ---

    Spending 2+ outputs from different CoinJoin rounds in a single transaction completely destroys the mixing.

-   :material-snowflake:{ .lg .middle } __Wait Between Rounds__

    ---

    Do not do all your CoinJoins in quick succession. Wait between rounds to avoid timing analysis.

-   :material-label:{ .lg .middle } __Label Your Post-Mix UTXOs__

    ---

    Keep track of which [UTXOs](../../glossary.md#utxo) are post-mix and which are pre-mix. Never mix them.

-   :material-shield-check:{ .lg .middle } __Use a Fresh Wallet for CoinJoin__

    ---

    Do not use your main wallet for CoinJoin. Use a dedicated wallet to avoid accidental linking.

-   :material-eye-off:{ .lg .middle } __Use Tor for CoinJoin__

    ---

    Always route your CoinJoin traffic through [Tor](../../glossary.md#tor) to hide your IP address.

</div>

---

## Common CoinJoin Mistakes

=== "Post-Mix Consolidation"

    Spending 2+ outputs from different CoinJoin rounds in a single non-CoinJoin transaction. This re-links [UTXOs](../../glossary.md#utxo) via [CIOH](../../glossary.md#cioh), completely destroying the [anonymity set](../../glossary.md#anonymity-set) gained from mixing.

=== "Spending Post-Mix to KYC Addresses"

    Sending post-mix bitcoin to a [KYC](../../glossary.md#kyc-know-your-customer) exchange or other known entity. This links your mixed bitcoin to your identity.

=== "Doing Only One Round"

    A single round of CoinJoin provides limited privacy. Multiple rounds exponentially increase your [anonymity set](../../glossary.md#anonymity-set).

=== "Not Using Tor"

    Doing CoinJoin without [Tor](../../glossary.md#tor) exposes your IP address to the coordinator and other participants.

---

## When to Use CoinJoin

| Situation | Recommendation |
|-----------|---------------|
| **You have [KYC](../../glossary.md#kyc-know-your-customer) bitcoin** | CoinJoin it before spending to get forward-looking privacy |
| **You want to send bitcoin privately** | CoinJoin first, then spend post-mix outputs independently |
| **You received bitcoin from a known source** | CoinJoin it to break the link |
| **You want to store bitcoin long-term** | CoinJoin before moving to cold storage |
| **You have small UTXOs** | Do not CoinJoin [dust](../../glossary.md#dust-attack) - freeze it instead |
