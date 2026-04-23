---
description: Understand BIP47 reusable payment codes, PayNyms, and how they enable receiving Bitcoin without address reuse
---

# BIP47 PayNyms

BIP47 (Reusable Payment Codes) is a protocol that allows users to generate a unique payment address for each sender, without the sender needing to communicate with the recipient beforehand.

---

## What Is BIP47?

BIP47 introduces the concept of a **Payment Code** - a reusable identifier that can be shared publicly. When someone wants to send you bitcoin, they use your payment code to generate a unique [address](../glossary.md#address) that only you can spend from.

!!! tip "The Key Benefit"

    With BIP47, you can share a single payment code publicly. Each sender generates a unique address from that code, so no two senders ever use the same address. This prevents [address reuse](../glossary.md#address-reuse) while maintaining convenience.

---

## How BIP47 Works

=== "Step 1: Generate a Payment Code"

    Your [wallet](../glossary.md#wallet) generates a payment code from your [master public key](../glossary.md#public-key). This code can be shared publicly. The payment code is an [extended public key](../glossary.md#hd-wallet-hierarchical-deterministic) combined with metadata that identifies you.

=== "Step 2: Share Your Payment Code"

    Share your payment code (also called a [PayNym](../glossary.md#paynym)) with anyone who wants to send you bitcoin. This is like giving someone your email address - they can use it to send you payments without knowing your actual [addresses](../glossary.md#address).

=== "Step 3: Sender Generates Address"

    When someone wants to send you bitcoin, they use your payment code to generate a unique address. This happens locally in their wallet using a cryptographic technique called Elliptic Curve Diffie-Hellman (ECDH). ECDH allows two parties to create a shared secret without revealing their private information to each other.

=== "Step 4: Receive Funds"

    The sender sends bitcoin to the generated address. Only you can spend from it because only you have the [private key](../glossary.md#private-key) needed to unlock those funds.

---

## The Notification Transaction

The first time someone sends to your payment code, they must send a **notification transaction**. This is a special one-time transaction that tells your wallet about the incoming payment relationship.

### Why Is It Needed?

Your wallet needs to know that someone is trying to pay you using your payment code. The notification transaction serves as a "hello" that establishes the connection between the sender and your payment code.

### How Does It Work?

1. The sender creates a transaction that sends a small amount of bitcoin to your **notification address** (a special [address](../glossary.md#address) derived from your payment code)
2. The sender includes your payment code in the transaction using an [OP_RETURN](../glossary.md#op_return) output (a way to store data on the [blockchain](../glossary.md#timechain))
3. Your wallet watches for transactions to your notification address and reads the payment code from the OP_RETURN output

### Privacy Considerations

The notification transaction has some privacy implications:

- It creates an extra [transaction](../glossary.md#transaction) on the [blockchain](../glossary.md#timechain)
- It can potentially be observed by [chain analysis](../glossary.md#chain-analysis) companies

---


## BIP47 Features

=== "Reusable Payment Codes"

    A single payment code can be used to receive unlimited payments. Each payment goes to a unique [address](../glossary.md#address).

=== "Notification Transactions"

    The first time someone sends to your payment code, they send a "notification transaction" that tells your wallet about the payment. This is a one-time setup.

=== "Stealth Addresses"

    Each payment generates a unique stealth address that cannot be linked to your payment code by outside observers.

=== "Refund Support"

    Because the recipient learns the sender's payment code during a transaction, they can easily send refunds back.

---

## BIP47 Wallet Support

| Wallet | BIP47 Support | Platform |
|--------|--------------|----------|
| **Samourai Wallet** | Full support | Android |
| **Sparrow Wallet** | Full support | Desktop |
| **Ashigaru Wallet** | Full support | Android |
| **Stack Wallet** | Full support | iOS/Android |
| **Electrum** | Plugin support | Desktop |

---

## BIP47 Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use a Fresh Payment Code for Each Identity__

    ---

    If you want to keep different identities separate, use different payment codes for each.

-   :material-incognito:{ .lg .middle } __Use [Tor](../glossary.md#tor) for Notification Transactions__

    ---

    Notification transactions can reveal your payment code. Route them through Tor.

-   :material-shield-check:{ .lg .middle } __Verify the Payment Code__

    ---

    Always verify the payment code before sending. A wrong code means funds go to the wrong person.

-   :material-label:{ .lg .middle } __Label Your Payment Codes__

    ---

    If you use multiple payment codes, label them clearly in your wallet.

</div>

---

## BIP47 Limitations

=== "Notification Transaction Privacy"

    The first time someone sends to your payment code, they must send a notification transaction. This transaction can be observed by [chain analysis](../glossary.md#chain-analysis) and may reveal the payment code.

=== "Wallet Support"

    BIP47 is not widely supported by all wallets. Check compatibility before sharing your payment code.

=== "Complexity"

    BIP47 is more complex than simple address sharing. Users need to understand how it works to use it correctly.

=== "Sender Continuity"

    Once a BIP47 relationship is established, the recipient can identify repeated payments from the same sender. This may be undesirable in scenarios where sender continuity should not be visible to the receiver.

---

## References

- [BIP47 Specification (GitHub)](https://github.com/bitcoin/bips/blob/master/bip-0047.mediawiki)
- [BIP47 Test Vectors](https://gist.github.com/SamouraiDev/6aad669604c5930864bd)