---
description: Explore Lightning Network privacy challenges including node identity, channel UTXO leaks, mobile LSP wallets, invoices, private channels, route probing, and payment correlation.
---

# Lightning Privacy

The [Lightning Network](../glossary.md#lightning-network) provides real privacy benefits compared with normal [onchain](../glossary.md#onchain) payments: individual Lightning payments are not written to the blockchain. However, Lightning is not automatically private. It has its own privacy leaks around [node IDs](../glossary.md#node-id), [channels](../glossary.md#channel), [invoices](../glossary.md#invoice), [LSPs](../glossary.md#lsp), routing, and the [UTXOs](../glossary.md#utxo) used to open channels.

!!! warning "Lightning Is Not Magic Privacy"

    Lightning hides many payments from the public blockchain, but it can still leak information to your channel partners, routing nodes, wallet provider, [Lightning Service Provider](../glossary.md#lsp), or the person you pay.

    Think of Lightning as a different privacy model, not a perfect privacy upgrade.

---

## Defining Privacy in Lightning

Before going any further, let us define what "privacy" means in this context. In computer systems, privacy is often about **confidentiality**: making sure information only reaches the people who need to know it.

Another useful concept is the **[anonymity set](../glossary.md#anonymity-set)**. This is the crowd you are hiding in. The theme of this page is simple:

> How can an attacker use Lightning information to reduce your anonymity set or link your activity to your identity?

Lightning privacy is usually about reducing links between:

- Your real-world identity ↔ your [node ID](../glossary.md#node-id)
- Your node ID ↔ your [IP address](../glossary.md#tor)
- Your node ID ↔ your public [channels](../glossary.md#channel)
- Your channels ↔ your on-chain [UTXOs](../glossary.md#utxo)
- Your [invoices](../glossary.md#invoice) ↔ your node ID
- Your payments ↔ sender, receiver, amount, and timing

---

## Lightning Privacy: Who Sees What?

Different observers see different things.

| Observer | What they may learn |
|---|---|
| Your channel partner | Your shared channel, some balance changes, whether you are online |
| A public routing node | Previous hop, next hop, amount forwarded, timing |
| Your [LSP](../glossary.md#lsp) | Often your channel activity, liquidity needs, and sometimes final payment destination |
| The payment receiver | The invoice they gave you, whether it was paid, and sometimes sender clues |
| Public network observers | Public node aliases, public channels, channel capacities, and gossip data |
| Chain analysts | Channel opens, channel closes, force closes, and UTXO links |

!!! tip "Use the Right Mental Model"

    On-chain privacy is about the public transaction graph. Lightning privacy is about metadata: who connects to whom, who routes through whom, which node issued an invoice, what channel was opened, and what timing or amount patterns reveal.

---

## Network-Level Privacy Issues

Lightning nodes must communicate over the internet. If your node announces a public address, that address can reveal information about you.

### Public IP Addresses

A public IP address can reveal your approximate location and internet service provider. If your Lightning node is reachable over a public IP address, observers may connect that node to your home network, VPS provider.

This matters because a Lightning [node ID](../glossary.md#node-id) can become a public identity. If that identity is tied to your IP address, your channels, public capacity, and on-chain channel history become easier to connect to you.

### Tor Onion Addresses

Using [Tor](../glossary.md#tor) hides your normal IP address from peers. Some home node packages make Tor the default because it avoids port forwarding and protects the user's home IP.

Tor has trade-offs:

- It is slower than clearnet.
- Peers will find Tor nodes less reliable.
- Your payments will fail more often.

For many non-routing users, Tor is still a strong default.

---

## Node Identity Leaks

### Node Alias

A [node alias](../glossary.md#node-alias) is the human-readable name your Lightning node announces to the network. If you run a public business node, you may want a recognizable alias. If you are a private user, you usually do not.

!!! warning "Do Not Dox Your Node"

    Do not use your real name, social media handle, business identity, or long-term pseudonym as your node alias unless you intentionally want the world to connect that identity to your Lightning node.

    A node alias can become like putting a label on a cluster of financial activity.

### Apps and Services Can Link Your Node

Some Lightning apps and services may associate your [node ID](../glossary.md#node-id) with an account, username, chat identity, shop, or public profile. Once that happens, your public Lightning information becomes easier to connect to your identity.

Be especially careful with:

- Apps that use your Lightning node identity
- Services that know your real identity and pay to your node
- Public invoices posted in chats, forums, or social media

---

## Cross-Layer Data Leakage

The Lightning Network is a second layer built on Bitcoin. It still uses Bitcoin transactions to open and close channels. This creates **cross-layer leaks**: information from Lightning can reveal things about on-chain UTXOs, and on-chain behavior can reveal things about Lightning.

### Funding Transactions

A [funding transaction](../glossary.md#funding-transaction) locks bitcoin into a 2-of-2 [multisig](../glossary.md#multisig-multi-signature) output to open a Lightning [channel](../glossary.md#channel).

When a public channel is created, the node sends a [channel announcement](../glossary.md#channel-announcement) to the network. That announcement proves that the channel exists. It includes a [short channel ID](../glossary.md#short-channel-id), which points to the on-chain transaction output used for the channel.

A short channel ID looks like this:

```text
<blockheight>x<transaction index>x<output>
```

This makes it possible to connect a public Lightning channel to an on-chain [UTXO](../glossary.md#utxo).

### The Biggest Privacy Risk

The biggest risk comes when the bitcoin used to open the channel is already linked to your identity, usually through [KYC](../glossary.md#kyc-know-your-customer).

If you withdraw from a KYC exchange and use that UTXO to open a public Lightning channel, the exchange may know that you likely opened that channel. Anyone watching the public channel graph can then study that node's public channels, capacity, and activity.

!!! danger "KYC UTXO → Lightning Node"

    Opening public channels with identity-linked coins can connect your real-world identity to your Lightning node.

    This does not require breaking Lightning. It is just normal on-chain analysis plus public Lightning gossip.

---

## Public Channels and UTXO Links

With public channels, the [short channel ID](../glossary.md#short-channel-id) points to the channel's on-chain funding output. Observers may not always know which peer funded the channel, but they can often make strong guesses.

### Best Case and Worst Case

In a simple public channel, the funding UTXO belongs to one of the two channel peers. From the outside, that may look like a 50/50 guess.

But the guess can become much stronger when:

- One peer is a large public routing node or [LSP](../glossary.md#lsp)
- The funding UTXO came from a known KYC withdrawal
- Change from one channel open is used to open another channel
- Several channels are opened close together from related UTXOs
- A node repeatedly uses the same wallet pattern

### Opening Multiple Channels From One Source

If one transaction opens a channel and sends change back to the same wallet, and that change later opens another channel, analysts may link those channels to the same owner.

This is similar to normal [change detection](../glossary.md#change-detection): the change output becomes a trail.

!!! tip "Better Public Channel Hygiene"

    If you open public channels, avoid using identity-linked UTXOs. Avoid creating obvious change trails from one channel open into another. Use careful [coin control](../techniques/coin-control.md) and keep channel-opening funds separated by purpose.

---

## Private Channels Are Not Fully Private

A [private channel](../glossary.md#private-channel) is not announced to the whole network. That sounds private, but it does not mean nobody can learn about it.

Private channels can leak through:

- Invoices with private routing hints
- Probing attacks
- Force closes

### Private Routing Hints

If you receive through a private channel, your [invoice](../glossary.md#invoice) may include routing hints. These hints tell the sender how to reach you. In some cases, they reveal a [short channel ID](../glossary.md#short-channel-id), which can point back to the on-chain funding UTXO.

That means the person receiving your invoice may learn information about your private channel.

### Your Peer Can Reveal the Channel

Even if you never share an invoice, your channel partner might. A private channel is shared between two parties. The other party can leak details in their own invoices or through other behavior.

!!! warning "Private Means Unannounced, Not Secret Forever"

    A private Lightning channel is better understood as **unannounced**. It is not guaranteed to stay secret forever.

    If a channel matters for your privacy, assume the channel partner may eventually reveal it accidentally or intentionally.

---

## Closing Channels

Closing a channel creates another on-chain transaction.

=== "Cooperative Close"

    A cooperative close happens when both channel partners agree to close. Older P2WSH cooperative closes can still be recognized as spending a Lightning-style 2-of-2 multisig output. [Taproot channels](../glossary.md#taproot-channels) improve this because a cooperative close can look like a normal Taproot spend.

=== "Force Close"

    A [force close](../glossary.md#force-close) happens when one side closes unilaterally. Force closes are more obvious because they use Lightning-specific scripts and delays. They can reveal that a previous output was a Lightning channel, including for channels that were not publicly announced.

!!! danger "Force Closes Leak More"

    A force close should be treated as an emergency mechanism. It can be expensive, slow, and more revealing on-chain than a cooperative close.

After closing a channel, be careful with the returned UTXO. Spending it carelessly can connect your Lightning history to other funds.

---

## Invoices and Receiver Privacy

Receivers often have weaker privacy than senders on Lightning. The reason is simple: to receive, you usually give someone an [invoice](../glossary.md#invoice).

A normal invoice can reveal:

- Your [node ID](../glossary.md#node-id)
- The payment amount
- A [payment hash](../glossary.md#payment-hash)
- An expiry time
- A description or memo
- Routing hints for private channels

### Invoice Memos

Invoice descriptions can reveal more than people expect. If you put sensitive information in an invoice memo, you are handing that information to the payer and possibly to their wallet provider or custodian.

!!! warning "An Invoice Memo Is Not Private"

    Do not write sensitive information in invoice memos. Treat invoice descriptions like something that may be logged, screenshotted, forwarded, or stored by a custodial wallet.

### Public Invoices

Do not post normal Lightning invoices publicly if you want to keep your node private. Anyone with the invoice can inspect it and may learn your node ID or routing hints.

For public receiving, prefer tools designed for reusable receiving, such as [BOLT12 offers](bolt12.md) where supported, or use separate identities and wallets for public activity.

---

## Mobile Wallets and LSP Privacy

Many mobile Lightning wallets use a [Lightning Service Provider](../glossary.md#lsp). An LSP helps with channels, liquidity, routing, and mobile reliability. This makes Lightning easier to use, but it also creates a privacy trade-off.

### Phoenix and ACINQ

[Phoenix](../glossary.md#phoenix) is a common mobile Lightning wallet made by [ACINQ](../glossary.md#acinq). Phoenix is non-custodial, meaning you control the keys, but it is not privacy-equivalent to running your own Lightning node.

Phoenix channels connect to ACINQ's node. Phoenix also delegates payment route calculation to ACINQ. According to Phoenix's own FAQ, ACINQ currently knows the final destination and amount of payments made through Phoenix.

!!! warning "Phoenix Privacy Trade-Off"

    Phoenix is convenient and non-custodial, but ACINQ can currently learn the final recipient and amount of your outgoing payments.

    This is similar to the privacy level of many hosted or custodial wallets for payment metadata, even though Phoenix does not custody your funds.

### What ACINQ Can Learn

In the current Phoenix model, ACINQ may learn:

- Your app's channels with ACINQ
- Your liquidity needs
- Your outgoing payment destination
- Your outgoing payment amount
- Some timing information
- On-chain deposits and channel-related activity

This does not mean ACINQ can steal your funds in normal operation. It means ACINQ has visibility into payment metadata.

### Trust-Minimized, Not Trustless

Phoenix is best described as **trust-minimized**, not trustless. For example:

- If an incoming payment causes a channel change, there *is* trust required until the funding transaction confirms.
- If you make an on-chain deposit, Phoenix directly funds the transaction.

Using your own Electrum server reduces dependency on third-party blockchain lookups, but it does not remove ACINQ's role as Phoenix's LSP.

---

## Sender Privacy

Lightning sender privacy is often better than receiver privacy because payments use onion routing. Each routing node normally sees only:

- The previous hop
- The next hop
- The amount it forwards
- Timing information

It should not know the full route.

However, sender privacy can still fail in simple topologies.

### One-Hop Payments

If you have only one channel and you pay your direct channel partner, they may reasonably guess that you are the sender.

If no other node could have routed through you, there is not much ambiguity.

### Two-Hop LSP Payments

Many mobile users have only one channel: a channel to their [LSP](../glossary.md#lsp). If two users of the same LSP pay each other, the LSP likely is able to see both sides of the payment.

Example:

``` mermaid
graph LR
    A[Alice mobile wallet] --> B[LSP]
    B --> C[Jane mobile wallet]
```

If Alice and Jane both only connect to the same LSP, the LSP may infer that Alice paid Jane and for how much.

!!! tip "More Channels Can Mean More Ambiguity"

    A user with only one channel has a smaller anonymity set. A user with several well-chosen channels can be harder to identify as the source or destination of a payment.

---

## Payment Correlation

While Lightning takes payments off-chain, the way payments move through the network can still leak information.

### Onion Routing

Lightning uses onion routing. This means each hop only unwraps the part of the payment instructions meant for it.

This is helpful, but it is not enough in all cases. A large payment has fewer possible routes than a small payment. If only one path has enough [liquidity](../glossary.md#liquidity), the route may become obvious.

**The bigger the payment, the smaller the anonymity set.**

### Timing Analysis

Timing can also leak information. If a payment completes very quickly after reaching a certain node, that node may infer it was close to the destination.

This is covered in more detail in [Routing Analysis](routing-analysis.md).

---

## Balance Probing

[Liquidity](../glossary.md#liquidity) inside a channel is not public, but attackers can estimate it by sending fake payments that intentionally fail.

This is called [probing](routing-analysis.md#probing-attacks). The attacker tries different amounts and watches which errors come back. Over time, they can estimate how much liquidity is on each side of a channel.

This can be used to:

- Estimate a node's balance distribution
- Watch merchant activity
- Track liquidity changes before and after payments
- Infer payment amounts in targeted attacks

!!! info "Probing Is Easier to Understand Than It Sounds"

    Imagine a channel has 1 BTC total capacity. An attacker tries to route 0.9 BTC through it. If that fails, they try 0.5 BTC. If that works, they know the channel has at least 0.5 BTC available in that direction.

Network-wide probing is expensive, but targeted probing against a specific merchant, LSP, or node can be more realistic.

---

## Multipath Payments

[MPP](../glossary.md#mpp) splits one payment into multiple smaller pieces. This can help payments succeed because each piece needs less liquidity than the full amount.

MPP can also help privacy because observers may see smaller pieces instead of one large payment. However, basic MPP still uses the same payment hash for each part, so a well-positioned observer may correlate the pieces.

[AMP](../glossary.md#amp) improves this by using different payment hashes for different pieces, making correlation harder.

!!! tip "Smaller Pieces Can Help"

    Splitting a large payment into smaller parts can increase the number of possible routes. More possible routes means more ambiguity.

---

## Future and Improving Privacy Tools

Several Lightning improvements aim to reduce privacy leaks.

<div class="grid cards" markdown>

-   :material-eye-off:{ .lg .middle } __Blinded Paths__

    ---

    [Blinded paths](blinded-paths.md) let the receiver hide the final part of the route. This improves receiver privacy because the sender does not need to know the receiver's node ID.

-   :material-offer:{ .lg .middle } __BOLT12 Offers__

    ---

    [BOLT12 offers](bolt12.md) are reusable Lightning payment requests that can use blinded paths and onion messaging. They are better for public receiving than repeatedly sharing normal invoices.

-   :material-routes:{ .lg .middle } __Trampoline Routing__

    ---

    [Trampoline routing](../glossary.md#trampoline-routing) lets a lightweight wallet ask a trampoline node to help build routes. It can help mobile wallets, but it also changes who learns routing information.

-   :material-vector-link:{ .lg .middle } __PTLCs__

    ---

    [PTLCs](../glossary.md#ptlc) can reduce payment hash correlation by giving each hop a different payment point.

-   :material-call-split:{ .lg .middle } __MPP and AMP__

    ---

    [MPP](../glossary.md#mpp) and [AMP](../glossary.md#amp) split payments into parts. Smaller parts can create more route ambiguity, especially when hashes are not reused.

-   :material-key-chain:{ .lg .middle } __Taproot Channels__

    ---

    [Taproot channels](../glossary.md#taproot-channels) can make cooperative channel opens and closes look more like normal Taproot spends.

</div>

---

## Practical Lightning Privacy Checklist

<div class="grid cards" markdown>

-   :material-incognito:{ .lg .middle } __Use Tor Where Practical__

    ---

    Run your node or wallet connections over [Tor](../glossary.md#tor) when possible.

-   :material-tag-off:{ .lg .middle } __Avoid Identifying Aliases__

    ---

    Do not use your real identity as your [node alias](../glossary.md#node-alias).

-   :material-link-variant-off:{ .lg .middle } __Avoid KYC Channel Funding__

    ---

    Be careful opening public channels with [KYC](../glossary.md#kyc-know-your-customer)-linked [UTXOs](../glossary.md#utxo).

-   :material-message-alert:{ .lg .middle } __Treat Invoices as Sensitive__

    ---

    Do not post normal [invoices](../glossary.md#invoice) publicly if your node identity matters.

-   :material-note-remove:{ .lg .middle } __Avoid Revealing Memos__

    ---

    Do not put sensitive information in invoice descriptions.

-   :material-cellphone-key:{ .lg .middle } __Understand Your LSP__

    ---

    Mobile wallets using an [LSP](../glossary.md#lsp), such as [Phoenix](../glossary.md#phoenix), may leak payment metadata to that provider.

-   :material-server-network:{ .lg .middle } __Use Your Own Infrastructure__

    ---

    Running your own node reduces third-party visibility.

-   :material-source-branch:{ .lg .middle } __Prefer Better Receiving Tools__

    ---

    Use [BOLT12 offers](bolt12.md) and [blinded paths](blinded-paths.md) when available.

</div>

---

## Key Takeaways

1. Lightning hides individual payments from the public blockchain, but it leaks other metadata.
2. Public channels can reveal on-chain UTXOs through short channel IDs.
3. Private channels are unannounced, not guaranteed-secret.
4. Invoices can reveal node IDs, amounts, memos, and private routing hints.
5. Mobile LSP wallets are convenient, but the LSP may learn important payment metadata.
6. Phoenix is non-custodial but currently gives ACINQ visibility into outgoing payment destination and amount.
7. Large payments, simple channel setups, and shared LSP routes reduce anonymity.
8. Blinded paths, BOLT12, PTLCs, AMP, and Taproot channels can improve Lightning privacy over time.

---

## What Comes Next

The following pages dive deeper into specific attack vectors and mitigations:

- [Routing Analysis](routing-analysis.md) - How routing nodes can compromise sender and receiver privacy
- [Blinded Paths](blinded-paths.md) - Receiver privacy through blinded routes and trampoline routing
- [BOLT12](bolt12.md) - Reusable payment codes and offers for better receiver privacy
- [lnproxy](lnproxy.md) - A practical proxy tool for hiding Lightning invoice destinations from sender-side observers

---

## References

- [Current State of Lightning Network Privacy](https://abytesjourney.com/lightning-privacy/) — Tony's overview of Lightning privacy trade-offs
- [Phoenix FAQ](https://phoenix.acinq.co/faq) — ACINQ's explanation of Phoenix trust, payments, and recovery
- [Phoenix Privacy Policy](https://phoenix.acinq.co/privacy) — ACINQ's explanation of Phoenix payment privacy
- [Voltage - Lightning Network Privacy Explainer](https://voltage.cloud/blog/lightning-network-privacy-explainer)
- [Lightning Privacy - Introduction](https://lightningprivacy.com/en/introduction)
