# Peel Chains

A [peel chain](../glossary.md#peel-chain) is a pattern where a large [UTXO](../glossary.md#utxo) is repeatedly spent, peeling off small payments and returning the remainder as [change](../glossary.md#change). This creates a traceable chain of decreasing outputs that [chain analysts](../glossary.md#chain-analysis) use to track funds across many transactions.

---

## How Peel Chains Work

Imagine you have a single UTXO worth 1 BTC. You want to make several payments over time. Each time you spend:

1. You use the large UTXO as input
2. You create a small payment output to the recipient
3. You create a larger change output back to yourself
4. The change output becomes the input for the next transaction

This creates a linear chain:

```
1.0 BTC → 0.1 BTC (payment) + 0.89 BTC (change)
                                    ↓
0.89 BTC → 0.05 BTC (payment) + 0.83 BTC (change)
                                    ↓
0.83 BTC → 0.2 BTC (payment) + 0.62 BTC (change)
                                    ↓
... and so on
```

---

## Why Peel Chains Are Dangerous

At each hop, the smaller output is typically the payment, making the entire payment history trivially traceable by following the chain. An adversary identifying a peel chain can follow the entire sequence of payments with high confidence.

This pattern is common in wallets that make many sequential payments without consolidation or [coin control](../glossary.md#coin-control).

---

## How Peel Chains Are Detected

[Chain analysis](../glossary.md#chain-analysis) tools detect peel chains by looking for:

- Linear chain patterns where 1-input, 2-output transactions are chained together
- One output feeds the next transaction as its sole input
- At each hop, the smaller output is the payment, the larger is change

The engine checks 1 hop backward and 1 hop forward (up to 3 consecutive hops).

---

## How to Defend Against Peel Chain Detection

### Break the Chain Pattern

- Use [CoinJoin](../glossary.md#coinjoin) between payments
- Vary transaction structure (use multi-output batch payments)
- Change coin selection strategies

### Use Coin Control

Manually select which UTXOs to spend rather than letting your wallet automatically pick the largest one. This breaks the predictable pattern.

### Consolidate Through CoinJoin

Instead of creating a peel chain, consolidate your UTXOs through a CoinJoin first. This breaks the link between the original large UTXO and subsequent payments.

---

