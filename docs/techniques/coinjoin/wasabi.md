---
description: Learn about Wasabi Wallet's WabiSabi CoinJoin protocol with 50-150 participant anonymity sets and flexible denominations
---

# Wasabi Wallet

Wasabi Wallet is a privacy-focused Bitcoin wallet that implements CoinJoin using the WabiSabi protocol. It was one of the most popular desktop CoinJoin wallets until regulatory pressure forced changes to its operation.

!!! info "Other CoinJoin Implementations"

    Wasabi is one of several CoinJoin implementations. Others include [Whirlpool](whirlpool.md) (5-party, fixed denominations) and [JoinMarket](joinmarket.md) (decentralized, maker-taker model). Each has different trade-offs in terms of privacy, convenience, and censorship resistance.

---

## What Is Wasabi Wallet?

Wasabi Wallet is an open-source, non-custodial Bitcoin wallet for desktop that focuses on privacy through CoinJoin. It uses the WabiSabi protocol, which allows for flexible anonymity sets of 50-150 participants.

!!! info "WabiSabi Protocol"

    WabiSabi is a CoinJoin protocol that allows participants to mix any amount of bitcoin, not just fixed denominations. This makes it more flexible than Whirlpool but requires more careful analysis to ensure privacy.

---

## WabiSabi Transaction Example

The image below shows a WabiSabi (Wasabi Wallet) CoinJoin transaction as analyzed by [am-i.exposed](../../advanced/check-privacy.md). Notice the large number of inputs and various sets of variable denomination outputs that distinguish WabiSabi from fixed-denomination CoinJoins like Whirlpool.

![WabiSabi CoinJoin transaction scanned by am-i.exposed](../../images/wabisabi.png){ loading=lazy }

---

## How Wasabi CoinJoin Works

=== "Step 1: Download and Install"

    Wasabi Wallet is available for Windows, macOS, and Linux. Download it from wasabiwallet.io.

=== "Step 2: Fund Your Wallet"

    Send bitcoin to your Wasabi wallet. This will be your premix balance.

=== "Step 3: Enqueue for CoinJoin"

    Click "CoinJoin" and select the amount you want to mix. Wasabi will automatically find a round with other participants.

=== "Step 4: Wait for the Round"

    Wasabi rounds typically take 10-30 minutes to complete. The larger the round, the more privacy you get.

=== "Step 5: Receive Post-Mix Outputs"

    After the round completes, you receive post-mix outputs that are now mixed with other participants' bitcoin.

---

## Wasabi Fees

Wasabi charges a coordination fee for each CoinJoin round:

- **Base fee:** 0.3% of the mixed amount
- **Minimum fee:** 3,000 sats
- **Maximum fee:** No cap

!!! tip "Fee Comparison"

    Wasabi fees are higher than Whirlpool but the larger anonymity set may provide better privacy per round.

---

## Wasabi Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Do Multiple Rounds__

    ---

    Like any CoinJoin, multiple rounds increase your anonymity set exponentially.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Wasabi has built-in Tor support. Enable it in settings.

-   :material-hand-back-right-off:{ .lg .middle } __Never Spend Post-Mix Together__

    ---

    Each post-mix output should be spent independently to preserve privacy.

-   :material-shield-check:{ .lg .middle } __Verify the Download__

    ---

    Always verify the Wasabi download signature before installing.

-   :material-label:{ .lg .middle } __Label Your UTXOs__

    ---

    Keep track of premix and post-mix UTXOs. Never mix them.

-   :material-clock:{ .lg .middle } __Be Patient__

    ---

    Wasabi rounds can take time. Let the network find enough participants.

</div>

---

## Wasabi vs Other CoinJoin Implementations

| Feature | Wasabi | Whirlpool | JoinMarket |
|---------|--------|-----------|------------|
| **Coordinator** | Centralized | Centralized | P2P |
| **Anonymity Set** | 50-150 | 5 | Variable |
| **Denominations** | Flexible | Fixed | Flexible |
| **Fees** | 0.3% | 1% | Variable (earn as maker) |
| **Platform** | Desktop | Mobile | CLI |
| **Tor Support** | Built-in | Built-in | Optional |

---

## Wasabi Legal Situation

In 2024, Wasabi Wallet faced regulatory pressure that led to changes in how the wallet operates. The CoinJoin functionality was modified to comply with certain requirements.

!!! warning "Current Status"

    Check the current status of Wasabi Wallet before using it. The regulatory situation is evolving and the wallet may have changed.

---

## Common Wasabi Mistakes

=== "Spending Post-Mix UTXOs Together"

    Same as any CoinJoin - never spend post-mix outputs together.

=== "Not Using Tor"

    Without Tor, your IP is exposed to the coordinator and other participants.

=== "Doing Only One Round"

    One round gives limited privacy. Do multiple rounds for meaningful privacy.

=== "Mixing KYC and Non-KYC"

    Do not mix KYC bitcoin with non-KYC bitcoin in Wasabi. Keep them separate.

---

## Post-Mix Management

Like Whirlpool, Wasabi produces post-mix UTXOs that require careful handling. The principles are the same across all CoinJoin implementations:

- **Never spend post-mix UTXOs together** - Each output should be spent independently
- **Never mix post-mix with premix** - Keep mixed and unmixed coins separate
- **Label your UTXOs** - Track which coins have been through CoinJoins
- **Avoid consolidation** - Combining post-mix UTXOs reduces your anonymity set

For detailed guidance on managing post-mix coins and handling doxxic change, see the [Whirlpool page](whirlpool.md#spending-the-doxxic-change) which covers these topics in depth.

!!! info "Post-Mix Best Practices"

    The post-mix management principles from [Whirlpool](whirlpool.md#how-to-manage-postmix) apply equally to Wasabi. Never merge mixed and unmixed UTXOs, prefer spending from post-mix directly, don't reuse addresses, and be cautious with script types and consolidations.
