---
description: Learn about Silent Payments (BIP352), a protocol that eliminates notification transactions
---

# Silent Payments

Silent Payments ([BIP352](https://bips.dev/352/)) is a protocol for reusable payment codes in Bitcoin that eliminates the need for a notification transaction by leveraging information already present in the transaction to signal to the recipient when funds are intended for them.

---

## What Are Silent Payments?

Proposed by Ruben Somsen in March 2022, Silent Payments is a new approach to reusable payment codes that removes the major drawback of [BIP47](bip47.md) payment codes - the notification transaction. Instead of requiring an on-chain notification, Silent Payments entirely relies on information that was already in the transaction.

!!! tip "The Key Improvement Over BIP47"

    BIP47 requires a notification transaction the first time someone sends to your payment code. This transaction can be observed and may reveal the payment code. Silent Payments eliminate this requirement entirely by using Elliptic-curve Diffie-Hellman (ECDH) to create a shared secret between sender and receiver.

---

## How Silent Payments Work

When Alice goes to send funds to Bob, she takes three keys and creates a unique one-time address that only Bob controls the keys to:

1. **The public key of the output(s)** Alice wants to send to Bob
2. **Bob's public key** in his reusable payment code
3. **A shared secret** (generated using the Silent Payment public key and the user's UTXO private key using ECDH) that only Alice and Bob can know

These three keys combine into a unique, one-time [Taproot](../glossary.md#taproot) address that Bob can then validate and spend from. This allows Alice to generate practically infinite addresses without any communication with Bob.

### What It Looks Like

**Off-chain (Silent Payment address):**
```
sp1qqweplq6ylpfrzuq6hfznzmv28djsraupudz0s0dclyt8erh70pgwxqkz2ydatksrdzf770umsntsmcjp4kcz7jqu03jeszh0gdmpjzmrf5u4zh0c
```

**On-chain (looks like any Taproot address):**
```
bc1pftjlgdq0ufhq7qwd0atxhrjhlnpmc8v4x50tgytygzk5rz339u6qngunq4
```

Every payment to the same Silent Payment address would look like a new, entirely disconnected Taproot address to outside observers!

### How Bob Scans for Payments

When Bob wants to check for received funds, he looks on chain for potential Silent Payments transactions, builds an aggregated key of all its inputs, and combines it with the private scanning key of his payment code. If the combination matches an output of that transaction, he can spend it. If not, he moves on to the next transaction.

---

## The Tradeoffs

Because Bob cannot pre-generate addresses with Silent Payments, he needs to keep checking to find new payments from the point he generated the payment code. Because this scanning is relatively costly, Silent Payments require more compute and bandwidth when scanning than a standard Electrum-style server.

The key difference with Silent Payment scanning is that instead of pre-generating a large amount of addresses up front like with a standard BIP32 light client, Silent Payments requires the wallet to download 33 bytes of data per potential output and then perform an ECDH calculation to check if it is owned by the user.

### The Privacy Benefit

The major benefit to this approach is that it provides excellent privacy (even for light wallets) as the wallet back-end does not know what outputs belong to any light client.

### Performance Optimizations

Thankfully, sync performance can be drastically improved by ruling out potential outputs like:

- Non-Taproot outputs
- Taproot dust outputs <=1000 sats (~85% of Taproot outputs right now)
- All potential Silent Payments outputs spent since you last scanned

Additionally, there are many brilliant people working on reducing the impact of this tradeoff through things like transaction cut-through, Silent Payments-specific indexes in Bitcoin Core, and much more.

---

## Silent Payments vs BIP47

| Feature | Silent Payments | BIP47 |
|---------|----------------|-------|
| **Notification Transaction** | Not required | Required |
| **Privacy** | n]No on-chain notification | Notification can be observed |
| **Wallet Support** | Growing | Established |
| **On-chain Footprint** | Smaller | Larger |
| **Scanning Requirement** | Must scan blockchain | Pre-generate addresses |
| **Light Client Support** | Challenging (active research) | Easier |

---

## Silent Payments Wallet Support

| Wallet | Silent Payments Support | Platform |
|--------|------------------------|----------|
| **Sparrow Wallet** | Partial support (send only) | Desktop |
| **BlueWallet** | Partial support | iOS/Android |
| **Cake Wallet** | Full support (send only) | iOS/Android/Desktop |
| **Cake Wallet** | Full support (send only) | iOS/Android/Desktop |


---

## Silent Payments Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use Silent Payments When Available__

    ---

    Silent Payments provide better privacy than BIP47. Use them when both parties support it.

-   :material-shield-check:{ .lg .middle } __Verify the Address__

    ---

    Always verify the silent payment address before sending.

-   :material-label:{ .lg .middle } __Use Labels for Organization__

    ---

    Silent Payments support labels that let you differentiate incoming payments from different sources without needing multiple addresses.

-   :material-incognito:{ .lg .middle } __Use Tor for Syncing

    ---

    Route your wallet connections through Tor for maximum privacy.

</div>

---

## Silent Payments Limitations

=== "Scanning Requirement"

    Because there is no notification transaction, the recipient's wallet must scan the blockchain to find incoming payments. This can be slow for wallets that have not synced recently.

=== "Wallet Support"

    Silent Payments is a newer protocol and no bitcoin only wallet fully supports it. Check compatibility before sharing your address.

=== "Light Client Challenges"

    Light client support is considered an area of open research. While it is possible to implement a privacy-preserving light client, it comes at the cost of increased bandwidth.

=== "No Scanning Server Availiable"

    As of now there is no mainstream electrum server that supports Silent Payments scanning with ephemeral client keys that can be easily selfhosted on any platform. This means that in the few wallets where silentpayments are supported you have to trust the wallet provider's backend infrastructure.

---

## References

- [Silent Payments, Explained](https://silentpayments.xyz/docs/explained) - Comprehensive explanation of the protocol
- [BIP352 Specification](https://bips.dev/352/) - The official BIP specification by josibake, Ruben Somsen, and Sebastian Falbesoner
- [Original Proposal (2022)](https://gist.github.com/RubenSomsen/c43b79517e7cb701ebf77eec6dbb46b8) - Ruben Somsen's original gist proposing Silent Payments
- [bitcoin-dev Discussion](https://gnusha.org/pi/bitcoindev/CAPv7TjbXm953U2h+-12MfJ24YqOM5Kcq77_xFTjVK+R2nf-nYg@mail.gmail.com/) - Original bitcoin-dev mailing list discussion
