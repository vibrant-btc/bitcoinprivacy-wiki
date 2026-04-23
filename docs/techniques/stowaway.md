---
description: Learn about Stowaway, Ashigaru's PayJoin implementation for spending post-mix UTXOs with extra privacy
---

# Stowaway

Stowaway is Samourai Wallet's implementation of PayJoin. It allows users to create PayJoin transactions using their Whirlpool post-mix UTXOs, adding an extra layer of privacy after CoinJoin.

---

## What Is Stowaway?

Stowaway is a PayJoin protocol built into Samourai Wallet. When you send bitcoin from your post-mix wallet, Stowaway allows the recipient to contribute an input to the transaction, making it appear as though you are consolidating your own UTXOs.

!!! tip "The Key Benefit"

    Stowaway combines the privacy benefits of CoinJoin (Whirlpool) with the heuristic-poisoning benefits of PayJoin. This makes it one of the most powerful privacy techniques available.

---

## How Stowaway Works

=== "Step 1: Sender Initiates"

    The sender (using Samourai Wallet) creates a transaction from their post-mix wallet.

=== "Step 2: Recipient Receives"

    The recipient receives the unsigned transaction and adds one of their own inputs.

=== "Step 3: Sender Signs"

    The sender receives the modified transaction, verifies it, and signs.

=== "Step 4: Broadcast"

    The fully signed transaction is broadcast to the network.

---

## Stowaway vs Regular PayJoin

| Feature | Stowaway | Regular PayJoin |
|---------|----------|-----------------|
| **Source UTXOs** | Post-mix only | Any UTXOs |
| **Wallet Required** | Samourai Wallet | Any PayJoin wallet |
| **Privacy Level** | Very High | High |
| **Best For** | Post-mix spending | General spending |

---

## Understanding Stowaway (PayJoin)

> Force blockchain spies to rethink everything they think they know.

Payjoin is a specific structure of Bitcoin transaction that enhances user privacy during a payment by collaborating with the payment recipient.

In 2015, [LaurentMT](https://twitter.com/LaurentMT) first described this method as "steganographic transactions" in a document available [here](https://gist.githubusercontent.com/LaurentMT/e758767ca4038ac40aaf/raw/c8125f6a3c3d0e90246dc96d3b603690ab6f1dcc/gistfile1.txt). Samourai Wallet adopted and implemented it as "Stowaway" in 2018. Payjoin concepts are also discussed in [BIP79](https://github.com/bitcoin/bips/blob/master/bip-0079.mediawiki) and [BIP78](https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki). Common terms you may see:

- Payjoin
- Stowaway
- P2EP (Pay-to-End-Point)
- Steganographic transaction

What makes Payjoin unique is that it produces a transaction that looks ordinary at first glance but is actually a mini coinjoin between two parties. To achieve this, the recipient participates in the inputs alongside the sender. The recipient also includes a self-payment in the transaction, allowing them to be paid.

### What Is the Purpose of a PayJoin Transaction?

Payjoin achieves two privacy goals.

A Payjoin transaction serves two objectives that allow users to enhance the privacy of their payment. First of all, Payjoin aims to mislead an external observer by creating a decoy in chain analysis. This is made possible through the Common Input Ownership Heuristic (CIOH). Usually, when a transaction on the blockchain has multiple inputs, it is assumed that all these inputs likely belong to the same entity or user. Thus, when an analyst examines a Payjoin transaction, they are led to believe that all the inputs come from the same person. However, this perception is incorrect because the payment recipient also contributes inputs alongside the actual payer. Therefore, chain analysis is diverted towards an interpretation that turns out to be false.

Furthermore, Payjoin also allows for deceiving an external observer about the actual amount of the payment that has been made. By examining the transaction structure, the analyst might believe that the payment is equivalent to the amount of one of the outputs. However, in reality, the payment amount does not correspond to any of the outputs. It is actually the difference between the recipient's output UTXO and the recipient's input UTXO. In this sense, the Payjoin transaction falls into the domain of steganography. It allows for hiding the actual amount of a transaction within a fake transaction that acts as a decoy.

!!! tip "Definition - Steganography"

    Steganography is a technique of concealing information within other data or objects in such a way that the presence of the hidden information is not perceptible. For example, a secret message can be hidden inside a dot in a text that has nothing to do with it, making it undetectable to the naked eye (this is the technique of micropoint). Unlike encryption, which makes information incomprehensible without the decryption key, steganography does not modify the information. It remains displayed in plain sight. Its objective is rather to hide the existence of the secret message, whereas encryption clearly reveals the presence of hidden information, although inaccessible without the key.

### How Stowaway Works in Ashigaru

Ashigaru includes a PayJoin tool called Stowaway, available in the Ashigaru Android app. To complete a PayJoin, the recipient who also acts as the collaborator must use software compatible with Stowaway - currently, Ashigaru only.

Stowaway belongs to Samourai's "Cahoots" category - collaborative transactions that exchange information off-chain. Ashigaru currently offers two Cahoots tools: Stowaway (PayJoins) and [Stonewall X2](stonewall.md).

Cahoots require exchanging PSBTs (partially signed transactions) between users. Manually, this involves five successive QR scans between participants, suitable when you're together in person. At a distance, manual exchange is cumbersome; **Soroban**, an encrypted Tor-based protocol, automates the PSBT exchange in the background.

Soroban requires an authenticated channel between participants. It uses users' PayNyms for identification and encrypted communications.

A PayNym is a unique wallet identifier that activates features like encrypted exchanges. It appears as an ID with an illustration.

!!! info "Stowaway Summary"

    - **Payjoin** = specific collaborative transaction structure
    - **Stowaway** = Ashigaru's PayJoin implementation
    - **Cahoots** = Samourai's name for collaborative transaction types (Stowaway, Stonewall X2), now in Ashigaru
    - **Soroban** = Tor-based encrypted communications for Cahoots
    - **PayNym** = unique wallet identifier used to establish Soroban communications for Cahoots

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

## Stowaway Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use After Whirlpool__

    ---

    Stowaway is designed to be used after Whirlpool CoinJoin. It adds an extra layer of privacy to your post-mix spending.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Always route Stowaway through Tor. Samourai Wallet supports this natively.

-   :material-hand-back-right-off:{ .lg .middle } __Spend Post-Mix Independently__

    ---

    Each Stowaway transaction should use only one post-mix UTXO. Never combine post-mix outputs.

-   :material-shield-check:{ .lg .middle } __Verify the Transaction__

    ---

    Always verify the Stowaway transaction before signing. A malicious recipient could try to deanonymize you.

</div>

---

## Common Stowaway Mistakes

=== "Spending Multiple Post-Mix UTXOs"

    Never spend more than one post-mix UTXO in a Stowaway transaction. This re-links your mixed outputs.

=== "Not Using Tor"

    Without Tor, your Stowaway communication can be observed by third parties.

=== "Using Stowaway for Non-Post-Mix UTXOs"

    Stowaway is designed for post-mix spending. For regular spending, use regular PayJoin.
