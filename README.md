# BitcoinPrivacy.Wiki

> A collection of in-depth learning resources about Bitcoin privacy

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Material for MkDocs](https://img.shields.io/badge/Material_for_MkDocs-526CFE?style=for-the-badge&logo=MaterialForMkDocs&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)

## Overview

BitcoinPrivacy.Wiki is a comprehensive educational resource covering Bitcoin privacy from fundamental concepts to advanced techniques. Built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), it provides detailed documentation for anyone looking to understand and improve their financial privacy on Bitcoin.

**Site URL:** https://bitcoinprivacy.wiki

## Content Structure

The site is organized into six main sections:

| Section | Description |
|---------|-------------|
| [Getting Started](bitcoinprivacy-wiki/docs/getting-started/) | Foundational concepts: Bitcoin basics, privacy fundamentals, UTXOs, chain analysis, wallets, and nodes |
| [Privacy Techniques](bitcoinprivacy-wiki/docs/techniques/) | Practical methods: CoinJoin, PayJoin, Stonewall, Ricochet, address hygiene, coin control, and more |
| [Lightning Privacy](bitcoinprivacy-wiki/docs/lightning/) | Lightning Network privacy: routing analysis, blinded paths, BOLT12, channel coinjoins |
| [Advanced Topics](bitcoinprivacy-wiki/docs/advanced/) | Deep dives: Boltzmann entropy, transaction graph analysis, wallet fingerprinting, entity detection |
| [Tools](bitcoinprivacy-wiki/docs/tools/) | Resources: privacy scanners, block explorers, fee estimation, curated links |
| [Glossary](bitcoinprivacy-wiki/docs/glossary.md) | Comprehensive terminology reference |

## Quick Start

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
cd bitcoinprivacy-wiki
pip install mkdocs-material
```

### Local Development

```bash
mkdocs serve
```

Visit http://localhost:8000 to preview the site.

### Building

```bash
mkdocs build
```

The static site will be generated in the `site/` directory.

## Configuration

The site uses Material for MkDocs with the following key features enabled:

- **Navigation**: Instant loading, tabs, sections, expand, path, indexes, footer
- **Search**: Suggestions, highlighting, sharing
- **Content**: Code copy, code annotations, linked tabs
- **Theme**: Light/dark mode toggle, custom palette (black/amber)
- **Extensions**: Admonitions, tables, footnotes, highlighting, tabs, emoji

See [`mkdocs.yml`](bitcoinprivacy-wiki/mkdocs.yml) for full configuration.

## References

This site draws knowledge from the following sources:

- [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) by Andreas Antonopoulos
- [A Beginners Guide To Bitcoin Privacy](https://www.athena-alpha.com/bitcoin-privacy/) by Athena Alpha
- [bitcoiner.guide](https://bitcoiner.guide/)
- [am-i.exposed](https://am-i.exposed/)
- [silentpaymentsxyz](https://silentpayments.xyz/)
- [paymentcode.io](https://paymentcode.io/)
- [Planb Academy](https://planb.academy/)

## Contributing

Contributions are welcome! Please read the existing content structure and follow the established formatting patterns.

## License

MIT