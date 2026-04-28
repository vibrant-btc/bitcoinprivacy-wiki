---
description: Discover how PayJoin and Stowaway poison the Common Input Ownership Heuristic by having recipients contribute inputs to transactions
---

# PayJoin & Stowaway

[PayJoin](../glossary.md#payjoin-p2ep) (also known as Pay-to-Endpoint or P2EP) is a privacy technique where the recipient of a Bitcoin payment contributes an input to the transaction. This breaks the [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) and makes it appear as though the sender is paying themselves.

[Stowaway](../glossary.md#stowaway) is a specific PayJoin implementation built into Ashigaru Wallet, designed for spending post-mix UTXOs with an extra layer of privacy.

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

## Why PayJoin Is Powerful

### Poisoning the Heuristic

The [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) assumes all inputs belong to the same entity. PayJoin deliberately violates this assumption.

When [chain analysis](../glossary.md#chain-analysis) software sees a PayJoin, it incorrectly links all inputs to the sender. This creates false links that poison the analysis.

### Breaking Change Detection

In a normal transaction, [change detection](../glossary.md#change-detection) can identify which output returns to the sender. In a PayJoin, the recipient's input makes this much harder.

### Hiding the Payment Amount

PayJoin also deceives observers about the actual payment amount. By examining the transaction structure, an analyst might believe the payment equals one of the outputs. However, the real payment amount is the difference between the recipient's output UTXO and the recipient's input UTXO. In this sense, PayJoin falls into the domain of [steganography](../glossary.md#steganographic-transaction) — hiding the real transaction within a decoy.

??? tip "What Is Steganography?"

    Steganography is a technique of concealing information within other data or objects in such a way that the presence of the hidden information is not perceptible. Unlike encryption, which makes information incomprehensible without the decryption key, steganography does not modify the information. It remains displayed in plain sight. Its objective is to hide the existence of the secret message, whereas encryption clearly reveals the presence of hidden information.

### No Coordinator Needed

Unlike [CoinJoin](../glossary.md#coinjoin), PayJoin is a two-party protocol.

---

## Types of PayJoin

=== "BIP78 PayJoin"

    The original PayJoin specification. Requires the recipient to run a PayJoin-compatible server that the sender can communicate with.

    **Supported by:**
    - Sparrow Wallet
    - BTCPay Server
    - JoinMarket

=== "BIP21 PayJoin"

    An extension of the BIP21 URI scheme that allows PayJoin to be initiated through a simple Bitcoin URI.

    **Example:**
    ```
    bitcoin:bc1q...?amount=0.01&pj=https://example.com/payjoin
    ```

=== "BIP77 PayJoin (v2)"

    The asynchronous, serverless version of the PayJoin protocol. Unlike PayJoin v1 which required the receiver to run a server and respond in real time, v2 uses a relay directory so sender and receiver do not need to be online simultaneously.

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

## Stowaway: PayJoin for Post-Mix Spending

Stowaway is Ashigaru's PayJoin implementation. It allows users to create PayJoin transactions using their Whirlpool post-mix UTXOs, adding an extra layer of privacy after CoinJoin.

!!! tip "The Key Benefit"

    Stowaway used after a whirlpool coinjoin combines the privacy benefits of CoinJoin (Whirlpool) with the heuristic-poisoning benefits of PayJoin. This combination is one of the most powerful privacy techniques available.


### How Stowaway Works in Ashigaru

Stowaway belongs to Samourai's "Cahoots" category — collaborative transactions that exchange information off-chain. Ashigaru currently offers two Cahoots tools: Stowaway (PayJoins) and [Stonewall X2](stonewall.md).

Cahoots require exchanging PSBTs (partially signed transactions) between users. Manually, this involves five successive QR scans between participants, suitable when you're together in person. At a distance, manual exchange is cumbersome; **Soroban**, an encrypted Tor-based protocol, automates the PSBT exchange in the background.

Soroban requires an authenticated channel between participants. It uses users' [PayNyms](../glossary.md#paynym) for identification and encrypted communications.

??? info "Key Terms"

    - **PayJoin** = specific collaborative transaction structure
    - **Stowaway** = Ashigaru's PayJoin implementation
    - **Cahoots** = Samourai's name for collaborative transaction types (Stowaway, Stonewall X2), now in Ashigaru
    - **Soroban** = Tor-based encrypted communications for Cahoots
    - **PayNym** = unique wallet identifier used to establish Soroban communications for Cahoots

### How to Do a PayJoin in Ashigaru

1. **Establish PayNym Connection**: Before initiating Stowaway, ensure both PayNyms follow each other — it's required to establish the encrypted Soroban channel.

2. **Initiate or Participate**: Tap your PayNym image top-left, then open `Collaborate`. Choose `Initiate` if you are the payer, or `Participate` if you are the recipient collaborator.

3. **Choose Collaboration Mode**:
   - **Online** via Soroban — automated PSBT exchange over Tor
   - **In Person / Manual** — QR code exchanges

4. **Complete the Exchange**: Follow the prompts to set up the transaction, then either wait for Soroban to complete automatically or alternate QR scans with your collaborator.

5. **Broadcast**: After both participants finish signing, broadcast to the Bitcoin network.

!!! tip "Stowaway Blurs Input Ownership"

    Stowaway blurs input ownership and destination; observers cannot reliably assign roles, which strengthens privacy.

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

## Stowaway Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use After Whirlpool__

    ---

    Stowaway is designed to be used after Whirlpool CoinJoin. It adds an extra layer of privacy to your post-mix spending.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Always route Stowaway through Tor. Ashigaru supports this natively.

-   :material-hand-back-right-off:{ .lg .middle } __Spend Post-Mix Independently__

    ---

    Each Stowaway transaction should use only one post-mix UTXO. Never combine post-mix outputs.

-   :material-shield-check:{ .lg .middle } __Verify the Transaction__

    ---

    Always verify the Stowaway transaction before signing. A malicious recipient could try to deanonymize you.

</div>

---

## Common PayJoin & Stowaway Mistakes

=== "Not Using Tor"

    Without Tor, your PayJoin communication can be observed by third parties.

=== "Using Untrusted PayJoin Servers"

    A malicious PayJoin server could attempt to deanonymize you. Only use trusted servers.

=== "Not Verifying the Transaction"

    Always verify the PayJoin transaction before signing. A malicious recipient could try to steal your funds.

=== "Spending Multiple Post-Mix UTXOs"

    Never spend more than one post-mix UTXO in a Stowaway transaction. This re-links your mixed outputs.

=== "Using Stowaway for Non-Post-Mix UTXOs"

    Stowaway is designed for post-mix spending. For regular spending, use regular PayJoin.

---

## History and Origins

In 2015, [LaurentMT](https://twitter.com/LaurentMT) first described this method as "steganographic transactions" in a document available [here](https://gist.githubusercontent.com/LaurentMT/e758767ca4038ac40aaf/raw/c8125f6a3c3d0e90246dc96d3b603690ab6f1dcc/gistfile1.txt). Samourai Wallet adopted and implemented it as "Stowaway" in 2018. PayJoin concepts are also discussed in [BIP78](https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki), and [BIP77](https://payjoin.org/docs/how-it-works/payjoin-v2-bip-77/).
