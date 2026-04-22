# Privacy Heuristics Explained

Chain analysis companies use a set of **heuristics** (rules of thumb or assumptions) to analyze Bitcoin transactions and link addresses to real identities. Understanding these heuristics is essential because it tells you exactly what you need to defend against.

---

## Round Amount Detection

!!! note "What It Detects"

    When you send bitcoin, you typically send a round amount - "send 0.1 BTC" or "send 50,000 sats." The change output, by contrast, is whatever is left over after subtracting the payment and the fee. Change is almost never round.

**Why it matters:** If a transaction has two outputs and one is a round amount, an observer can confidently identify which output is the payment and which is the change. This breaks the ambiguity that protects the sender's privacy.

**How to defend:** Use [CoinJoin](../glossary.md#coinjoin), which creates multiple equal-value outputs. Use changeless transactions when possible.

---

## Change Detection

!!! warning "Critical Heuristic"

    Change detection attempts to identify which output in a transaction returns funds to the sender. This is one of the most consequential heuristics because correctly identifying change allows an adversary to follow the money through multiple hops.

**Sub-heuristics used:**

- **Address type mismatch**: If all inputs are from one address type and one output matches that type while another does not, the matching output is likely change
- **Round payment amount**: If one output is round and the other is not, the non-round output is likely change
- **Unnecessary input heuristic**: If a single input alone would have been sufficient to fund the payment, the additional inputs are likely from the same wallet
- **Value disparity**: If one output is 100x or more larger than the other, the larger output is likely change

**Why it matters:** Change detection is the backbone of transaction tracing. If an adversary can identify which output is change, they know which output returns to the sender's wallet and can follow it forward.

**How to defend:** Use [PayJoin](../glossary.md#payjoin-p2ep), which makes the recipient contribute an input, breaking the assumptions. Use CoinJoin. Use uniform address types.

---

## Common Input Ownership Heuristic (CIOH)

!!! danger "The Most Powerful Clustering Tool"

    If a transaction spends multiple inputs, all of those inputs are assumed to be controlled by the same entity. This is the foundational clustering heuristic - the single most powerful tool in the chain surveillance arsenal.

**Why it matters:** CIOH alone enables the majority of address clustering. A single multi-input transaction can link dozens of addresses to the same entity. Combined with a single KYC anchor point, an entire wallet's history can be deanonymized.

**Critical exceptions where CIOH does NOT hold:**

- **CoinJoin transactions** - Multiple users contribute inputs. CIOH is deliberately broken
- **PayJoin (BIP78)** - The sender and recipient both contribute inputs. CIOH is deliberately violated
- **Dual-funded Lightning channel opens** - Two parties contribute inputs cooperatively
- **Batched payments by exchanges** - Exchange hot wallets batch many withdrawals

**How to defend:** Use CoinJoin. Use PayJoin. Avoid consolidating UTXOs from different sources.

---

## CoinJoin Detection

!!! success "The ONLY Positive Privacy Signal"

    CoinJoin is a collaborative transaction where multiple users combine their inputs and outputs into a single transaction. When done correctly, an observer cannot determine which inputs funded which outputs.

**Types detected:**

- **Whirlpool**: 5+ equal outputs at known denominations (50k, 100k, 1M, 5M, 50M sats)
- **Wasabi/WabiSabi**: Large number of inputs (50-150), many equal-value outputs
- **JoinMarket**: Maker/taker model, unequal inputs, equal outputs for the CoinJoin amount
- **Stonewall**: 2+ inputs, 4 outputs with 2 equal-value pairs

**Why it matters:** CoinJoin is the ONLY positive privacy signal in on-chain analysis. A well-executed CoinJoin breaks the transaction graph by creating ambiguity. After a CoinJoin, an adversary encounters an exponential increase in possible interpretations.

---

## Boltzmann Entropy

!!! info "The Most Rigorous Privacy Measure"

    Transaction entropy measures the number of valid interpretations of a transaction. Higher entropy means more ambiguity for an adversary. Entropy E = log2(N), where N is the number of valid interpretations.

| Transaction Type | Interpretations (N) | Entropy (bits) |
|-----------------|---------------------|----------------|
| 1-in-1-out | 1 | 0 |
| 5-party CoinJoin (Whirlpool) | 1,496 | 10.55 |
| 7-party CoinJoin | 426,833 | 18.70 |
| 8-party CoinJoin | 9,934,563 | 23.24 |

**Why it matters:** Entropy is the most rigorous measure of transaction privacy. Unlike heuristics that flag specific patterns, entropy quantifies the actual ambiguity an adversary faces.

---

## Address Reuse

!!! failure "The #1 Privacy Killer"

    When a Bitcoin address receives funds in more than one transaction. This is the single biggest privacy failure a Bitcoin user can make.

**Why it matters:** Address reuse:

- Links all transactions to the same entity with certainty
- Reveals the total amount received and spent over time
- Allows temporal analysis of spending patterns
- Makes change detection trivial
- Is not a probabilistic heuristic - it is a deterministic, irrefutable link

---

## Wallet Fingerprinting

!!! tip "45% of Transactions Are Identifiable"

    Different wallet software produces transactions with subtly different structural characteristics. By examining the raw transaction data, analysts can often identify which wallet created it.

**Signals analyzed:**

- **nLockTime**: Bitcoin Core sets this to the current block height. Many mobile wallets set it to 0
- **nVersion**: Version 1 vs Version 2
- **nSequence values**: Different wallets set different default values
- **BIP69 ordering**: Some wallets sort inputs and outputs lexicographically
- **Low-R signatures**: Bitcoin Core grinds signatures to produce smaller ones

---

## Dust Detection

!!! warning "Active Surveillance Technique"

    Tiny UTXOs (<1000 sats) that may be "dusting attacks." In a dusting attack, an adversary sends tiny amounts to target addresses. When the victim spends this dust alongside other UTXOs, CIOH links the dusted address to all other inputs.

**How to defend:** Never spend dust UTXOs. Freeze them using coin control.

---

## Post-Mix Consolidation Detection

!!! danger "The Single Most Damaging Mistake"

    Spending 2+ outputs from different CoinJoin transactions in a single non-CoinJoin transaction. This re-links UTXOs via CIOH, completely destroying the anonymity set gained from mixing.

**Why it matters:** This is the single most damaging mistake a CoinJoin user can make. It undoes the mixing entirely. An adversary can then trace backward through each CoinJoin to the pre-mix inputs, collapsing the anonymity set to 1.

**How to defend:** Never spend outputs from different CoinJoin rounds in the same transaction. Use each post-mix UTXO independently.

---

## Entity Detection

Transactions and addresses are checked against databases of known entities (exchanges, mixers, darknet markets, gambling, scams, mining pools). If your transaction interacts with any of these known addresses, it gets flagged and analyzed further.

---

## What Comes Next

Now that you understand the heuristics used against you, let's look at how to acquire bitcoin without creating a KYC anchor point in the first place.

[Acquiring Bitcoin Privately →](acquiring.md)
