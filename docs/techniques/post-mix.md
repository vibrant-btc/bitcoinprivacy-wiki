---
description: Essential post-mix UTXO management best practices to avoid destroying the privacy gains from CoinJoins
---

# Post-Mix Best Practices

After you have completed a [CoinJoin](../glossary.md#coinjoin), your bitcoin is in a "post-mix" state. How you handle these post-mix [UTXOs](../glossary.md#utxo) is critical - careless spending can completely undo the privacy you gained from mixing.

---

## What Is a Post-Mix UTXO?

A post-mix UTXO is an output from a CoinJoin transaction. It has been mixed with other participants' bitcoin and has a certain level of privacy.

!!! warning "The Golden Rule"

    **Never spend 2+ post-mix UTXOs from different CoinJoin rounds in the same transaction.**

    This is the single most damaging mistake a CoinJoin user can make. It completely destroys the [anonymity set](../glossary.md#anonymity-set) gained from mixing.

---

## Why Post-Mix Spending Is Dangerous

=== "The Common Input Ownership Heuristic"

    When you spend 2+ post-mix UTXOs together, the [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) links them. An adversary can then trace backward through each CoinJoin to the pre-mix inputs, collapsing the anonymity set to 1.

=== "The Severity"

    Post-mix consolidation is one of the most damaging mistakes you can make. It completely undoes the privacy you worked hard to achieve through CoinJoin.

=== "The Chain Reaction"

    Once post-mix UTXOs are linked, every subsequent transaction from those UTXOs is also compromised. The damage spreads forward through your entire transaction history.

---

## Post-Mix Best Practices

<div class="grid cards" markdown>

-   :material-hand-back-right-off:{ .lg .middle } __Spend Each UTXO Independently__

    ---

    Each post-mix UTXO should be spent in its own transaction. Never combine them.

-   :material-shuffle:{ .lg .middle } __Use PayJoin When Possible__

    ---

    [PayJoin & Stowaway](payjoin.md) add an extra layer of privacy to post-mix spending.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Always route post-mix spending through Tor to hide your IP address.

-   :material-label:{ .lg .middle } __Label Your Post-Mix UTXOs__

    ---

    Keep track of which UTXOs are post-mix and which round they came from.

-   :material-clock:{ .lg .middle } __Wait Between Spending__

    ---

    Do not spend all your post-mix UTXOs in quick succession. Wait between spends.

-   :material-shield-check:{ .lg .middle } __Use Ricochet for Extra Distance__

    ---

    Ricochet adds 4 hops between your post-mix and the final destination.

</div>

---

## Post-Mix Wallet Management

=== "Samourai Wallet"

    Samourai Wallet has a dedicated post-mix wallet that keeps your mixed UTXOs separate from your premix and regular balances.

    **Features:**
    - Separate post-mix wallet
    - Stowaway (PayJoin) support
    - Ricochet support
    - UTXO freeze for dust

=== "Sparrow Wallet"

    Sparrow Wallet supports Whirlpool and has coin control features for managing post-mix UTXOs.

    **Features:**
    - Whirlpool integration
    - Coin control
    - UTXO labeling
    - Transaction preview

---

## Common Post-Mix Mistakes

=== "Post-Mix Consolidation"

    Spending 2+ post-mix UTXOs in a single transaction. This is the worst mistake you can make.

=== "Spending Post-Mix to KYC Addresses"

    Sending post-mix bitcoin to a KYC exchange or other known entity links your mixed bitcoin to your identity.

=== "Not Waiting Between Spends"

    Spending all your post-mix UTXOs in quick succession creates a temporal link that can be analyzed.

=== "Mixing Post-Mix with Premix"

    Never spend post-mix UTXOs alongside premix UTXOs. This links your mixed and unmixed bitcoin.

