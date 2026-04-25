---
description: Analyze a Stonewall transaction and learn how it creates plausible deniability
---

# Stonewall

Let us look at a [Stonewall](../glossary.md#stonewall) transaction - a technique that creates a transaction indistinguishable from a 2-party [CoinJoin](../glossary.md#coinjoin), but performed by a single user.

This example demonstrates the [Boltzmann entropy](../boltzmann/index.md) framework. A Stonewall creates modest entropy (2 bits, 4 interpretations) - far less than a CoinJoin but far more than a normal payment (0 bits). For the full explanation of how entropy works, see the [What Is Entropy?](../boltzmann/what-is-entropy.md) page.

![Stonewall transaction scanned by am-i.exposed](../images/stonewall.png){ loading=lazy }

**Transaction ID:** `19a79be39c05a0956c7d1f9f28ee6f1091096247b0906b6a8536dd7f400f2358`

**Structure:** 3 inputs → 4 outputs (2 equal outputs of 104,000 sats + 2 other outputs)

---

## What We Notice

This transaction has 3 inputs and 4 outputs, with 2 outputs being exactly equal (104,000 sats each). Let us look at the [Boltzmann entropy](../glossary.md#boltzmann-entropy) analysis:

![Stonewall analysis - link probability matrix](../images/stonewall-analysis.png){ loading=lazy }

### Key Findings

- **4 valid interpretations** (2.00 bits of entropy)
- **0.29 bits per UTXO**
- **1 deterministic link**

---

## The Link Probability Matrix Explained

The matrix above shows the probability that each input funded each output. Unlike the [Whirlpool CoinJoin](whirlpool.md) which had 1,496 interpretations, this Stonewall has only 4.

### Why Only 4 Interpretations?

A Stonewall transaction has a specific structure:
- 3 inputs in this case (from the sender's wallet)
- 4 outputs: 2 equal-value outputs (104,000 sats) + 2 different-value outputs (change)

The 4 valid interpretations represent the different ways the 3 inputs could have funded the 4 outputs while respecting the value constraints. Each interpretation is a valid "story" about how the funds flowed.

### 2 Bits of Entropy

Entropy = log2(4) = 2.00 bits. This is modest compared to Whirlpool's 10.55 bits, but it is far better than a normal payment's 0 bits.

### 1 Deterministic Link

One input-output pair has a 100% link this is because the 46,834 sats input could only create an output smaller than itself (40,034 sats in this specific example).

---

## Why Stonewall Creates Ambiguity

am-i.exposed detected this as a Stonewall pattern. Here is what that means:

**Stonewall is designed to create ambiguity about input ownership** - an observer cannot tell if all 3 inputs belong to one wallet (solo Stonewall) or two wallets (STONEWALLx2, a collaborative version).

This is the key privacy benefit: **plausible deniability**. Even if an analyst suspects this is a Stonewall, they cannot prove whether it was solo or collaborative.

### The Critical Rule

**Never spend two outputs from this transaction together.** If you do, you confirm common ownership and destroy the ambiguity the Stonewall created.

---

## Stonewall vs Normal Transaction

| Feature | Normal 3-in-4-out | Stonewall |
|---------|-------------------|-----------|
| Equal outputs | Unlikely | 2 equal outputs by design |
| Entropy | Usually 0 bits | 2+ bits |
| CIOH broken | No | Yes (appears collaborative) |
| Plausible deniability | None | Solo vs collaborative unknown |

---

## Lesson

Stonewall adds meaningful entropy to a transaction and confuses [chain analysis](../glossary.md#chain-analysis) heuristics. From the outside, it can be misinterpreted as a small two-party CoinJoin. The ambiguity about who paid and who contributed which inputs/outputs is the privacy benefit.

**Best practices:**
- Do not overuse Stonewall - if every transaction has this structure, it becomes a [wallet fingerprint](../glossary.md#wallet-fingerprint)
- Never spend two outputs from a Stonewall together
- Combine with good [address hygiene](../techniques/address-reuse/index.md) and [coin control](../techniques/coin-control.md)
