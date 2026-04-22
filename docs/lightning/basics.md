# Lightning Network Basics

The Lightning Network is a second-layer payment protocol built on top of Bitcoin. It enables fast, low-cost transactions by creating payment channels between users that settle on the Bitcoin blockchain only when opened or closed.

This page will take you from knowing nothing about Lightning to understanding how it works, why it exists, and what it means for your privacy.

---

## What Problem Does Lightning Solve?

Bitcoin's base layer (often called [Layer 1](../glossary.md#base-layer)) is designed for security and decentralization, not speed. Every transaction must be recorded on the [blockchain](../glossary.md#timechain), confirmed by miners, and validated by every node on the network. This means:

- Transactions take 10-60 minutes to confirm
- Fees can be high during busy periods
- The network can only handle a limited number of transactions per second

For buying coffee or sending a few sats to a friend, this is overkill. You do not need the full security of the Bitcoin blockchain for every small payment.

!!! tip "The Analogy"

    Think of the Lightning Network like a bar tab. Instead of paying for each drink individually (on-chain transaction), you open a tab (open a channel), order multiple drinks (make payments), and settle the tab at the end of the night (close the channel).

---

## What Is the Lightning Network?

The Lightning Network is a network of [payment channels](../glossary.md#channel) that allows users to send bitcoin to each other without creating on-chain transactions for every payment.

When you open a Lightning channel with someone, you lock up some bitcoin in a shared 2-of-2 [multisig](../glossary.md#multisig-multi-signature) wallet on the Bitcoin blockchain. From that point on, you can send bitcoin back and forth instantly by updating the balance of that shared wallet. No blockchain interaction needed.

When you are done, you close the channel and the final balance is settled on the Bitcoin blockchain.

---

## How Lightning Works

=== "Opening a Channel"

    Two users create a multi-signature transaction on the Bitcoin blockchain. This transaction locks up some bitcoin in a shared 2-of-2 multisig wallet. This is called the [funding transaction](../glossary.md#funding-transaction).

    Both users now have a "channel" - a direct payment link between them.

=== "Making Payments"

    Within the channel, the users exchange signed commitment transactions that update the balance. These updates are instant and do not touch the blockchain.

    If Alice has 0.5 BTC and Bob has 0.5 BTC in a 1 BTC channel, and Alice sends 0.1 BTC to Bob, the channel now shows Alice with 0.4 BTC and Bob with 0.6 BTC. This update happens in milliseconds.

=== "Routing Payments"

    If Alice wants to send bitcoin to Carol but does not have a direct channel with her, the payment can be routed through Bob (if Bob has a channel with Carol). This is called "multi-hop routing."

    Alice → Bob → Carol

    Neither Alice nor Carol need to trust Bob with the funds. The Lightning Network uses [HTLCs](../glossary.md#htlc) (Hashed Time-Locked Contracts) to ensure the payment either completes all the way through or fails entirely.

=== "Closing a Channel"

    When the users are done, they create a final settlement transaction that closes the channel and distributes the bitcoin according to the final balance. This transaction is recorded on the Bitcoin blockchain.

---

## Key Lightning Concepts

### Channels

A [channel](../glossary.md#channel) is a payment link between two Lightning nodes. Each channel has a total capacity (the amount of bitcoin locked in it) and a balance split between the two channel partners.

### Public vs Private Channels

**Public channels** are announced to the entire Lightning Network through the gossip protocol. Other nodes can see the channel exists and use it for routing payments.

**Private channels** are not announced to the network. Only the two channel partners know about them. These are typically used for direct connections between a user and a [Lightning Service Provider (LSP)](../glossary.md#lsp).

### Invoices

An [invoice](../glossary.md#invoice) is a payment request on the Lightning Network. It contains the recipient's [node ID](../glossary.md#node-id), the payment amount, a [payment hash](../glossary.md#payment-hash), and an expiry time.

### HTLCs

[HTLCs](../glossary.md#htlc) (Hashed Time-Locked Contracts) are the mechanism that enables multi-hop routing. They ensure that either the payment completes all the way through the route, or it fails entirely and all funds are returned to their original owners.

### Liquidity

[Liquidity](../glossary.md#liquidity) refers to the amount of bitcoin available in a channel for sending. If a channel has 0.5 BTC on Alice's side, Alice can send up to 0.5 BTC through that channel.

---

## Lightning and Privacy: The Basics

=== "On-Chain Privacy"

    Lightning transactions (payments within a channel) are not recorded on the blockchain. Only the channel open and close are visible. This provides inherent privacy for the individual payments.

=== "Off-Chain Privacy Concerns"

    However, Lightning has its own privacy challenges:

    - **Channel balances**: The amount of bitcoin in a channel can be inferred from routing behavior
    - **Node IDs**: Lightning nodes have public identifiers that can be linked to real identities
    - **Payment hashes**: The same payment hash is used across all hops, potentially linking the sender and recipient
    - **Channel graph**: The structure of the Lightning Network is public and can be analyzed

---

## What Comes Next

Now that you understand the basics, the next page dives deep into Lightning's privacy implications - how your identity can be linked to your Lightning activity, and what you can do about it.

[Lightning Privacy →](privacy.md)
