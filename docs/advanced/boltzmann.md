# Boltzmann Entropy

Boltzmann entropy is the most rigorous mathematical measure of transaction privacy on Bitcoin. Unlike heuristics that flag specific patterns, entropy quantifies the actual ambiguity an adversary faces when analyzing a transaction.

---

## What Is Entropy?

Transaction entropy measures the number of valid interpretations of a transaction. In other words, it measures how many different ways the inputs could have been mapped to the outputs.

**The Formula:**

```
E = log2(N)
```

Where:
- **E** is the entropy in bits
- **N** is the number of valid interpretations

Higher entropy means more ambiguity for an adversary.

!!! tip "The Simple Explanation"

    Think of entropy like a measure of "how many stories could explain this transaction." A transaction with 0 bits of entropy has only one possible story - it is completely transparent. A transaction with 10 bits of entropy has over 1,000 possible stories - it is much harder to figure out what actually happened.

---

## The Boltzmann Framework

**Origin:** LaurentMT (~2015), creator of the OXT.me Boltzmann tool.

The Boltzmann framework defines transaction entropy as the number of valid input-to-output mappings that are consistent with the transaction's structure. Higher entropy means more ambiguity for an adversary attempting to trace fund flows.

Key concepts:

- **Combinations (Interpretations)**: The total number of ways inputs could be associated with outputs given the values. For a Whirlpool 5x5 CoinJoin, there are 1,496 possible combinations. For an 8x8 CoinJoin, there are 9,934,563 possible combinations.

- **Entropy**: The binary logarithm of the number of combinations, expressed in bits. For Whirlpool 5x5: E = log2(1,496) = 10.55 bits. For 8x8: E = log2(9,934,563) = 23.24 bits.

- **Link Probability**: The probability that a specific input is related to a specific output. In a good CoinJoin, each input has roughly equal probability of being linked to each output.

- **Deterministic Links**: Connections between inputs and outputs that exist in ALL possible interpretations. A deterministic link means that regardless of which "story" you believe, that input always funds that output. Good CoinJoins have zero deterministic links.

---

## Entropy Values for Common Transactions

| Transaction Type | Combinations (N) | Entropy (bits) |
|-----------------|---------------------|----------------|
| 1-in-1-out | 1 | 0 |
| 1-in-2-out (simple payment) | 1 | 0 |
| 2-in-2-out (simple) | 2-3 | 1-1.58 |
| 5-party CoinJoin (Whirlpool) | 1,496 | 10.55 |
| 7-party CoinJoin | 426,833 | 18.70 |
| 8-party CoinJoin | 9,934,563 | 23.24 |

---

## How to Interpret Entropy

=== "0 bits: Deterministic"

    Only one valid interpretation exists. The transaction is completely transparent. This is the case for simple 1-in-1-out transactions and most normal payments.

=== "1-3 bits: Low Entropy"

    A few possible interpretations exist. Limited ambiguity. Most normal transactions fall in this range.

=== "4-8 bits: Moderate Entropy"

    Meaningful ambiguity exists. An adversary would need additional information to determine the input-output mapping.

=== "9-15 bits: High Entropy"

    Typical of Whirlpool 5x5 CoinJoins. Significant privacy achieved.

=== "15+ bits: Very High Entropy"

    Larger CoinJoins. Exponential ambiguity makes analysis very difficult.

---

## The Partition Formula

For equal-value CoinJoin transactions (where all outputs share one value), the number of valid interpretations can be computed exactly using integer partitions:

```
N = sum over all integer partitions (s1, s2, ..., sk) of n:
    n!^2 / (prod(si!^2) * prod(mj!))
```

where:
- `(s1, s2, ..., sk)` is a partition of n (the parts sum to n)
- `mj` = multiplicity of each distinct part size

### Worked Example: n=5 (Whirlpool)

The 7 integer partitions of 5:

| Partition | Calculation | Term |
|---|---|---|
| [5] | 14400 / (14400 * 1) | 1 |
| [4,1] | 14400 / (576 * 1) | 25 |
| [3,2] | 14400 / (144 * 1) | 100 |
| [3,1,1] | 14400 / (36 * 2) | 200 |
| [2,2,1] | 14400 / (16 * 2) | 450 |
| [2,1,1,1] | 14400 / (4 * 6) | 600 |
| [1,1,1,1,1] | 14400 / (1 * 120) | 120 |

**Total N = 1 + 25 + 100 + 200 + 450 + 600 + 120 = 1,496**

**Entropy = log2(1,496) = 10.55 bits**

Note: The classic permutation model (n! = 120 for n=5) undercounts because it only considers one-to-one assignments. The partition model correctly accounts for the possibility that multiple outputs could be funded by the same input, yielding significantly more valid interpretations.

---

## Why Entropy Matters

=== "Mathematical Rigor"

    Unlike heuristics that can be fooled or bypassed, entropy is a mathematically grounded measure of privacy. It tells you exactly how ambiguous a transaction is.

=== "The Only Positive Privacy Signal"

    In privacy scoring models, entropy can add positive points to your score. Only CoinJoin participation, Taproot usage, and high entropy can raise the score. Everything else can only lower it.

=== "OXT.me's Boltzmann Tool"

    OXT.me's Boltzmann tool was the gold standard for entropy analysis before it was shut down in April 2024. It gave users a mathematically grounded privacy metric for any transaction.

---

## Deterministic Links

A deterministic link exists when an output can only be funded by one specific input (or set of inputs). Even in CoinJoin transactions, some input-output links may have probability 1.0, meaning the CoinJoin provides zero privacy for those specific participants.

Detection: If the link probability matrix has any entry with probability 1.0, that link is deterministic. The entropy calculation implicitly accounts for deterministic links (they reduce the number of valid interpretations).

---

## Steganographic Transactions

LaurentMT's essay "Hell is Other People" introduced the concept of steganographic transactions - transactions designed to look like something they are not:

- **PayJoin (BIP78)**: Looks like a normal payment but the receiver contributes an input, breaking the [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic)
- **Stonewall**: Simulated 2-party CoinJoin from a single wallet (4 outputs: 2 equal + 2 change)
- **STONEWALLx2**: Real collaborative CoinJoin with the Stonewall structure
- **Ricochet**: Adds intermediate hops to increase the distance between CoinJoin and exchange deposit

These techniques exploit the fact that chain analysis relies on heuristics. If a transaction is designed to violate the assumptions of those heuristics, the analysis produces false results.

---

## The Asymmetric Game

Privacy-Enhancing Technologies (PETs) face a harder challenge than chain analysts:

- Analysts benefit from **Bayesian updating**: each new heuristic narrows the possibility space
- Privacy tools must defeat **all** heuristics simultaneously - one slip undoes everything
- A single participant in a CoinJoin with poor operational security can compromise other participants' privacy
- Temporal analysis, network-level surveillance, and exchange KYC provide independent correlation channels

This asymmetry is why entropy alone is insufficient as a privacy metric. High entropy is necessary but not sufficient for privacy.

---

## Wallet Fingerprinting History

Chain analysis evolved from naive [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) clustering (2011-2013) through increasingly sophisticated techniques:

1. **2011-2013**: Reid & Harriman, Ron & Shamir - first academic address clustering via CIOH
2. **2013**: Gregory Maxwell proposes CoinJoin as a countermeasure
3. **2015**: LaurentMT defines the Boltzmann framework; Meiklejohn et al. scale clustering
4. **2017**: Wallet fingerprinting via nLockTime, nSequence emerges (Bitcoin Core's anti-fee-sniping)
5. **2019**: Low-R signature grinding (Bitcoin Core 0.17+) becomes a reliable fingerprint
6. **2020s**: ML-based clustering, BIP69 detection, Taproot adoption begins neutralizing fingerprints

---

## References

- **LaurentMT** - "Introducing Boltzmann" (Medium, 2017) - [Original announcement](https://medium.com/@laurentmt/introducing-boltzmann-85930984a159)
- **LaurentMT** - "Bitcoin Transactions & Privacy" (Parts 1-3) - [Part 1](https://gist.github.com/LaurentMT/e758767ca4038ac40aaf), [Part 2](https://gist.github.com/LaurentMT/d361bca6dc52868573a2), [Part 3](https://gist.github.com/LaurentMT/e8644d5bc903f02613c6)
- **LaurentMT/boltzmann** - Reference implementation on GitHub
- **Gregory Maxwell** - "CoinJoin: Bitcoin privacy for the real world" (BitcoinTalk, 2013)
- **Kristov Atlas** - "CoinJoin Sudoku" - Deterministic link detection in CoinJoin transactions
- **OXT Research / ErgoBTC** - "Understanding Bitcoin Privacy with OXT" (Parts 1-4, 2021)
- **Spiral BTC** - "The Scroll #3: A Brief History of Wallet Clustering"
- **privacidadbitcoin.com** - Spanish-language Bitcoin privacy education, community entropy calculation reference
- **Shannon, C.** - "A Mathematical Theory of Communication" (1948) - Foundational information theory
