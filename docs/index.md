---
description: In-depth educational resources on Bitcoin privacy - covering UTXOs, CoinJoin, Lightning Network privacy, and advanced privacy analysis
hide:
  - navigation
  - toc
---

# Home

BitcoinPrivacy.Wiki is a collection of in-depth learning resources about Bitcoin privacy. This site covers everything from fundamental concepts to advanced privacy techniques, providing detailed documentation for anyone looking to understand and improve their financial privacy on Bitcoin.

---

## Browse by Topic

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } __Getting Started__

    ---

    Foundational concepts: what Bitcoin is, why privacy matters, how UTXOs work, chain analysis, privacy heuristics, acquiring bitcoin privately, wallets, and running nodes.

    [Getting Started →](getting-started/what-is-privacy.md)

-   :material-shield-check:{ .lg .middle } __Privacy Techniques__

    ---

    Practical methods for improving privacy: address hygiene, coin control, CoinJoin implementations (Whirlpool, JoinMarket, Wasabi), PayJoin, Stonewall, Stowaway, Ricochet, post-mix best practices, dust attacks, and reusable payment codes.

    [Privacy Techniques →](techniques/address-reuse/index.md)

-   :material-lightning-bolt:{ .lg .middle } __Lightning Privacy__

    ---

    Privacy considerations for the Lightning Network: how it works, its privacy benefits and limitations, wallet options, and channel management.

    [Lightning Basics →](lightning/basics.md)

-   :material-calculator:{ .lg .middle } __Boltzmann Entropy__

    ---

    The mathematical foundation of Bitcoin transaction privacy: what entropy means, how to count valid interpretations, the link probability matrix, and the partition formula for CoinJoins.

    [Boltzmann Entropy →](boltzmann/index.md)

-   :material-tools:{ .lg .middle } __Tools & Resources__

    ---

    Privacy scanners, block explorers, fee estimation tools, and curated links for further learning.

    [Tools →](links/index.md)

-   :material-format-list-bulleted:{ .lg .middle } __Glossary__

    ---

    Comprehensive terminology reference for Bitcoin privacy concepts, techniques, and jargon.

    [Glossary →](glossary.md)

</div>

---

## References

This site draws knowledge from the following sources:

- **[Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)** by Andreas Antonopoulos - Bitcoin fundamentals, UTXOs, keys, addresses, wallets, nodes
- **[A Beginners Guide To Bitcoin Privacy](https://www.athena-alpha.com/bitcoin-privacy/)** by Athena Alpha - Privacy fundamentals, pseudo-anonymity, KYC risks
- **[bitcoiner.guide](https://bitcoiner.guide/)** - Wallet guides, node guides, privacy guides, no-KYC guidance, Lightning guide
- **[am-i-exposed](https://am-i.exposed/)** - Privacy heuristics, chain analysis, entropy, transaction analysis, privacy scoring. The [privacy engine documentation](https://github.com/Copexit/am-i-exposed/blob/main/docs/privacy-engine.md) is a primary reference for the advanced topics covered in this site.
- **[silentpaymentsxyz](https://silentpayments.xyz/)** - Silent Payments explanation, BIP47 comparison, wallet support
- **[paymentcode.io](https://paymentcode.io/)** - BIP47 protocol, Paynym API, Auth47
- **[Planb Academy](https://planb.academy/)** - Bitcoin courses, node setup, security, wallet guidance

---

## Special Thanks

Special thanks to **[Arkad](https://x.com/Multicripto)**, co-author of [am-i.exposed](https://am-i.exposed/), for auditing the Boltzmann entropy explanations and mathematics to ensure their accuracy.
