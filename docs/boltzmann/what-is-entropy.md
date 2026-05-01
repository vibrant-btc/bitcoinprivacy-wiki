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

### What Is an "Interpretation"?

Before we look at examples, let us clarify what an **interpretation** means in the context of Boltzmann entropy. This is a common point of confusion.

An interpretation is a **mathematically valid way to group inputs and outputs** such that the total value of inputs in each group equals the total value of outputs in that group (within the transaction fee). It is purely about the **transaction structure** - the amounts and how they can be combined.

!!! warning "Common Confusion: Interpretation vs. Change Detection"

    People often think: "I do not know which output is the payment and which is the change, so there must be 2 interpretations."

    **This is not how Boltzmann entropy works.** The entropy calculation does not care which output is the payment or which is the change. It only asks: "How many ways can I group these inputs and outputs so the values balance?"

    For a 1-input, 2-output transaction, there is only **one** way to group them: the single input funds both outputs. Whether you can tell which output is the payment is a **separate question** (change detection) that is not part of the raw entropy calculation.

    **Entropy measures structural ambiguity, not contextual ambiguity.**

    Contextual ambiguity is very important in bitcoin privacy, but in order to understand from the perspective of boltzmann entropy you must put that aside for now.


### A Normal Payment (Zero Entropy)

Consider a straightforward transaction:

![A simple 1-input, 2-output transaction](../images/one-in-two-out.png){ loading=lazy }

**Transaction ID:** [`639fc4b0...`](https://am-i.exposed/#tx=639fc4b0cace9370ed9e113b6e80a5765a27ebe601dd03ef350ada5b01bd2846)

- **Input:** 2,487,401 sats
- **Output 1:** 1,701,348 sats
- **Output 2:** 785,767 sats

How many ways can we group these inputs and outputs so the values balance? **Only one:** the single input funds both outputs. There is no other mathematically valid grouping.

**Entropy = 0 bits.** No structural ambiguity. No privacy from the transaction structure alone.

Roughly **85% of all Bitcoin transactions** look like this. An observer can determine with complete certainty exactly where the money went.

??? note "Deep Dive: LaurentMT's Original Study (2015)"

    In 2015, LaurentMT processed **97,977,912 Bitcoin transactions** (from block 1 to block 388,602) to compute their entropy. Here are the full results:

    | Metric | Percentage |
    |--------|------------|
    | Transactions with null entropy (E = 0) | **85.47%** |
    | Transactions with E ≥ 1 bit | **14.52%** |
    | Transactions with E ≥ 1.585 bits (basic CoinJoin level) | **1.89%** |

    The study could compute entropy for 98.59% of all transactions. The remaining 1.41% were too large or complex for the brute-force algorithm.

    **What this means:** Even in 2015, less than 2% of Bitcoin transactions had privacy comparable to a basic CoinJoin. The vast majority were fully transparent.

    **Important caveat:** These numbers count transactions with *high entropy*, not necessarily *CoinJoin transactions*. Some transactions produce high entropy without being intentional CoinJoins (e.g., batch payments with many inputs and outputs).

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

??? note "View the interpretations"

    ``` mermaid
    graph TD
        subgraph Interpretation 2
            I1_2[Input 1: 63,990] --> BOTH[Both Outputs: 95,467]
            I2_2[Input 2: 31,942] --> BOTH
        end
        
        subgraph Interpretation 1
            I1_1[Input 1: 63,990] --> O1_1[Output 1: 63,717]
            I2_1[Input 2: 31,942] --> O2_1[Output 2: 31,750]
        end
    ```

    1. **Interpretation 1:** Input 1 funded Output 1, and Input 2 funded Output 2
    2. **Interpretation 2:** Both inputs combined to fund both outputs

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

**Actual entropy never exceeds intrinsic entropy.** Extra information can only shrink the number of possibilities.

#### Concrete Example: Intrinsic vs. Actual Entropy

Consider a 2-input, 2-output transaction with **2 valid interpretations** (intrinsic entropy = 1 bit):


- **Interpretation 1:** Input 1 → Output 1, Input 2 → Output 2
- **Interpretation 2:** Both inputs → Both outputs

Now suppose we discover that the address for Input 1 is the **same address** as Output 1. This means Output 1 is definitely change (the sender is paying themselves). This eliminates Interpretation 1 (which assumed Input 1 funded Output 1 as a separate payment).

**Actual entropy = 0 bits** (only 1 interpretation remains). The blockchain context reduced the ambiguity.

### 3. Maximum Entropy

The entropy of a "perfect" CoinJoin with the same structure (equal inputs, equal outputs). This is the theoretical ceiling.

??? note "Transaction Efficiency: How Much Privacy Survived?"

    A [CoinJoin](../glossary.md#coinjoin) can look very private when it first confirms. It may have many possible interpretations and a high [intrinsic entropy](../glossary.md#intrinsic-entropy). However, later blockchain activity can reveal new information. If users later [consolidate](../analysis/consolidation.md) their post-mix outputs, reuse addresses, or mix coins that should have stayed separate, the [actual entropy](../glossary.md#actual-entropy) can fall.

    **Transaction efficiency** asks a simple question: **how much of the transaction's possible privacy is still left after the known blockchain evidence is considered?**

    ### Maximum Entropy

    **Maximum entropy** ($E_{\text{max}}$) is the maximum possible entropy for a transaction structure. It represents the highest entropy a transaction with a given number of inputs and outputs can theoretically achieve.

    For example, a 5-input, 5-output CoinJoin with equal inputs and equal outputs has:

    $$E_{\text{max}} = \log_2(1{,}496) = 10.55 \text{ bits}$$

    This is the theoretical ceiling for any 5-input, 5-output transaction.

    ### Transaction Efficiency in Bits

    Transaction efficiency can be written in bits as:

    $$E_f = E_{\text{actual}} - E_{\text{max}}$$

    Where:

    - $E_f$ = transaction efficiency in bits
    - $E_{\text{actual}}$ = the actual entropy of the transaction in bits
    - $E_{\text{max}}$ = the maximum possible entropy for the transaction structure in bits

    If $E_f = 0$, the transaction kept all of its possible privacy. If $E_f$ is negative, that many bits of potential privacy were lost.

    ### Transaction Efficiency as a Percentage

    More commonly, efficiency is expressed as a percentage:

    $$E_f(\%) = \frac{E_{\text{actual}}}{E_{\text{max}}} \times 100\%$$

    An efficiency of 100% means the transaction is maximizing its confidentiality potential for its structure. A low percentage means that blockchain context has damaged much of the privacy that the transaction appeared to have at first.

    ### Why This Matters

    Transaction efficiency is useful because it separates **the privacy a transaction could have had** from **the privacy that still survives after later blockchain evidence is considered**. A high entropy number on its own can be misleading if later transactions re-link outputs, consolidate post-mix coins, or otherwise reduce the real ambiguity ([as is often the case in WabiSabi CoinJoins](../techniques/coinjoin/wasabi.md/#risks-of-change-subdivision))

    ### Key Takeaway

    Transaction efficiency answers: **"How much of my CoinJoin's potential privacy did I actually keep?"** A high upper-bound entropy number is not enough. If later transactions re-link outputs, the actual privacy can be much lower than the number users first see.

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

??? note "Entropy Density: Comparing Transactions of Different Sizes"

    Entropy is a good indicator for measuring the confidentiality of a transaction, but it depends in part on the number of inputs and outputs in the transaction. To compare the entropy of two different transactions with different numbers of inputs and outputs, we can calculate the **entropy density**. This indicator provides a perspective on the entropy relative to each input or output of the transaction. Density is useful for evaluating and comparing the efficiency of transactions of different sizes.

    ### The Formula

    To calculate entropy density, we simply divide the total entropy of the transaction by the total number of inputs and outputs involved in the transaction:

    $$d = \frac{E}{N}$$

    Where:
    
    - $d$ = entropy density in bits
    - $E$ = the entropy of the transaction in bits
    - $N$ = total number of inputs and outputs in the transaction

    ### Example: 5x5 vs. 8x8 Whirlpool

    Let us take the example of a standard 5-party [Whirlpool](../glossary.md#whirlpool) CoinJoin:

    - 5 inputs, 5 outputs = 10 total UTXOs
    - 1,496 interpretations
    - Entropy = $\log_2(1{,}496) = 10.55$ bits
    - **Entropy density = 10.55 / 10 = 1.06 bits per UTXO**

    Let us also calculate the entropy density of an 8x8 [Surge Cycle](../glossary.md#surge-cycle) Whirlpool CoinJoin:

    - 8 inputs, 8 outputs = 16 total UTXOs
    - 9,934,563 interpretations
    - Entropy = $\log_2(9{,}934{,}563) = 23.25$ bits
    - **Entropy density = 23.25 / 16 = 1.45 bits per UTXO**

    By analyzing the entropy density of these two types of CoinJoin, it becomes clear that the "Surge Cycle 8x8" CoinJoin generates significantly more uncertainty for the analysis. Not only does it have higher total entropy (23.25 vs. 10.55 bits), but it also has a higher entropy density (1.45 vs. 1.06 bits per UTXO). This means that even when normalizing entropy by the number of UTXOs, the 8x8 Surge Cycle provides more privacy per input and output than the standard 5x5 Whirlpool.

    ### How to Interpret Entropy Density

    | Entropy Density | What It Means |
    |---|---|
    | 0 bits/UTXO | No privacy - every input-output link is deterministic |
    | 0.1-0.3 bits/UTXO | Low - slight ambiguity per UTXO |
    | 0.3-0.7 bits/UTXO | Moderate - meaningful ambiguity per UTXO |
    | 0.7-1.0 bits/UTXO | Good - strong per-UTXO privacy |
    | 1.0+ bits/UTXO | Excellent - each UTXO contributes significant uncertainty |

    ### Key Takeaway

    **Do not just look at raw entropy.** Entropy density lets you compare a 5-party CoinJoin to a 50-party CoinJoin fairly. Use entropy density to evaluate which CoinJoin structure gives you the best privacy for your situation.

---

## Mixed-Value Transactions

So far we have discussed equal-value CoinJoins. Most Bitcoin transactions are not CoinJoins - they have inputs and outputs of different values. Computing valid interpretations for these is harder:

- We must find all groupings where each group's input sum equals its output sum (within the fee)
- This is a **constrained subset sum problem**, which is [NP-hard](../glossary.md#np-hard) - meaning there is no known fast algorithm to solve it, and the time required grows extremely fast as the number of inputs and outputs increases
- For large transactions, brute-force enumeration becomes impractical

The tool [am-i.exposed](https://am-i.exposed) implements the full Boltzmann algorithm in Rust, using optimized techniques to handle these computations efficiently.

??? note "Deep Dive: What Is the Subset Sum Problem?"

    The subset sum problem asks: given a set of numbers, can you find a subset that adds up to a specific target? For Bitcoin transactions, this becomes: can we group the inputs and outputs so that each group's input total matches its output total (within the fee)?

    This problem is classified as [NP-hard](../glossary.md#np-hard), which means there is no known algorithm that can solve it efficiently for all cases. As the number of inputs and outputs grows, the time required to check every possible grouping grows exponentially. This is why computing valid interpretations for large transactions becomes impractical - the number of combinations to check quickly becomes enormous.

    This computational difficulty is actually good news for privacy. Chain analysts cannot easily compute the full set of interpretations for large CoinJoins, though they can use heuristics and side-channel information to reduce the problem space.

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
