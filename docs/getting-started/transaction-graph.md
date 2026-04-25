---
description: Learn how chain analysis companies analyze the Bitcoin transaction graph and how to break clustering algorithms
---

# Transaction Graph Analysis

The Bitcoin blockchain is a giant graph where transactions are nodes and the flow of bitcoin between them creates edges. Chain analysis companies specialize in analyzing this graph to identify who owns which addresses.

---

## How the Graph Works

Every Bitcoin transaction:
- Takes inputs from previous transaction outputs
- Creates new outputs that can be spent in future transactions
- Links addresses together through the Common Input Ownership Heuristic

By following these links, analysts can build clusters of addresses that likely belong to the same person or entity.

---

## Clustering Algorithms

=== "Common Input Ownership (CIOH)"

    The most powerful clustering heuristic. If a transaction has multiple inputs, they are assumed to belong to the same entity. This is usually correct and allows analysts to link many addresses together.

=== "Change Detection"

    By identifying which output is change, analysts can follow the money forward through subsequent transactions.

=== "Peel Chain Tracing"

    Following sequential self-transfers where the smaller output is the payment and the larger output is change feeding the next hop.

=== "Temporal Analysis"

    Analyzing the timing of transactions to identify patterns and link addresses.

---

## Breaking the Graph

=== "CoinJoin"

    [CoinJoin](../glossary.md#coinjoin) creates transactions where the input-output mapping is ambiguous. This breaks the deterministic links that clustering algorithms rely on.

=== "PayJoin"

    [PayJoin](../glossary.md#payjoin-p2ep) adds a recipient input to the transaction, poisoning the CIOH and creating false links.

=== "Address Hygiene"

    Never reusing addresses prevents easy clustering and makes the graph harder to analyze.

=== "UTXO Management"

    Careful [coin control](../glossary.md#coin-control) prevents accidental linking of addresses that should remain separate.

---

## Multi-Hop Tracing

Chain analysis tools can trace bitcoin through many hops:

| Hop Depth | What It Means |
|-----------|--------------|
| **1-hop** | Direct transaction links |
| **2-3 hops** | What most exchanges check |
| **4+ hops** | Advanced analysis, often defeated by Ricochet |

---

## The Limits of Graph Analysis

Graph analysis has limits:

- **CoinJoin creates exponential ambiguity** - Each additional party multiplies the interpretations
- **PayJoin poisons the heuristics** - Creates false links that mislead analysis
- **Lightning Network activity is mostly off-chain** - Individual payments are not visible
- **Privacy tools are constantly improving** - New techniques emerge regularly

---

## Graph Analysis Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use CoinJoin Regularly__

    ---

    CoinJoin is the most effective way to break the transaction graph.

-   :material-swap-horizontal:{ .lg .middle } __Use PayJoin When Possible__

    ---

    PayJoin poisons the Common Input Ownership Heuristic.

-   :material-numeric-off:{ .lg .middle } __Never Reuse Addresses__

    ---

    Address reuse makes clustering trivial.

-   :material-hand-back-right:{ .lg .middle } __Practice Good Coin Control__

    ---

    Choose which UTXOs to spend to avoid accidental linking.

-   :material-server:{ .lg .middle } __Run Your Own Node__

    ---

    Prevents third-party servers from building a graph of your activity.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Hides your IP address from the Bitcoin network.

</div>
