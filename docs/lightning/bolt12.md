# BOLT12 Offers

BOLT12 is a new Lightning Network standard that introduces "offers" - reusable payment codes that do not require creating a new invoice for every payment. This has significant privacy implications for both senders and receivers.

---

## The Problem with BOLT11 Invoices

The current Lightning payment standard (BOLT11) requires creating a unique invoice for every payment. Each invoice contains:

- The receiver's [node ID](../glossary.md#node-id)
- A unique [payment hash](../glossary.md#payment-hash)
- Routing hints (if needed)

This means every payment to the same person creates a new invoice with the same node ID, making it easy to link multiple payments to the same receiver.

---

## What Are BOLT12 Offers?

An offer is a reusable payment identifier. Instead of generating a new invoice for every payment, you create one offer that can be used indefinitely. When someone wants to pay you, they request an invoice from your offer, and your wallet generates a unique invoice for that specific payment.

### Key Benefits

- **Reusable**: One offer can receive unlimited payments
- **Privacy**: The offer does not need to contain your node ID directly
- **Async payments**: In the future, offers will support asynchronous payments where the receiver does not need to be online

---

## How Offers Work

1. **Create an offer**: Your wallet generates an offer containing a payment identifier and optional metadata (amount, description, etc.)
2. **Share the offer**: You share the offer as a QR code, link, or text string
3. **Request invoice**: When someone wants to pay, their wallet contacts you (via [onion messaging](../glossary.md#onion-messaging)) to request an invoice
4. **Receive payment**: Your wallet generates an invoice and the payment is routed to you

---

## Privacy Benefits

### Receiver Privacy with Route Blinding

By using [route blinding](blinded-paths.md), the user can publish the offer into the world without revealing their node's pubkey. The offer can include blinded paths that hide the receiver's identity from the sender and any intermediate nodes.

### Compartmentalization

Users can create different offers for different sectors of their life, maintaining privacy and separation between these sectors. For example:

- One offer for donations on your website
- One offer for payments from friends
- One offer for business transactions

Each offer is independent and cannot be linked together by observers.

### Onion Messaging

BOLT12 offers use onion messaging instead of HTTP requests. This means they cannot be censored by blocking IP addresses, and the communication between sender and receiver is encrypted and routed through the Lightning Network.

---

## User Stories

### Reusable Payment Requests

A musician can slap a QR code of their BOLT12 offer on a tip jar at their merch booth. Fans can tip them directly without the musician needing to generate a new QR code for every person.

### Shadowy Super Coder Donations

A pseudonymous Bitcoin developer can create separate offers for different areas of their work, maintaining separation between their various digital identities. By using route blinding, they can publish offers without revealing their node's public key.

### Censorship Resistance

Bitcoin payment schemes that rely on HTTP can be censored. BOLT12 offers do not rely on web servers or HTTP requests. Instead, they use onion messaging. Furthermore, the offer can use a [BIP 353](../glossary.md#bip-353) payment identifier, which looks like an email address and is easy to remember and share.

---

## Tradeoffs

### Positives

- Onions can be reused across multiple invoices
- No need for receiver to explicitly request how many hops the sender should include in their payment
- Better privacy through route blinding
- Censorship resistant through onion messaging

### Negatives

- Compared to rendezvous routing, blinded paths' privacy guarantees are a bit weaker and require more work
- Upon payment failure, interaction is required from the receiver to generate a new onion
- Potentially bigger routes mean potentially higher fees for the sender
- Larger QR codes that are harder for phones to scan (mitigated with animated QR codes, NFC, and LNURL)

---

## Implementation Status

BOLT12 is still being developed and implemented across the Lightning ecosystem:

- **Core Lightning**: Has experimental support for offers and blinded paths
- **LND**: Work is ongoing but not yet available for end users
- **Eclair**: Implementation underway, tied to BOLT12
- **LDK**: Integrating blinded paths with BOLT12

---

## References

- [BOLT12.org - User Stories](https://bolt12.org/ux-design)
- [BOLT12 Specification](https://github.com/lightning/bolts/blob/master/12-offer-encoding.md)
