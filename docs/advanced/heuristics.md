---
description: Deep dive into chain analysis heuristics including round amount detection, change detection, and wallet fingerprinting
---

# Chain Analysis Heuristics

Chain analysis companies use a set of **heuristics** - rules of thumb or assumptions - to analyze Bitcoin transactions and link addresses to real identities. Understanding these heuristics is essential because it tells you exactly what you need to defend against.

Every heuristic below is the same type of analysis that professional chain analysis firms like Chainalysis, Elliptic, and CipherTrace use to cluster addresses, trace fund flows, and deanonymize users.

---

## Round Amount Detection

!!! note "What It Detects"

    When you send bitcoin, you typically choose a round amount - "send 0.1 BTC" or "send 50,000 sats." The change output, by contrast, is whatever is left over after subtracting the payment and the fee. Change is almost never round.

**Why it matters:** If a transaction has two outputs and one is a round amount, an observer can confidently identify which output is the payment and which is the change. This breaks the ambiguity that protects the sender's privacy, because the change output goes back to the sender's wallet and can be traced forward through subsequent spending.

**Common round amounts detected:**

- Round BTC values: 0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5, 1.0, 2.0, 5.0, 10.0 BTC
- Round satoshi multiples: 10,000, 100,000, 1,000,000, 10,000,000 sats

**How to defend:** Use CoinJoin, which creates multiple equal-value outputs. Use changeless transactions when possible (Branch-and-Bound coin selection).

---

## Unnecessary Input Detection

!!! warning "More Inputs Than Needed"

    If a transaction has multiple inputs and a single input alone would have been sufficient to fund the payment (plus fee), then the additional inputs are likely from the same wallet.

This heuristic relies on the assumption that wallets select UTXOs automatically and sometimes include more than strictly necessary. The output that could have been funded by one input alone is likely the payment; the other output is likely change.

**Why it matters:** Excess inputs strengthen the Common Input Ownership Heuristic by unnecessarily linking addresses. If a transaction could have been funded with 2 inputs but used 5, the additional 3 inputs are gratuitously linked to the sender's cluster.

**How to defend:** Use wallet software with advanced coin selection (Bitcoin Core's Branch-and-Bound, Sparrow's manual coin control). When possible, construct changeless transactions that spend exact amounts.

---

## Value Disparity

!!! info "Output Size Differences"

    In a 2-output transaction, if one output is 100x or more larger than the other, the larger output is likely change (payments are typically smaller than the sender's total holdings).

This complements round-amount detection and catches cases where neither output is round but the magnitude difference is telling.

**Why it matters:** This helps chain analysis identify which output returns to the sender, enabling them to follow the money through subsequent transactions.

**How to defend:** Use PayJoin, which makes the recipient contribute an input, breaking the assumptions. Use CoinJoin.

---

## Output Ordering

Some wallet software consistently places the change output in a specific position. Historically, many wallets placed change last (index 1 in a 2-output transaction). BIP69-compliant wallets sort inputs and outputs lexicographically, which randomizes position based on value and script. Bitcoin Core randomizes output order.

**Why it matters:** A wallet that always puts change at the same index leaks information. Conversely, BIP69 ordering itself becomes a [wallet fingerprint](../techniques/wallet-fingerprinting.md).

---

## Script Type Mix Analysis

!!! tip "Mixed Address Types"

    When a transaction mixes different script types (e.g., P2WPKH inputs with a P2TR change output), the change output is easily identifiable because it often matches the input type.

Wallets typically generate change addresses of the same type as their receiving addresses. If all inputs are spent from one address type (e.g., P2WPKH / bc1q) and one output matches that type while another does not, the matching output is likely change.

**Why it matters:** Script type mixing makes change detection trivial. If a transaction spends from P2WPKH inputs and creates one P2WPKH output and one P2TR output, the P2WPKH output is likely change (returning to the sender's wallet) and the P2TR output is likely the payment (going to the recipient's newer wallet).

**How to defend:** Use uniform address types. Migrate fully to Taproot before spending mixed-type UTXOs together.

---

## Bare Multisig Detection

Bare multisig outputs (P2MS) expose all participant public keys directly on the blockchain. When spent, the M-of-N configuration and all participant keys are visible.

**Why it matters:** This reveals the multi-party nature of an input when spent. Specific patterns are associated with known services:

- **2-of-2 multisig + 2 outputs**: Consistent with P2P exchange escrow releases (Bisq-style) or Lightning Network cooperative channel closes
- **2-of-3 multisig**: Consistent with P2P exchange escrow (HodlHodl), cold storage solutions (Unchained, Casa, Nunchuk)
- **HodlHodl-specific pattern**: 2-of-3 multisig input + output to known HodlHodl fee address

Taproot multisig (MuSig2, FROST) is indistinguishable from single-sig on-chain and is not detected by this heuristic - which is the desired outcome for privacy.

**How to defend:** Use Taproot-based multisig (MuSig2 or FROST) which hides the multisig structure entirely.

---

## Timing Analysis

!!! clock "When Transactions Happen"

    Unconfirmed transactions are visible in the mempool, creating IP correlation risk. UNIX timestamp-based nLockTime values are rare and reveal the intended broadcast time. Stale locktime values (significantly before the confirmation block height) suggest the transaction was created well before broadcast.

**Why it matters:** If you receive bitcoin and immediately query that address or transaction on a block explorer, the timing itself creates a correlation. An adversary monitoring both the Bitcoin network (for new transactions) and the explorer API (for queries) can correlate the two.

**How to defend:** Wait before querying addresses. Use Tor. Route all Bitcoin activity through your own node.

---

## UTXO Age Spread

!!! clock "Old and New Together"

    Spending a years-old UTXO alongside a recent one reveals the wallet's activity window and dormancy patterns to any observer.

**Why it matters:** A large age spread between co-spent UTXOs tells an adversary that:

- The wallet has been active across a long time period
- The user has dormant UTXOs (suggesting long-term holding)
- The spending pattern reveals when the wallet was first funded

This temporal fingerprint aids behavioral profiling.

**How to defend:** Spend UTXOs of similar ages together. Consolidate old UTXOs through CoinJoin before mixing them with recent funds.

---

## Recurring Payment Detection

!!! repeat "Same Sender, Same Receiver"

    When the same sender-receiver pair transacts multiple times, an adversary can infer a business relationship, subscription, salary, rent, or other recurring financial obligation.

**Why it matters:** Even with CoinJoin, recurring payments to the same address re-link parties over time. The pattern itself is metadata that aids behavioral profiling and identity inference.

**How to defend:** Use [BIP47 PayNyms](../techniques/address-reuse/bip47.md) or [Silent Payments](../techniques/address-reuse/silent-payments.md) so that each payment uses a fresh derived address. For regular payments, use Lightning Network which does not expose individual payment details on-chain.

---

## High Activity Address Detection

Addresses with unusually high transaction counts are more likely to be monitored by chain analysis firms, flagged by exchanges, and included in address databases.

| Transaction Count | Risk Level | Interpretation |
|-------------------|------------|----------------|
| 1000+ | Critical | Almost certainly a service or exchange hot wallet |
| 100+ | High | Service-level activity |
| 20+ | Medium | Moderate activity, indicates address reuse |

**How to defend:** Generate a new address for every receive. Use HD wallets that derive fresh addresses automatically.

---

## Exchange Pattern Detection

!!! building "Batch Withdrawals"

    Centralized exchanges batch many customer withdrawals into one transaction. These have a distinctive pattern: 1-2 inputs, 10+ outputs, diverse script types, and wide value spreads.

**Why it matters:** Receiving funds from an identifiable exchange batch withdrawal links the recipient to a KYC-regulated entity. If the exchange is compromised or subpoenaed, the withdrawal can be traced to a specific customer account.

**How to defend:** When withdrawing from exchanges, use intermediate wallets or CoinJoin before moving funds to long-term storage. Consider using non-KYC acquisition methods.

---

## Coinbase Transactions

Block reward (coinbase) transactions have no regular inputs - their single input references a null txid (all zeros). The output addresses are associated with publicly identifiable mining pools.

**Why it matters:** If a user receives a coinbase output directly, it may indicate they are a miner, which is metadata about their identity and activity.

---

## BIP69 Lexicographic Ordering

BIP69 specifies that transaction inputs should be sorted lexicographically by txid:vout and outputs sorted by value:scriptpubkey. While designed to reduce fingerprinting through deterministic ordering, in practice it identifies specific wallet software because adoption is not universal.

**Why it matters:** BIP69 compliance is primarily associated with Electrum and older Samourai versions. Most modern wallets use random ordering instead. As a result, BIP69 ordering has become a [wallet fingerprint](../techniques/wallet-fingerprinting.md) rather than a privacy enhancement.

**How to defend:** Use wallet software that randomizes input and output ordering (Bitcoin Core, Sparrow, most modern wallets).

---

## BIP47 Notification Transactions

BIP47 (PayNym) notification transactions are a one-time setup that enables the sender and receiver to derive fresh addresses for all future payments without further on-chain coordination.

**Pattern:** 1-3 inputs, 1 OP_RETURN with exactly 80 bytes (encrypted payment code), 1 small notification output (546-1000 sats), 0-1 change output.

**Why it matters:** The notification transaction itself is identifiable and the change from it is toxic - it links the sender's identity to the PayNym connection and should not be spent alongside unrelated UTXOs.

**How to defend:** Do not spend notification change alongside post-CoinJoin or unrelated UTXOs.

---

## Ricochet Detection

Ricochet adds 4 extra hops between a CoinJoin and the final destination, creating transactional distance that defeats shallow chain analysis (1-3 hop lookback).

**Why it matters:** Many exchanges and compliance tools only look back 1-3 hops, so 4 extra hops can be sufficient to avoid flagging. The first hop is detectable only because of a known fee address; subsequent hops are indistinguishable from normal transactions.

---

## OP_RETURN Detection

OP_RETURN is a Bitcoin script opcode that marks an output as provably unspendable and allows up to 80 bytes of arbitrary data to be embedded in the transaction. This data is stored permanently in the blockchain.

**Known protocol markers detected:**

- **Omni Layer** (formerly Mastercoin): historically used by Tether (USDT)
- **OpenTimestamps**: cryptographic timestamp proofs
- **Counterparty**: XCP protocol messages
- **RUNES protocol**: Runes etching and minting data
- **Ordinals**: envelope data related to inscriptions

**Why it matters:** OP_RETURN data is a permanent, public annotation on a transaction. It may contain identifying information - a protocol marker that reveals the purpose of the transaction, a message, a hash that can be correlated with off-chain data, or metadata that narrows the universe of possible senders.

---

## Fee Analysis

Transaction fees and their associated metadata reveal information about the wallet software used and the user's behavior:

- **Round fee rates**: If the fee rate is an exact integer multiple of 1 sat/vB (e.g., exactly 5.0 sat/vB rather than 5.3), this suggests the wallet uses simple fee estimation or offers only discrete fee tiers
- **RBF signaling**: Replace-By-Fee is signaled via the nSequence field. This reveals the wallet supports RBF and narrows wallet identification
- **Fee rate relative to mempool**: Significantly higher or lower fees may indicate urgency or lack of fee estimation sophistication

**Why it matters:** Fee analysis alone is a weak signal. But combined with other [wallet fingerprinting](../techniques/wallet-fingerprinting.md) data, it narrows the set of possible wallet software significantly.

---

## Anonymity Set Analysis

The anonymity set for each output value is the number of outputs sharing the same value, making them indistinguishable from each other. An anonymity set of 1 means the output is unique and trivially traceable.

| Anonymity Set Size | Privacy Level |
|--------------------|---------------|
| 1 | No anonymity - all outputs unique |
| 2+ | Moderate anonymity |
| 5+ | Strong anonymity (CoinJoin territory) |

This is complementary to CoinJoin detection. While CoinJoin detection determines whether a transaction is a CoinJoin, the anonymity set analysis provides granular per-output ambiguity measurement that applies to any transaction.

---

## Witness Data Analysis

SegWit transactions contain witness data that can reveal structural information:

- **Mixed witness/non-witness inputs**: SegWit inputs appearing alongside legacy inputs reveal a wallet managing UTXOs from different eras
- **Deep witness stack (>4 items)**: Indicates complex script such as HTLC, timelock, or conditional spending paths
- **Mixed witness depths**: Varying stack depths suggest inputs from different script types
- **Mixed Schnorr/ECDSA signatures**: Taproot inputs alongside SegWit v0 inputs is a strong wallet transition fingerprint

**How to defend:** Avoid mixing Taproot and SegWit v0 inputs in the same transaction. Complete the migration to Taproot before spending mixed-type UTXOs together.

---

## Coin Selection Patterns

Different wallets use different algorithms to select which UTXOs to spend:

- **Branch-and-Bound (BnB)**: Multiple inputs with a single output and no change. The wallet found an exact combination of UTXOs to cover the payment. This is privacy-positive because it eliminates the change output.
- **Value ascending**: Inputs sorted from smallest to largest. May indicate a smallest-first coin selection algorithm.
- **Value descending**: Inputs sorted from largest to smallest. May indicate a largest-first coin selection algorithm.

**How to defend:** Use wallet software that supports Branch-and-Bound coin selection (Bitcoin Core) or manual coin control (Sparrow).

---

## PayJoin Is NOT Detectable

!!! success "The Undetectable Technique"

    PayJoin (BIP78) is deliberately designed to be indistinguishable from a normal payment. If you can detect it, it is not a proper PayJoin.

PayJoin's security model is that it poisons the Common Input Ownership Heuristic silently. If all inputs in a multi-input transaction are assumed to belong to the same entity, and in fact one input belongs to the recipient, then every clustering algorithm that relies on CIOH produces a false positive.

A properly constructed PayJoin transaction has no on-chain signature that distinguishes it from an ordinary payment. There are no extra outputs, no unusual value patterns, no script type anomalies, no identifiable metadata. Any "PayJoin detector" that fires on a transaction is either wrong (false positive on a normal transaction) or the PayJoin implementation is broken.

**This is why PayJoin is one of the best privacy techniques available.** Use BTCPay Server, Sparrow Wallet, or any BIP78-compatible wallet to construct PayJoin transactions. The fact that chain analysis cannot detect them is exactly why they work.

---

## Cross-Heuristic Intelligence

Individual heuristics analyze isolated signals, but real-world transactions produce findings that interact. Chain analysis firms use compound analysis:

- **RBF + Change detection**: When both RBF signaling and change detection fire, the change finding's confidence is boosted because the wallet that initiated RBF is the one controlling the change output
- **Multi-heuristic confidence**: When change detection is corroborated by 2 or more independent signals (wallet fingerprint, peel chain, low entropy), the confidence in change identification increases
- **Behavioral fingerprint rollup**: When 2 or more behavioral signals fire together (wallet fingerprint, round fee rate, RBF signaling, BIP69 ordering, coin selection patterns), their combined fingerprinting power exceeds the sum of individual impacts

This is why relying on a single privacy technique is insufficient. You need layered defense.

---

