---
description: An intuitive introduction to transaction entropy and why it is the foundation of Bitcoin privacy
---

# What Is Entropy?

Entropy measures **ambiguity**. When looking at a Bitcoin transaction, it answers one question:

> **How many plausible stories exist about where the money came from and where it went?**

If only one story fits the facts, everyone knows exactly what happened. If many stories fit, no one can be sure which is true. That uncertainty is your privacy.

---

## Entropy in Everyday Life

### The Restaurant Example

Picture a dinner with four friends. The bill arrives and everyone throws a $25 note onto the table. The waiter collects four $25 notes and hands them to the cashier.

The cashier sees four $25 notes come in and four $25 notes go out to the restaurant's account. But the cashier **cannot tell** whose specific note paid for which part of the meal. There are **many** valid interpretations. **Entropy > 0.**

This is the essence of a CoinJoin.

---

## Entropy in Bitcoin Transactions

### A Normal Payment (Zero Entropy)

Consider a straightforward transaction:

![A simple 1-input, 2-output transaction](../images/one-in-two-out.png){ loading=lazy }

**Transaction ID:** [`639fc4b0...`](https://am-i.exposed/#tx=639fc4b0cace9370ed9e113b6e80a5765a27ebe601dd03ef350ada5b01bd2846)

- **Input:** 2,487,401 sats
- **Output 1:** 1,701,348 sats (change, minus fee)
- **Output 2:** 785,767 sats (payment)

There is only **one** valid interpretation: the single input funded both outputs. No ambiguity. No privacy. **Entropy = 0 bits.**

Roughly **85% of all Bitcoin transactions** look like this. An observer can determine with complete certainty exactly where the money went.

### A 2-Input, 2-Output Transaction (One Bit of Entropy)

Now consider a slightly more complex transaction:

![A 2-input, 2-output transaction](../images/two-in-two-out.png){ loading=lazy }

**Transaction ID:** [`ce3d95a2...`](https://am-i.exposed/#tx=ce3d95a2ec0237898ed0e5961699408e67b19fc2fcce7dfdbf439cbc3b797921)

- **Input 1:** 63,990 sats
- **Input 2:** 31,942 sats
- **Output 1:** 63,717 sats
- **Output 2:** 31,750 sats
- **Fee:** 465 sats

How many valid interpretations exist? **Two:**

1. Input 1 funded Output 1, and Input 2 funded Output 2
2. Both inputs combined to fund both outputs

$$E = \log_2(2) = 1.00 \text{ bit}$$

One bit means the observer faces a 50/50 guess. Not much privacy, but more than zero.

### A CoinJoin (High Entropy)

Now look at a 5-party Whirlpool CoinJoin:

![Whirlpool CoinJoin transaction](../images/whirlpool.png){ loading=lazy }

- **5 inputs** of ~5,000,000 sats each (some inlude extra for miner fee)
- **5 outputs** of 5,000,000 sats each

How many valid interpretations? **1,496.**

$$E = \log_2(1,496) = 10.55 \text{ bits}$$

An observer faces 1,496 equally valid stories. They cannot tell which one is true.

---

## The Entropy Formula

The Boltzmann entropy formula is simple:

$$E = \log_2(N)$$

Where:
- **E** = entropy in bits
- **N** = number of valid interpretations

### Why Use a Logarithm?

The logarithm converts a raw count of possibilities into **bits of uncertainty**. Each additional bit **doubles** the observer's confusion:

| Entropy (bits) | Interpretations | What It Means |
|----------------|----------------|---------------|
| 0 | 1 | No ambiguity - the transaction is fully transparent |
| 1 | 2 | Observer must guess between 2 options |
| 4 | 16 | Observer must guess between 16 options |
| 10 | 1,024 | Over a thousand possibilities |
| 10.55 | 1,496 | A 5-party Whirlpool CoinJoin |
| 20 | 1,048,576 | Over a million possibilities |

Each bit **doubles** the uncertainty. Even modest entropy provides meaningful privacy.

---

## Three Types of Entropy

LaurentMT's framework distinguishes three types:

### 1. [Intrinsic Entropy](../glossary.md#intrinsic-entropy)

Computed from the transaction **alone**, with no outside information. This is the raw privacy the transaction structure provides.

### 2. [Actual Entropy](../glossary.md#actual-entropy)

Computed **after incorporating blockchain context**. If clustering heuristics tell us certain inputs belong to the same entity, we merge them, reducing valid interpretations. If change detection identifies an output as change, we eliminate interpretations that contradict this.

**Actual entropy never exceeds intrinsic entropy.** Extra information can only shrink number of possibilities.

### 3. Maximum Entropy

The entropy of a "perfect" CoinJoin with the same structure (equal inputs, equal outputs). This is the theoretical ceiling.

---

## The Golden Rule

> **Actual entropy can only stay the same or decline over time. It never increases.**

As analysts gather more data - KYC records, clustering results, exchange logs - they eliminate valid interpretations. Each new fact narrows the space.

This is why privacy is **use it or lose it**. The privacy you have today is the most you will ever have.

CoinJoin is powerful because it is one of the few techniques that actually **creates** entropy rather than just preserving it.

---

## Entropy vs. Privacy

High entropy is **necessary** but **not sufficient** for privacy.

Entropy measures structural ambiguity within a **single transaction**. It does not account for:

- **Timing**: Spending a CoinJoin output to a known exchange immediately afterward may link you regardless of entropy
- **Network surveillance**: If your coordinator sees your IP, they know you participated
- **Participant OPSEC**: One careless participant can compromise everyone (LaurentMT called this "Hell is Other People")
- **Steganographic transactions**: Transactions designed to look like something they are not can trick analysis

Think of entropy as measuring **structural privacy** - how hard the transaction is to analyze in isolation. Real-world privacy depends on much more.

---

## Mixed-Value Transactions

So far we have discussed equal-value CoinJoins. Most Bitcoin transactions are not CoinJoins - they have inputs and outputs of different values. Computing valid interpretations for these is harder:

- We must find all groupings where each group's input sum equals its output sum (within the fee)
- This is a **constrained subset sum problem**, which is [NP-hard](../glossary.md#np-hard)
- For large transactions, brute-force enumeration becomes impractical

The tool [am-i.exposed](https://am-i.exposed) implements the full Boltzmann algorithm in Rust.

---

## Key Takeaways

1. **Entropy measures ambiguity** - the number of valid "stories" about fund flows
2. **E = log₂(N)** - each bit doubles the observer's uncertainty
3. **~85% of Bitcoin transactions have zero entropy** - they are fully transparent
4. **CoinJoin creates high entropy** - a 5-party Whirlpool has 10.55 bits (1,496 interpretations)
5. **Entropy only declines over time** - use your privacy while you have it
6. **High entropy is necessary but not sufficient** - real-world privacy requires good OPSEC

---

## What Comes Next

The next page explains **valid interpretations** in detail - what they are, how they are computed, and why one input can fund multiple outputs in the same interpretation.

[Valid Interpretations →](valid-interpretations.md)

---

## References

- [LaurentMT, "Bitcoin Transactions & Privacy (Part 1: Entropy)"](https://gist.github.com/LaurentMT/e758767ca4038ac40aaf)
- [am-i.exposed Boltzmann WASM ADR](https://github.com/Copexit/am-i-exposed/blob/main/docs/adr-boltzmann-wasm.md)
