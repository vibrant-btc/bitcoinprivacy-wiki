---
description: Learn how to analyze your Bitcoin privacy using real transaction examples from am-i.exposed
hide:
  - navigation
  - toc
---

# Privacy Analysis: Guided Examples

This section walks you through real Bitcoin transactions and shows you exactly what [chain analysis](../glossary.md#chain-analysis) companies can figure out about them. By studying these examples, you will learn what to look for in your own transactions and how to avoid common privacy mistakes.

Each example uses [Boltzmann entropy](../boltzmann/index.md) to measure the ambiguity in the transaction. If you are not familiar with Boltzmann entropy, we recommend reading the [Boltzmann Entropy section](../boltzmann/index.md) first - it explains the mathematical foundation of transaction privacy in beginner-friendly terms.

Each example shows:

- What the transaction looks like on-chain
- What an analyst can figure out
- How serious the privacy leak is
- What you can do differently next time

---

## Browse by Example

<div class="grid cards" markdown>

-   :material-cash-minus:{ .lg .middle } __Batch Payment__

    ---

    A common transaction: 1 input sending to 5 outputs. Learn what round amounts and batch patterns reveal.

    [View Example →](batch-payment.md)

-   :material-combine:{ .lg .middle } __UTXO Consolidation__

    ---

    The worst privacy mistake: combining 10 UTXOs into 1. See why the link probability matrix shows 100% certainty.

    [View Example →](consolidation.md)

-   :material-shuffle:{ .lg .middle } __Whirlpool CoinJoin__

    ---

    A privacy win: 5 inputs, 5 equal outputs. Learn why the link probability is 34.2% (not 20%) and what Boltzmann entropy really means.

    [View Example →](whirlpool.md)

-   :material-shield-lock:{ .lg .middle } __Stonewall__

    ---

    A steganographic transaction: 2 inputs, 4 outputs with 2 equal pairs. Learn how it creates plausible deniability with 5 interpretations.

    [View Example →](stonewall.md)

-   :material-swap-horizontal:{ .lg .middle } __Ricochet__

    ---

    A chain of 5 self-payments creating transactional distance. Learn how it protects against taint analysis and why the Classic variant is detectable.

    [View Example →](ricochet.md)

</div>

---

## How to Audit Your Own Privacy

1. Go to [am-i.exposed](https://am-i.exposed)
2. Paste a Bitcoin address or transaction ID
3. Review your privacy score and findings
4. Follow the recommendations
5. Re-scan after making improvements

!!! warning "Your Queries Are Not Fully Private"

    Analysis runs client-side, but your browser makes API requests to mempool.space. Their servers can see your IP address and which addresses you look up.

    **For stronger privacy:**
    - Use Tor Browser
    - Wait before querying a recent transaction
    - Self-host with your own mempool.space instance
