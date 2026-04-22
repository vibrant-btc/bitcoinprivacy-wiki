# Entity Detection

[Chain analysis](../glossary.md#chain-analysis) firms maintain databases of known Bitcoin addresses belonging to exchanges, services, darknet markets, mixers, gambling sites, mining pools, and sanctioned entities. When your transaction interacts with any of these known addresses, it gets flagged and analyzed further.

---

## Types of Known Entities

### Cryptocurrency Exchanges

Thousands of addresses from Binance, Coinbase, Kraken, and other exchanges are mapped to their corporate identities. When you deposit to or withdraw from an exchange, your transaction is linked to that exchange's KYC records.

### Sanctioned Entities (OFAC)

Addresses on the OFAC SDN (Specially Designated Nationals) list are associated with sanctioned entities. Any transaction involving these addresses is a critical finding with zero false positive rate.

### Darknet Markets

Known addresses from Silk Road, Hydra, and other marketplaces are tracked. Interacting with these addresses flags your transaction for further analysis.

### Mixing Services

Known CoinJoin and mixer addresses are tracked. While using a mixer is not illegal, it flags your transaction as privacy-conscious behavior.

### Gambling Sites

Known gambling platform addresses are tracked. High-frequency small-value patterns to these addresses are detectable.

### Mining Pools

F2Pool, AntPool, Foundry, and other mining pool addresses are publicly known. Coinbase outputs are associated with these pools.

---

## How Entity Detection Works

### Tier 1 - OFAC Match

Input or output addresses appearing on the OFAC SDN sanctioned list. These have zero false positive rate.

### Tier 2 - Known Entity Database

Addresses matched against a pre-built index of known exchange, service, darknet market, mixer, and gambling addresses. Named index lookups are deterministic.

### Tier 3 - Behavioral Patterns

Structural detection of entity types without any address database. Purely pattern-based:

- **Exchange batch**: 1-2 inputs, 10+ outputs, diverse script types
- **Non-standard mixing/darknet**: unusual structure patterns
- **Gambling**: high-frequency small-value patterns

---

## Why Entity Detection Matters

Transacting with known entities - especially sanctioned addresses, exchanges, and darknet markets - creates anchor points that adversaries use to trace fund flows.

An OFAC-listed address in any input or output is a critical finding. Known exchange addresses enable chain analysis firms to correlate on-chain activity with KYC records.

---

## How to Defend Against Entity Detection

### Check Destination Addresses

Before sending, verify the destination address is not a known entity. Tools like am-i.exposed can check addresses against known entity databases.

### Use CoinJoin

[CoinJoin](../glossary.md#coinjoin) creates distance between [KYC](../glossary.md#kyc-know-your-customer)-linked [UTXOs](../glossary.md#utxo) and privacy-sensitive spending. After a CoinJoin, the link to the original entity is broken.

### Use Non-KYC Acquisition Methods

Acquire bitcoin through non-KYC means to avoid the initial anchor point entirely. See [Acquiring Bitcoin Privately](../getting-started/acquiring.md).

### Avoid Reusing Addresses Associated with Known Services

If you have received from an exchange, do not reuse that address. Generate fresh addresses for subsequent transactions.

---

