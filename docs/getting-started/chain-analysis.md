# How Chain Analysis Works

When you send or receive bitcoin, the transaction is recorded on the blockchain - a public ledger that anyone can view. While your name is not attached to the transaction, chain analysis companies have developed sophisticated techniques to link Bitcoin addresses to real-world identities.

---

## What Are Chain Analysis Companies?

Companies like **Chainalysis**, **Elliptic**, **CipherTrace** (owned by Mastercard), and **Crystal Blockchain** specialize in analyzing the Bitcoin blockchain to identify who owns which addresses.

!!! warning "Who Uses These Tools?"

    Their clients include:

    - **Law enforcement agencies** (FBI, DEA, local police)
    - **Government tax agencies**
    - **Cryptocurrency exchanges**
    - **Banks and financial institutions**
    - **Insurance companies**

    These companies maintain massive databases that map Bitcoin addresses to real-world identities. They use a combination of automated software analysis and human intelligence to build these databases.

---

## How They Track Your Bitcoin

=== "KYC Exchange Anchor Points"

    The single most powerful tool chain analysis companies have is **KYC (Know Your Customer) exchange data**. When you create an account on a regulated exchange like Coinbase or Binance, you provide:

    - Your full legal name
    - Your home address
    - A photo of your government ID
    - Sometimes a selfie or video call

    When you buy bitcoin on that exchange and withdraw it to your personal wallet, the exchange records which address you withdrew to. This creates an **anchor point** - a known link between your real identity and a Bitcoin address.

    From that anchor point, chain analysis software can follow every transaction you make from that address forward.

=== "The Common Input Ownership Heuristic"

    This is the single most powerful clustering technique in the chain analysis toolkit. It works like this:

    **If a Bitcoin transaction has multiple inputs, all of those inputs are assumed to belong to the same person.**

    This assumption is usually correct because, under normal circumstances, only the owner of a wallet has access to all the private keys needed to sign inputs from different addresses. When you combine multiple [UTXOs](../glossary.md#utxo) from different addresses into a single transaction, you are publicly declaring that all those addresses belong to the same entity.

    This is why **[coin control](../glossary.md#coin-control)** (choosing which UTXOs to spend) is so important for privacy. If you spend carelessly, you can link dozens of addresses together in a single transaction.

=== "Change Detection"

    When you send bitcoin, your wallet typically creates two outputs:

    1. The **payment output** - goes to the recipient
    2. The **change output** - goes back to you

    If chain analysis can figure out which output is the change, they can follow your money through multiple hops. They use several techniques to identify change:

    - **Address type matching**: If the inputs are from SegWit addresses and one output is also SegWit while the other is different, the matching output is likely change
    - **Round amounts**: Payments are often round numbers (0.1 BTC, 1 BTC). Change is almost never round
    - **Output ordering**: Some wallets always put change in the same position
    - **Value disparity**: If one output is much larger than the other, the larger one is often change

=== "Address Clustering"

    By combining the Common Input Ownership Heuristic with change detection, chain analysis companies can build massive clusters of addresses that all belong to the same person or entity. A single careless transaction can link dozens of addresses together.

    Once they have a cluster, if they can identify even one address in that cluster (through a KYC exchange, a public donation, a business transaction, etc.), they can identify the entire cluster.

---

## Known Entity Databases

Chain analysis companies maintain databases of known addresses belonging to:

| Category | Examples |
|----------|----------|
| **Cryptocurrency exchanges** | Thousands of addresses from Binance, Coinbase, Kraken, etc. |
| **Gambling sites** | Known gambling platforms |
| **Darknet markets** | Silk Road, Hydra, and others |
| **Mixing services** | Known CoinJoin and mixer addresses |
| **Mining pools** | F2Pool, AntPool, Foundry, etc. |
| **Scam operations** | Identified scam operations |
| **Sanctioned entities** | OFAC-listed addresses |

If your transaction interacts with any of these known addresses, it gets flagged and analyzed further.

---

## Wallet Fingerprinting

Different wallet software produces transactions with subtly different characteristics. By examining the raw transaction data, analysts can often identify which wallet created it:

- **nLockTime**: Bitcoin Core sets this to the current block height. Many mobile wallets set it to 0
- **nSequence**: Different wallets set different default values
- **BIP69 ordering**: Some wallets sort inputs and outputs lexicographically
- **Low-R signatures**: Bitcoin Core grinds signatures to produce smaller ones

!!! info "45% of Transactions Are Identifiable"

    Research shows approximately **45% of Bitcoin transactions** can be attributed to specific wallet software based on structure alone.

---

## What They Can Do With Your Data

Once chain analysis companies have linked your identity to your Bitcoin activity, they can:

- Track every transaction you make
- Estimate your total bitcoin holdings
- Identify who you transact with
- Flag you for suspicious activity
- Sell this data to governments and financial institutions
- Help exchanges block or freeze your accounts

---

## How to Protect Yourself

The good news is that all of these techniques can be defeated or mitigated:

<div class="grid cards" markdown>

-   :material-shield-check:{ .lg .middle } __Never Use KYC Exchanges__

    ---

    This removes the anchor point. Buy from non-KYC sources.

-   :material-shuffle:{ .lg .middle } __Use CoinJoin__

    ---

    This breaks the Common Input Ownership Heuristic.

-   :material-swap-horizontal:{ .lg .middle } __Use PayJoin__

    ---

    This poisons the heuristic silently.

-   :material-numeric-off:{ .lg .middle } __Never Reuse Addresses__

    ---

    This prevents easy clustering.

-   :material-server:{ .lg .middle } __Run Your Own Node__

    ---

    This prevents IP correlation.

-   :material-eye-off:{ .lg .middle } __Use Tor__

    ---

    This masks your IP address.

-   :material-hand-back-right:{ .lg .middle } __Practice Good Coin Control__

    ---

    This prevents accidental linking.

</div>

Each technique you apply improves your privacy meaningfully. You do not need to do everything perfectly - just doing the basics puts you ahead of most Bitcoin users.

---

## What Comes Next

Now that you understand how chain analysis works, let's look at the specific techniques (heuristics) they use in more detail.

[Privacy Heuristics Explained →](heuristics.md)
