# Wallet Fingerprinting

Different wallet software produces transactions with subtly different structural characteristics. By examining the raw transaction data, it is often possible to identify the wallet that created it - or at least narrow the possibilities significantly.

Research shows approximately **45% of Bitcoin transactions** are identifiable by wallet software based on transaction structure alone.

---

## What Gets Analyzed

### nLockTime

The nLockTime field specifies the earliest block height (or timestamp) at which a transaction can be mined. Different wallets set this differently:

- **Bitcoin Core**: Sets nLockTime to the current block height as an anti-fee-sniping measure. This is a strong fingerprint.
- **Electrum**: Also sets nLockTime to the current block height (since version 3.x).
- **Most mobile wallets**: Set nLockTime to 0.
- **Wasabi Wallet**: Sets nLockTime to the current block height with occasional random offset.

### nVersion

- **Version 1**: Legacy default. Increasingly rare in modern transactions.
- **Version 2**: Required for BIP68 relative timelocks. Used by wallets that enable RBF by default.

A version 1 transaction in recent years is itself a mild fingerprint, indicating older or deliberately conservative software.

### nSequence Values

The sequence number on each input encodes RBF and timelock information:

- `0xffffffff`: Final. No RBF, no relative timelock. Common in legacy wallets.
- `0xfffffffe`: No RBF, no relative timelock, but transaction is not final (allows nLockTime). Used by wallets that set nLockTime for anti-fee-sniping but disable RBF.
- `0xfffffffd`: RBF opt-in (BIP125), no relative timelock. Bitcoin Core default since version 0.25.

Different wallets set different default nSequence values. Some always signal RBF, some never do, some let the user choose. This is a distinguishing signal.

### BIP69 Lexicographic Ordering

BIP69 specifies a deterministic ordering of inputs and outputs based on lexicographic sorting. Electrum and some other wallets implement this.

```
Inputs sorted by: txid ascending, then vout ascending
Outputs sorted by: value ascending, then scriptPubKey ascending
```

BIP69 was intended to improve privacy by standardizing ordering, but because adoption is not universal, it ironically became a fingerprint for the wallets that implement it.

### Low-R Signatures

Bitcoin Core since version 0.17 grinds the ECDSA nonce to produce signatures where the R value is in the lower half of the curve order. This produces 71-byte signatures instead of 72-byte, saving 1 byte per input.

This is a distinctive fingerprint - most other wallets do not implement low-R grinding.

---

## Why Wallet Fingerprinting Matters

Wallet fingerprinting reduces the anonymity set. If an adversary can determine that a transaction was created by Bitcoin Core, they have eliminated all Electrum, Wasabi, mobile wallet, and hardware wallet users from consideration.

Combined with other metadata (geographic IP data, timing patterns, transaction amounts), wallet identification significantly aids deanonymization.

---

## Common Wallet Fingerprints

| Wallet | Fingerprint Signals |
|--------|---------------------|
| **Bitcoin Core** | nLockTime = block height, nVersion 2, nSequence 0xfffffffd, low-R signatures |
| **Electrum** | nLockTime = block height, BIP69 ordering |
| **Wasabi Wallet** | nVersion 1, nLockTime = 0 (distinctive pattern) |
| **Samourai/Ashigaru** | Niche privacy wallet, small anonymity set |
| **Sparrow** | Niche privacy wallet, small anonymity set |
| **Most mobile wallets** | nLockTime = 0, nSequence 0xffffffff |

---

## How to Defend Against Wallet Fingerprinting

### Use Bitcoin Core

Bitcoin Core has the largest anonymity set (~40% of the network). Being indistinguishable from the crowd is the goal.

### Randomize Transaction Fields

Some wallets randomize nLockTime, nVersion, and nSequence values to avoid creating a consistent fingerprint.

### Use Taproot

Taproot transactions have different witness structures that can obscure some fingerprinting signals.

### Avoid BIP69

Use wallets that randomize input and output ordering rather than sorting them deterministically.

---

## Behavioral Fingerprinting

Beyond structural signals, behavioral patterns also identify wallets:

- **Round fee rates**: Wallets offering only discrete fee tiers ("low / medium / high") produce exact integer sat/vB rates
- **RBF signaling**: Whether a wallet signals RBF by default narrows possibilities
- **Coin selection patterns**: Value-ascending or value-descending ordering reveals algorithm choices
- **Witness data patterns**: Mixed witness/non-witness inputs, varying stack depths

When 2 or more behavioral signals fire together, their combined fingerprinting power exceeds the sum of individual impacts. With 4+ signals, the wallet is highly identifiable, likely attributable to a specific software version.

---

