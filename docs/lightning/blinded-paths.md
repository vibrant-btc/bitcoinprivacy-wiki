---
description: Understand blinded paths and trampoline routing for receiver privacy on the Lightning Network
---

# Blinded Paths

While senders on the Lightning Network have great anonymity guarantees thanks to onion routing, receivers currently have no anonymity as their nodes' public keys are embedded in their invoices.

Blinded paths and trampoline routing are solutions for receivers to not explicitly embed their public keys in their invoices and maintain their anonymity on the Lightning Network.

---

## The Problem

When you create a Lightning invoice, your [node ID](../glossary.md#node-id) is embedded in it. Everyone with access to an invoice can easily discover the associated node.

If the sender receives the payment through an unannounced channel, it must also embed routing hints in the invoice. These hints include the short channel ID for the unannounced payment channel, so it is possible to leak UTXO data about an unannounced channel in invoices.

---

## Blinded Paths Explained

Blinded paths are the spiritual successor to rendez-vous routing. In rendez-vous routing, the receiver chooses routes from select third-party nodes to himself and passes onion-encrypted blobs for those routes to the sender (typically, this will be passed in the payment request). The sender completes the route by finding routes from himself to the rendez-vous node (or introduction point), and tries to perform the payment over these routes.

Blinded paths (also referred to as blinded routes, or route blinding) is a similar technique that allows a recipient to provide a blinded route to potential senders. Each node public key in the route is tweaked, and dummy hops may be included.

### How It Works

**How it usually is - Source routing, all constructed by sender:**

The sender constructs the entire route from themselves to the receiver. Every node in the route knows the previous and next hop.

**How it could be - Blinded routing, tail constructed by receiver:**

The receiver constructs the last portion of the route (the "blinded path") and encrypts it. The sender only sees an introduction point and an encrypted blob. The nodes in the blinded path cannot see the receiver's node ID.

### Requirements

For blinded paths to work, the following parties would need to upgrade their nodes:

- **Receivers**: They need to construct blinded node pubkeys and encrypted data
- **Senders**: They need to include blinding points and encrypted data into their onions
- **Forwarders**: They need to be able to derive shared secret to decrypt forwarding data

Thankfully, not everyone on Lightning needs to update - just the parties involved in helping settle the transaction.

---

## Trampoline Routing

Trampoline routing is a method of deferring route construction when making a payment to another node who has a larger view of the network. This is helpful for mobile users, particularly, as they are prone to have device and connection constraints that are not conducive to syncing the full network graph.

Trampoline nodes can calculate the missing parts of the payment route while providing the same privacy as fully source-routed payments.

### Requirements

For trampoline to work, the following parties would need to upgrade their nodes:

- **Receivers**: They need to provide trampoline hints
- **Senders**: They need to not expect to generate the full onion end-to-end
- **Trampolines**: They need to be able to help users route their transactions

Non-trampoline peers in the route do not need to upgrade.

---

## Blinded Paths + Trampoline Routing

Trampoline payments can be combined with blinded paths to improve recipient privacy.

Instead of the last trampoline sending to the recipient, they will send to a blinded path and never learn the recipient's identity.

This is quite novel as receivers can now accept payments anonymously from users that may have a very limited view of the network graph. Constrained, mobile phone senders also maintain the same level of privacy that a sender with the full network graph have.

---

## Picking a Blinded Path

There are a few UX challenges in picking your points for a blinded path. More novice users will want blinded paths constructed for them by default.

First, we must settle on a uniform number of hops to use in a blinded path. Three (one introduction point plus two secondary) seems to be the bare minimum but perhaps wallets will want two or three different paths included in their onion.

Second, we must encourage major service providers and nodes on the Lightning Network to adopt blinded paths so that they can all be used as introduction points. To increase privacy, wallets should not point their users to their own service's node by default, but rather shuffle randomly through an assortment of highly trafficked nodes on the network that support blinded paths.

---

## Attacks and Mitigations

### Unblinding via Payment Probing

Channels have the potential to be unblinded with payment probing. Recipients must be careful when using route blinding for payments to avoid letting attackers guess which nodes are hidden inside of the route.

If an attacker knows that the receiver is at most N hops away from the introduction point, they can delay payment, watch for new channel updates with fee or CLTV increases that are within that radius from the introduction point, attempt payment, see the failure and be able to infer that the counterparty of the fee increase is the final recipient.

**Mitigation:** It is important for users to add a large enough margin to the current values actually used by nodes inside the route to protect against future raises.

### Offline Node Detection

A similar attack can be executed by waiting for nodes to go offline and attempting payment, instead of waiting for channel updates with value increases.

**Mitigation:** Receivers should choose hops with high uptime.

---

## References

- [Lightning Privacy - Blinded Paths + Trampoline Routing](https://lightningprivacy.com/en/blinded-paths-trampoline-routing)
- [BOLT - Route Blinding (Feature 24/25)](https://github.com/lightning/bolts/blob/master/04-onion-routing.md#route-blinding)
- [BOLT - Trampoline Routing (Feature 56/57)](https://github.com/lightning/bolts/blob/master/04-onion-routing.md#trampoline-routing)
