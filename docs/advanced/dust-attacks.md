---
description: Understand dust attacks, how tiny UTXOs are used for surveillance, and how to defend against them with coin control
---

# Dust Attacks

A [dust attack](../glossary.md#dust-attack) is when an adversary sends tiny amounts of bitcoin (dust) to your addresses. When you spend this dust alongside your other [UTXOs](../glossary.md#utxo), the [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) links the dusted address to all other inputs in the transaction.

---

## What Is a Dust Attack?

Dust refers to UTXOs that are so small that the fee to spend them would be more than their value. A dust attack involves sending these tiny UTXOs to many addresses with the goal of linking them together.

!!! warning "How It Works"

    1. An adversary sends 500 sats to your address
    2. Your wallet now has a new UTXO worth 500 sats
    3. Later, you create a transaction that spends this 500 sat UTXO alongside your other UTXOs
    4. The adversary can now link all those UTXOs together via CIOH

---

## Why Dust Attacks Are Effective

=== "Automatic Spending"

    Many wallets automatically select UTXOs to minimize fees or consolidate small amounts. This means your wallet might spend the dust UTXO without you even realizing it.

=== "Linking Addresses"

    Once the dust is spent alongside your other UTXOs, all those addresses are publicly linked. If any one of them is ever identified, all of them are.

=== "Surveillance Tool"

    Dust attacks are not about stealing your bitcoin. They are about surveillance. The adversary wants to map out your wallet structure and transaction patterns.

---

## How to Defend Against Dust Attacks

<div class="grid cards" markdown>

-   :material-snowflake:{ .lg .middle } __Freeze Dust UTXOs__

    ---

    Any UTXO under 1000 sats should be frozen. This prevents your wallet from spending it.

-   :material-hand-back-right:{ .lg .middle } __Use Coin Control__

    ---

    Always review which UTXOs your wallet is about to spend. Unfreeze any unexpected small UTXOs.

-   :material-label:{ .lg .middle } __Label Suspicious UTXOs__

    ---

    If you receive an unexpected UTXO, label it as "dust attack" and freeze it.

-   :material-shield-check:{ .lg .middle } __Use a Wallet with Dust Protection__

    ---

    Some wallets automatically ignore or freeze dust UTXOs.

</div>

---

## Identifying Dust Attacks

=== "Unexpected Small UTXOs"

    If you see a UTXO worth less than 1000 sats that you did not expect, it might be a dust attack.

=== "Pattern Recognition"

    If you receive multiple small UTXOs from the same source in a short period, this is likely a dust attack.

=== "Known Dust Attack Sources"

    Some addresses are known to send dust for surveillance purposes. Check your UTXOs against known dust attack databases.

---

## What to Do If You Receive Dust

1. **Do not spend it** - Freeze the UTXO immediately
2. **Label it** - Mark it as "dust attack" in your wallet
3. **Investigate** - Check if the source is a known dust attacker
4. **Monitor** - Watch for more dust from the same source
5. **Report** - Share the information with the Bitcoin privacy community

---

## Dust Attack vs Legitimate Small Payment

| Feature | Dust Attack | Legitimate Payment |
|---------|------------|-------------------|
| **Amount** | Usually < 1000 sats | Any amount |
| **Source** | Unknown or suspicious | Known sender |
| **Pattern** | Multiple small UTXOs | Single payment |
| **Intent** | Surveillance | Genuine payment |
