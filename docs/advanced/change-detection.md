# Change Detection

[Change detection](../glossary.md#change-detection) is one of the most consequential [heuristics](../glossary.md#heuristic) in [chain analysis](../glossary.md#chain-analysis). Correctly identifying which output in a transaction returns funds to the sender allows an adversary to follow the money through multiple hops.

---

## How Change Works

When you send bitcoin, your wallet typically creates two outputs:

1. **The payment output** - goes to the recipient
2. **The [change](../glossary.md#change) output** - goes back to you

This happens because Bitcoin uses the [UTXO](../glossary.md#utxo) model - you must spend entire UTXOs, and any excess becomes change.

!!! tip "The Cash Analogy"

    When using physical cash, spending a $100 bill to pay for a $25 item, you will get $75 back in change. The reason is that you can't spend just a part of the bill. Bitcoin works the same way.

---

## Change Detection Sub-Heuristics

Chain analysis uses several sub-heuristics to identify change:

### Address Type Matching

If all inputs are spent from one address type (e.g., P2WPKH / bc1q) and one output matches that type while another does not, the matching output is likely change.

Wallets typically generate change addresses of the same type as their receiving addresses.

### Round Payment Amount

If one output is a round amount and the other is not, the non-round output is likely change. This overlaps with [round amount detection](heuristics.md#round-amount-detection).

### Unnecessary Input Heuristic

If a transaction has multiple inputs and a single input alone would have been sufficient to fund the payment (plus fee), then the additional inputs are likely from the same wallet. The output that could have been funded by one input alone is likely the payment.

### Value Disparity

In a 2-output transaction, if one output is 100x or more larger than the other, the larger output is likely change. Payments are typically smaller than the sender's total holdings.

### Output Ordering

Some wallet software consistently places the change output in a specific position. Historically, many wallets placed change last. [BIP69](../glossary.md#bip69)-compliant wallets sort outputs lexicographically, which randomizes position.

---

## Why Change Detection Matters

Change detection is the backbone of transaction tracing. If an adversary can identify which output is change, they know which output returns to the sender's wallet. They can then follow that change output into subsequent transactions, building a chain of custody.

**Break change detection, and you break most tracing.**

---

## How to Defend Against Change Detection

### Use PayJoin

[PayJoin](../glossary.md#payjoin-p2ep) adds a recipient input to the transaction, poisoning the assumptions. The recipient contributes an input, making it appear as though the sender is consolidating their own UTXOs. This breaks the change detection heuristics because the transaction now has inputs from two different entities.

### Use CoinJoin

[CoinJoin](../glossary.md#coinjoin) creates transactions with multiple equal-value outputs, making it impossible to determine which output belongs to which participant.

### Use Uniform Address Types

If all your addresses use the same type (preferably [Taproot](../glossary.md#taproot)), the address type matching heuristic cannot distinguish change from payment.

### Use Changeless Transactions

Branch-and-Bound coin selection finds exact combinations of UTXOs that cover the payment without creating change. No change output means nothing to detect.

---

## Self-Send Detection

A [self-send](../glossary.md#self-send-self-transfer) occurs when one or more outputs return to an address that was also an input. This trivially identifies the change output, revealing the sender's remaining balance and the exact payment amount.

Self-sends are among the most damaging privacy mistakes because they make change detection deterministic rather than probabilistic.

---

