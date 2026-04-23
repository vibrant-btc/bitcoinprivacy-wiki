---
description: Discover how PayJoin poisons the Common Input Ownership Heuristic by having recipients contribute inputs to transactions
---

# PayJoin

[PayJoin](../glossary.md#payjoin-p2ep) (also known as Pay-to-Endpoint or P2EP) is a privacy technique where the recipient of a Bitcoin payment contributes an input to the transaction. This breaks the [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) and makes it appear as though the sender is paying themselves.

---

## What Is PayJoin?

In a normal Bitcoin transaction:

- The **sender** provides inputs
- The **recipient** provides a receive address
- The transaction has the sender's inputs and two outputs (payment + change)

In a PayJoin transaction:

- The **sender** provides inputs
- The **recipient** also provides an input
- The transaction has inputs from both parties and two outputs

!!! tip "The Key Insight"

    To an outside observer, a PayJoin looks like the sender is consolidating their own UTXOs. The Common Input Ownership Heuristic incorrectly assumes all inputs belong to the sender, when in reality one input belongs to the recipient.

    This **poisons** the heuristic and creates false links in the transaction graph.

---

## How PayJoin Works

=== "Step 1: Sender Creates Transaction"

    The sender creates a transaction with their inputs and the payment output to the recipient.

=== "Step 2: Recipient Adds Input"

    The recipient receives the unsigned transaction, adds one of their own inputs, and adjusts the outputs accordingly.

=== "Step 3: Sender Signs"

    The sender receives the modified transaction, verifies it, and signs their inputs.

=== "Step 4: Broadcast"

    The fully signed transaction is broadcast to the Bitcoin network.

---

## Types of PayJoin

=== "BIP78 PayJoin"

    The original PayJoin specification. Requires the recipient to run a PayJoin-compatible server that the sender can communicate with.

    **Supported by:**
    - Sparrow Wallet
    - Samourai Wallet
    - BTCPay Server
    - JoinMarket

=== "BIP21 PayJoin"

    An extension of the BIP21 URI scheme that allows PayJoin to be initiated through a simple Bitcoin URI.

    **Example:**
    ```
    bitcoin:bc1q...?amount=0.01&pj=https://example.com/payjoin
    ```

=== "Stowaway"

    Samourai Wallet's implementation of PayJoin. Uses the Whirlpool post-mix wallet to create PayJoin transactions.

---

## Why PayJoin Is Powerful

=== "Poisoning the Heuristic"

    The [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) assumes all inputs belong to the same entity. PayJoin deliberately violates this assumption.

    When [chain analysis](../glossary.md#chain-analysis) software sees a PayJoin, it incorrectly links all inputs to the sender. This creates false links that poison the analysis.

=== "Breaking Change Detection"

    In a normal transaction, [change detection](../glossary.md#change-detection) can identify which output returns to the sender. In a PayJoin, the recipient's input makes this much harder.

=== "No Coordinator Needed"

    Unlike [CoinJoin](../glossary.md#coinjoin), PayJoin is a two-party protocol. No coordinator or third party is needed.

---

## PayJoin Best Practices

<div class="grid cards" markdown>

-   :material-swap-horizontal:{ .lg .middle } __Use PayJoin When Possible__

    ---

    Every PayJoin you do poisons the transaction graph. Use it whenever the recipient supports it.

-   :material-shield-check:{ .lg .middle } __Verify the PayJoin Server__

    ---

    Make sure you are communicating with the legitimate recipient server, not a malicious intermediary.

-   :material-incognito:{ .lg .middle } __Use Tor for PayJoin__

    ---

    Route PayJoin communication through Tor to hide your IP address.

-   :material-hand-back-right:{ .lg .middle } __As a Recipient, Run a PayJoin Server__

    ---

    If you receive bitcoin regularly, run a PayJoin server to help others achieve privacy.

-   :material-label:{ .lg .middle } __Label PayJoin Transactions__

    ---

    Keep track of which transactions used PayJoin for your own analysis.

</div>

---

## PayJoin vs CoinJoin

| Feature | PayJoin | CoinJoin |
|---------|---------|----------|
| **Parties** | 2 (sender + recipient) | 5+ participants |
| **Coordinator** | None needed | Usually required |
| **Privacy Gain** | Poisons heuristics | Breaks transaction graph |
| **Speed** | Fast (one transaction) | Slower (queue for round) |
| **Fees** | Normal transaction fees | Additional coordination fees |
| **Best For** | Regular spending | Mixing large amounts |

---

## Stowaway: PayJoin in Ashigaru

Ashigaru includes a PayJoin tool called **Stowaway**, available in the Ashigaru Android app. To complete a PayJoin, the recipient who also acts as the collaborator must use software compatible with Stowaway - currently, Ashigaru only.

Stowaway belongs to Samourai's "Cahoots" category - collaborative transactions that exchange information off-chain. Ashigaru currently offers two Cahoots tools: Stowaway (PayJoins) and [Stonewall X2](stonewall.md).

Cahoots require exchanging PSBTs (partially signed transactions) between users. Manually, this involves five successive QR scans between participants, suitable when you're together in person. At a distance, manual exchange is cumbersome; **Soroban**, an encrypted Tor-based protocol, automates the PSBT exchange in the background.

Soroban requires an authenticated channel between participants. It uses users' PayNyms for identification and encrypted communications.

!!! info "Stowaway Summary"

    - **PayJoin** = specific collaborative transaction structure
    - **Stowaway** = Ashigaru's PayJoin implementation
    - **Cahoots** = Samourai's name for collaborative transaction types (Stowaway, Stonewall X2), now in Ashigaru
    - **Soroban** = Tor-based encrypted communications for Cahoots
    - **PayNym** = unique wallet identifier used to establish Soroban communications for Cahoots

### How Stowaway Works

Payjoin is a specific structure of Bitcoin transaction that enhances user privacy during a payment by collaborating with the payment recipient. What makes PayJoin unique is that it produces a transaction that looks ordinary at first glance but is actually a mini coinjoin between two parties. To achieve this, the recipient participates in the inputs alongside the sender. The recipient also includes a self-payment in the transaction, allowing them to be paid.

In a PayJoin transaction, the Common Input Ownership Heuristic is deliberately violated. When chain analysis software sees a PayJoin, it incorrectly links all inputs to the sender. This creates false links that poison the analysis.

Furthermore, PayJoin also allows for deceiving an external observer about the actual amount of the payment that has been made. By examining the transaction structure, the analyst might believe that the payment is equivalent to the amount of one of the outputs. However, in reality, the payment amount does not correspond to any of the outputs. It is actually the difference between the recipient's output UTXO and the recipient's input UTXO.

### How to Do a PayJoin in Ashigaru

1. **Establish PayNym Connection**: Before initiating Stowaway, ensure both PayNyms follow each other - it's required to establish the encrypted Soroban channel.

2. **Initiate or Participate**: Tap your PayNym image top-left, then open `Collaborate`. Choose `Initiate` if you are the payer, or `Participate` if you are the recipient collaborator.

3. **Choose Collaboration Mode**:
   - **Online** via Soroban - automated PSBT exchange over Tor
   - **In Person / Manual** - QR code exchanges

4. **Complete the Exchange**: Follow the prompts to set up the transaction, then either wait for Soroban to complete automatically or alternate QR scans with your collaborator.

5. **Broadcast**: After both participants finish signing, broadcast to the Bitcoin network.

!!! tip "Stowaway Blurs Input Ownership"

    Stowaway blurs input ownership and destination; observers cannot reliably assign roles, which strengthens privacy.

---

## Common PayJoin Mistakes

=== "Not Using Tor"

    Without Tor, your PayJoin communication can be observed by third parties.

=== "Using Untrusted PayJoin Servers"

    A malicious PayJoin server could attempt to deanonymize you. Only use trusted servers.

=== "Not Verifying the Transaction"

    Always verify the PayJoin transaction before signing. A malicious recipient could try to steal your funds.
