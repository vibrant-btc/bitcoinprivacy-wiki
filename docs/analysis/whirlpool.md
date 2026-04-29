---
description: Analyze a Whirlpool CoinJoin transaction and learn why link probability is 34.2% not 20%
---

# Whirlpool CoinJoin

Now let us look at a transaction that does privacy right: a Whirlpool [CoinJoin](../glossary.md#coinjoin).

This example demonstrates the [Boltzmann entropy](../boltzmann/index.md) framework in action. If you have not yet read the [Boltzmann Entropy section](../boltzmann/index.md), we recommend starting there to understand the mathematical foundation.

![Whirlpool CoinJoin transaction scanned by am-i.exposed](../images/whirlpool.png){ loading=lazy }

**Transaction ID:** [`323df21f...`](https://am-i.exposed/#tx=323df21f0b0756f98336437aa3d2fb87e02b59f1946b714a7b09df04d429dec2)

**Structure:** 5 inputs → 5 equal outputs of 5,000,000 sats each

---

## What We Notice

This transaction has exactly 5 inputs and exactly 5 outputs, all of the same value (5 million sats each). This is the signature pattern of a Whirlpool CoinJoin round.

Let us look at the link probability matrix:

![Whirlpool analysis - link probability matrix](../images/whirlpool-analysis.png){ loading=lazy }

---

## Why This Is Great

Unlike the consolidation example, this transaction creates real ambiguity:

- There are 1,496 valid interpretations of which input funded which output
- [Entropy](../glossary.md#boltzmann-entropy) = 10.55 bits
- Each input has roughly a 34.2% chance of funding any given output (not 20% as you might expect)

**What this means:** An observer cannot determine which input funded which output. The [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) is broken.

**Severity:** This is a privacy win - positive signal

---

## The Link Probability Matrix Explained

You might naturally think that with 5 inputs and 5 outputs, each input would have a 20% (1 in 5) chance of funding each output. But the matrix shows **34.2%** for each cell. Why?

### What Is a "Valid Interpretation"?

A valid interpretation (or "complete mapping") is a way of grouping ALL inputs and ALL outputs into groups where each group's input sum matches its output sum (within fee tolerance). This is a **many-to-many mapping**, not a one-to-one assignment.

For example, one valid interpretation might be:
- Input 1 funds Output 1 AND Output 2
- Input 2 funds Output 3
- Input 3 funds Output 4 AND Output 5
- Inputs 4 and 5 fund nothing (they are combined with other inputs in the same groups)

Another valid interpretation:
- Input 1 funds Output 1
- Input 2 funds Output 2
- Input 3 funds Output 3
- Input 4 funds Output 4
- Input 5 funds Output 5

And many more. For a 5-party equal-output CoinJoin like Whirlpool, there are exactly **1,496 valid interpretations**.

### Why Rows Sum to More Than 100%

This is the critical insight. In a single valid interpretation, one input can be linked to **multiple outputs simultaneously**. When we count how many interpretations contain each link, a single input can appear linked to several outputs in the same interpretation.

For the Whirlpool example:

- There are 1,496 total interpretations
- Each input-output pair appears together in 512 of those interpretations
- 512 / 1,496 = **34.2%**

This is why the link probability is 34.2%, not 20%. The 20% figure would only be correct if each input funded exactly one output per interpretation (a one-to-one assignment). But the Boltzmann algorithm counts **many-to-many mappings**, where one input can fund multiple outputs in the same interpretation.

### The Math Behind 1,496 Interpretations

For equal-output CoinJoins, the number of valid interpretations can be computed using the integer partition formula. For 5 participants:

| Partition | Calculation | Term |
|---|---|---|
| [5] | 14400 / (14400 × 1) | 1 |
| [4,1] | 14400 / (576 × 1) | 25 |
| [3,2] | 14400 / (144 × 1) | 100 |
| [3,1,1] | 14400 / (36 × 2) | 200 |
| [2,2,1] | 14400 / (16 × 2) | 450 |
| [2,1,1,1] | 14400 / (4 × 6) | 600 |
| [1,1,1,1,1] | 14400 / (1 × 120) | 120 |

**Total N = 1 + 25 + 100 + 200 + 450 + 600 + 120 = 1,496**

**Entropy = log2(1,496) = 10.55 bits**

??? info "Where Does 14400 Come From?"

    The number 14,400 is **5! × 5!** (120 × 120). It represents the total number of ways to permute both the inputs and outputs before grouping them. The formula divides this by the symmetries within each partition to avoid overcounting.

    For example, the partition [3,2] means "one group of 3 outputs and one group of 2 outputs." The denominator (144 × 1) accounts for:
    - The ways to permute inputs within each group
    - The ways to permute outputs within each group
    - The ways to permute groups of the same size

    This is advanced combinatorics - you do not need to understand the formula to use Boltzmann entropy. The key takeaway is that **many-to-many mappings create far more interpretations than one-to-one mappings**.

The classic permutation model (5! = 120) undercounts because it only considers one-to-one assignments. The partition model correctly accounts for the possibility that multiple outputs could be funded by the same input, yielding significantly more valid interpretations.

### Perfect CoinJoin Entropy Table

| Participants | Interpretations (N) | Entropy E = log2(N) |
|---|---|---|
| 2 | 3 | 1.58 bits |
| 3 | 16 | 4.00 bits |
| 4 | 131 | 7.03 bits |
| 5 | 1,496 | 10.55 bits |
| 6 | 22,482 | 14.46 bits |
| 7 | 426,833 | 18.70 bits |

---

## What This Means for Privacy

The 34.2% link probability means that for any given input-output pair, an analyst can only say "there is a 34.2% chance this input funded this output." This is far from the 100% certainty they get from a consolidation transaction.

With 5 participants, each output could have come from any of the 5 inputs. The analyst cannot narrow it down further. This is the power of CoinJoin.

---

## Lesson

**CoinJoin is the most powerful on-chain privacy tool available.** It breaks the transaction graph by creating ambiguity. Use it regularly and do multiple rounds to increase your [anonymity set](../glossary.md#anonymity-set).
