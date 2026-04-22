# BIP47 vs Silent Payments

Both BIP47 (PayNyms) and BIP352 (Silent Payments) are protocols for reusable payment codes on Bitcoin. They address the same problem - enabling users to receive payments without address reuse - but employ different technical approaches.

---

## Privacy Implications of Receiving Bitcoin

Bitcoin operates on a pseudonymous model. While legal identities are not directly embedded in transactions, transaction data is publicly visible on the [blockchain](../glossary.md#timechain). [Addresses](../glossary.md#address), [transaction](../glossary.md#transaction) histories, timing, and amounts are all public information. Pattern analysis can potentially connect [wallet](../glossary.md#wallet) activity to real-world identities through various correlation methods, including payment habits, donation pages, business relationships, public posts, [KYC](../glossary.md#kyc-know-your-customer) withdrawals, or recurring customer relationships.

!!! danger "Address Reuse Is a Structural Privacy Failure"

    A reused address can reveal:

    - The frequency of payments received
    - The timing of incoming transactions
    - Trends in transaction volume over time
    - Whether multiple transactions likely belong to the same entity
    - Potential linkage between public and private activities through blockchain analysis

    This represents a structural privacy failure resulting from the convenience of using static addresses.

---

## Approaches to Address Reuse

The traditional approach to avoiding [address reuse](../glossary.md#address-reuse) is manual rotation: generating a new [address](../glossary.md#address) for each [transaction](../glossary.md#transaction) and ensuring it is used only once. While effective, this method is labor-intensive, prone to error, and impractical for receiving repeated payments from the same sources or from the public.

Reusable payment code protocols aim to preserve convenience while avoiding the privacy risks associated with static addresses. The two primary approaches currently in use are:

- **BIP47 reusable payment codes**, commonly implemented through PayNyms
- **Silent Payments** (BIP352)

Both protocols address the same fundamental problem with different technical trade-offs.

---

## BIP47 Reusable Payment Codes

BIP47 enables users to share a single reusable payment code rather than generating new [addresses](../glossary.md#address) for each [transaction](../glossary.md#transaction). After establishing a relationship through a notification transaction, senders can derive fresh addresses for subsequent payments without requiring the recipient to provide new receiving information.

Key characteristics:

- Prevents repeated address reuse
- Reduces manual coordination between sender and recipient
- Separates the publicly shared payment code from the on-chain receiving addresses

This separation between the public identifier and the actual on-chain destinations represents a meaningful privacy improvement.

---

## PayNyms: The Human Layer

In practice, most users encounter BIP47 through PayNyms, which provide a human-readable interface for payment codes.

A raw payment code is functional but not user-friendly. PayNyms provide:

- Human-readable identifiers
- Easier identity recognition
- Simplified contact management

This user-friendly layer has contributed to BIP47's adoption. Privacy tools require both technical soundness and usability to achieve widespread adoption. PayNyms make BIP47 more accessible and support repeated relationships without address reuse.

---

## BIP47 Technical Overview

BIP47 functions as a reusable payment handshake:

1. The recipient shares a reusable payment code
2. The sender establishes a relationship via a [notification transaction](../glossary.md#transaction)
3. Subsequent payments are sent to freshly derived [addresses](../glossary.md#address)

**Trade-offs:**

- **Notification transaction**: Requires an additional on-chain step to establish the relationship. This adds structure and an extra transaction but also creates a deliberate boundary for the relationship.
- **Sender visibility**: Once a BIP47 relationship is established, the recipient can identify repeated payments from the same sender.
- **Alternative coordination**: BIP47-style coordination can also occur through Soroban-based peer-to-peer communication, as introduced in Samourai Dojo v1.27.0, offering alternatives to the classic notification model.

---

## Silent Payments

Silent Payments (BIP352) approach reusable private receiving from a different technical direction.

The protocol allows users to share a single public receiving identifier while enabling senders to derive fresh destination [addresses](../glossary.md#address) for each payment without a dedicated notification [transaction](../glossary.md#transaction). The sender performs the derivation work, and the recipient receives to fresh outputs without first establishing an [on-chain](../glossary.md#onchain) relationship.

Key characteristics:

- Privacy-preserving static receiving identifier
- No dedicated notification transaction required
- No special server infrastructure needed for basic receiving
- Cleaner conceptual model for users prioritizing efficiency

---

## Silent Payments Technical Overview

Silent Payments operate as follows:

1. The recipient publishes a single public receiving identifier
2. The sender derives a fresh destination address for each payment
3. No dedicated setup transaction is required before the first payment

**Considerations:**

- **Scanning burden**: Recipients must scan the [blockchain](../glossary.md#timechain) to identify incoming Silent Payments. This requires infrastructure capable of indexing and surfacing the relevant outputs.
- **Infrastructure maturity**: Currently, there is no mainstream, self-hostable, non-experimental indexing stack that ordinary users can confidently deploy for private, local Silent Payments detection.
- [Wallet](../glossary.md#wallet) **support**: Practical wallet support for both sending and receiving Silent Payments is currently limited.

---

## Comparative Analysis

Both protocols offer valid approaches to reusable private receiving. Different trade-offs are inherent to each design, and both contribute to the ecosystem of Bitcoin privacy tools.

---

## BIP47 Strengths

**Wallet Support:**

BIP47 is supported by multiple [wallets](../glossary.md#wallet) including Samourai Wallet, Ashigaru Wallet, Stack Wallet, and Sparrow Wallet. This multi-implementation support indicates active usage beyond a single development team.

**Real-World Adoption:**

Services such as The Bitcoin Company, [mynymbox.io](https://mynymbox.io/), and Lincoin have integrated BIP47. BIP47 is used for donations by organizations such as [GrapheneOS](https://grapheneos.org/donate#bitcoin).

**Ecosystem Breadth:**

BIP47 has expanded beyond a receiving method to support:

- PayNyms (human-readable identifiers)
- Auth47 (authentication)
- Collaborative workflows through Soroban and Cahoots

**Sovereign Operating Models:**

The models for scanning, wallet coordination, recovery, and contact relationships are more established and understood within the self-hosting and privacy-focused communities.

---

## Silent Payments Strengths

**No Notification Transaction:**

The standard receiving flow does not require a BIP47-style notification [transaction](../glossary.md#transaction), resulting in:

- Fewer setup steps
- No dedicated [transaction](../glossary.md#transaction) before receiving begins
- A cleaner conceptual model for users prioritizing efficiency

**Design Elegance:**

The protocol design minimizes ceremony and moving parts in the visible layer, appealing to users who prefer streamlined workflows.

---

## BIP47 Limitations

**Notification Transaction:**

The notification [transaction](../glossary.md#transaction) represents a trade-off. It can be viewed as either unnecessary friction or useful structure, depending on the use case.

**Sender Continuity:**

Once a BIP47 relationship is established, repeated payments through that relationship can be identified by the recipient as coming from the same sender. This may be undesirable in scenarios where sender continuity should not be visible to the receiver.

**Historical Centralization:**

Earlier BIP47 social and directory layers relied on centralized coordination. However, developments such as the Soroban peer-to-peer network and [BIP47DB](https://bip47db.github.io/) are addressing this concern. BIP47DB is an open protocol for inscribing BIP47 reusable payment codes onto the Bitcoin blockchain using Ordinals inscriptions with compressed binary encoding, creating a decentralized, censorship-resistant, and publicly verifiable directory.

---

## Silent Payments Limitations

**Scanning Complexity:**

Detecting incoming Silent Payments in a sovereign manner requires infrastructure capable of indexing and identifying relevant outputs. This is more complex than looking up a familiar [address](../glossary.md#address) history.

**Infrastructure Maturity:**

Currently, there is no widely adopted, self-hostable indexing solution that ordinary users can deploy for private, local Silent Payments detection. Projects such as [Frigate](https://github.com/sparrowwallet/frigate), an experimental Electrum server by Craig Raw, are working to address this gap.

**Wallet Support:**

Practical wallet support for both sending and receiving Silent Payments is currently concentrated in fewer implementations compared to BIP47.

---

## Future Developments

**BIP47:**

- The Soroban peer-to-peer network points toward more decentralized coordination between peers
- BIP47DB, if fully realized, would provide stronger redundancy and censorship resistance for payment code data

**Silent Payments:**

- Projects like Frigate aim to improve local indexing and scanning capabilities
- If the infrastructure becomes easier to run privately and locally, the comparison between the two protocols may become more competitive

---

## Feature Comparison

| Feature | BIP47 | Silent Payments |
|---------|-------|-----------------|
| **Notification [Transaction](../glossary.md#transaction)** | Required | Not required |
| **[On-chain](../glossary.md#onchain) Footprint** | Larger (notification tx) | Smaller |
| **[Privacy](../glossary.md#privacy-score)** | Good | Better |
| **[Wallet](../glossary.md#wallet) Support** | Established (Samourai, Sparrow) | Growing (Sparrow, BlueWallet) |
| **Complexity** | More complex | Simpler |
| **Scan Requirement** | Recipient scans for notifications | Recipient scans [blockchain](../glossary.md#timechain) for payments |
| **First Payment Setup** | Sender must send notification | No setup needed |

---

## Wallet Support

=== "BIP47 Wallets"

    - **Samourai Wallet** - Full support (Android)
    - **Sparrow Wallet** - Full support (Desktop)
    - **Ashigaru Wallet** - Full support (Android)
    - **Stack Wallet** - Full support (iOS/Android)

=== "Silent Payments Wallets"

    - **Sparrow Wallet** - Partial support (Desktop)
    - **BlueWallet** - Partial support (iOS/Android)
    - **Cake Wallet** - Full support (multi-coin)

---

## References

- [paymentcode.io](https://paymentcode.io/)
- [BIP47 Specification](https://github.com/bitcoin/bips/blob/master/bip-0047.mediawiki)
- [Silent Payments](https://silentpayments.xyz/)
- [Silent Payments BIP-352](https://bips.dev/352/)
- [BIP47DB](https://bip47db.github.io/)
- [GrapheneOS donations](https://grapheneos.org/donate#bitcoin)
- [Cake Wallet](https://cakewallet.com/)
- [Craig Raw Frigate repository](https://github.com/sparrowwallet/frigate)
- [Ashigaru announcement: a new PayNym directory](https://ashigaru.rs/news/announcement-paynyms/)
- [Ashigaru proof of ownership](https://ashigaru.rs/proof-of-ownership/)
- [Mynymbox](https://mynymbox.io/)
- [The Bitcoin Company](https://thebitcoincompany.com/)
- [Lincoin](https://lincoin.com/)
