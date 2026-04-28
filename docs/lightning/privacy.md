---
description: Explore Lightning Network privacy challenges including network-level issues, cross-layer data leakage, and payment correlation
---

# Lightning Privacy

The Lightning Network provides some privacy benefits over on-chain Bitcoin transactions, but it is far from perfect. This page explains how your Lightning activity can be linked to your identity and what you can do about it.

---

## Defining Privacy in Lightning

Before going any further, let us define what "privacy" means in this context. For computer systems, privacy can be thought of in terms of "information security" - specifically **confidentiality**, which is the assurance that information only gets to the intended recipients.

Another useful concept is the **[anonymity set](../glossary.md#anonymity-set)**. This is a set of identities that, from an attacker's point of view, an action could correspond to. The theme of this page is: **how can an attacker use the properties of the Lightning Network to reduce the anonymity set of a given user or even de-anonymize them?**

---

## Network-Level Privacy Issues

Lightning nodes must be able to find each other over the internet to route payments. When a new Lightning node joins the network, it announces its address and its [node ID](../glossary.md#node-id). Currently, two types of addresses can be used:

### Public IP Addresses

A public IP exposes sensitive data about the identity running the node. You do not have to be a hacker to access this information - a quick search on an IP location tool reveals the approximate location and the internet service provider for a given IP.

### Tor Onion Addresses

A solution for this problem is using a Tor onion address. This special kind of internet address cannot be traced back to the user's IP address. The tradeoff is that the node is hosted on the Tor network, which is more unreliable than the regular network and can significantly affect the success rate of your payments.

This might be acceptable for an end-user, but for routing nodes, the tradeoff might not be worth it, as the service will become more unreliable and peers will always prefer to route payments through reliable routers.

---

## Cross-Layer Data Leakage

The Lightning Network is a "layer two" protocol built on top of Bitcoin. This means that Lightning uses the Bitcoin blockchain to anchor its payment channels. The inner workings of the lower level often become apparent in the higher level, creating a problem known as "leaky abstractions."

### Funding Transactions

A [funding transaction](#funding-transactions) is a Bitcoin transaction that locks bitcoin into a Pay-to-Witness-Script-Hash (P2WSH) output. The script that locks the Bitcoin is a 2-of-2 multi-signature.

When a public payment channel is created, the node sends a `channel_announcement` message to other nodes through the gossip protocol. To avoid spam, the node must prove that the payment channel exists on the blockchain. This is done by sending the location of the funding transaction.

The location can be retrieved by the "short channel ID" in the `channel_announcement` message. It looks like this:

```
<blockheight>x<transaction index>x<output>
```

This makes it relatively easy to link Lightning nodes with announced channels to UTXOs on-chain.

### The Biggest Privacy Risk

The biggest privacy issue comes when the bitcoin used in the funding transaction is linked to an identity, usually through [KYC](../glossary.md#kyc-know-your-customer). If an attacker has this information, it is enough to de-anonymize the identity that owns the Lightning node.

### Closing Channel Transactions

Just as opening a channel requires an on-chain transaction, closing a channel also requires one. There are two types of channel closures:

**Cooperative closes** look like any other transaction that spends from a P2WSH 2-of-2 multisig output. With only on-chain data, there is no way to distinguish a closing transaction from any other transaction that spends from a 2-of-2 multisig. However, this still indicates that it was a Lightning channel. [Taproot](../glossary.md#taproot) can fix this with MuSig2, which makes the cooperative close indistinguishable from a single-signature output.

**Force closes** look different. They rely on specialized scripts that are unique to Lightning. Therefore, a force close reveals that the P2WSH was used to open a Lightning channel. This is especially harmful to [private channels](../glossary.md#private-channel), since the attacker now knows the P2WSH from the previous transaction was used for a payment channel.

---

## Payment Correlation

While Lightning takes payments off-chain, one has to look at how this is done to analyze the privacy consequences.

### Onion Routing

The Lightning Network uses an onion encryption scheme called Sphinx. When payments are routed through the network, intermediary nodes only know where the onion came from, where it is going, and the amount being sent. Ideally, intermediary nodes should not know who the senders and receivers are, nor how long the route is.

However, this is not enough in all cases. A large payment will naturally have fewer possible routes than a small payment. If there is only one route with enough liquidity for that payment, it is obvious to all nodes in the path what the path was. **The bigger the payment, the smaller the anonymity set.**

---

## What Comes Next

The following pages dive deeper into specific attack vectors and mitigations:

- [Routing Analysis](routing-analysis.md) - How routing nodes can compromise sender and receiver privacy
- [Blinded Paths](blinded-paths.md) - Receiver privacy through blinded routes and trampoline routing
- [BOLT12](bolt12.md) - Reusable payment codes and offers for better receiver privacy

---

## References

- [Voltage - Lightning Network Privacy Explainer](https://voltage.cloud/blog/lightning-network-privacy-explainer)
- [Lightning Privacy - Introduction](https://lightningprivacy.com/en/introduction)
