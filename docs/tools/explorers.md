---
description: Learn about Bitcoin block explorers, their privacy risks, and how to use them safely with Tor and self-hosted options
---

# Block Explorers

Block explorers are websites that allow you to look up Bitcoin addresses, transactions, and blocks. They are useful tools but come with significant privacy risks.

---

## The Privacy Problem

When you look up an address or transaction on a public block explorer:

- The explorer operator sees your IP address
- The explorer sees which addresses you are interested in
- This links your IP to those Bitcoin addresses
- The operator can build a profile of your Bitcoin activity

!!! warning "The Risk"

    If you look up your own addresses from your home IP, the operator may be able to guess how many bitcoins you own and where you live. This information could be sold, leaked, or subpoenaed.

---

## Running Your Own Explorer

The best solution is to run your own block explorer on your own node. This way, all queries stay private.

=== "mempool.space"

    Available on most node software (Umbrel, myNode, etc.). The most popular block explorer with a clean interface.

=== "BTC RPC Explorer"

    Lightweight, self-hosted block explorer. Good for users who want a simple, fast explorer.

=== "OXT (Offline Since April 2024)"

    Was the gold standard for advanced analysis. Created by LaurentMT. Shut down following the arrest of Samourai Wallet developers.

---

## Using Public Explorers Privately

If you must use a public explorer:

<div class="grid cards" markdown>

-   :material-incognito:{ .lg .middle } __Use Tor Browser__

    ---

    This hides your IP address from the explorer operator.

-   :material-web:{ .lg .middle } __Use .onion Endpoints__

    ---

    mempool.space has a .onion version. Use it for maximum privacy.

-   :material-eye-off:{ .lg .middle } __Do Not Look Up Your Own Addresses__

    ---

    From your regular IP, do not look up addresses you control, use tor or self host.

-   :material-shield-check:{ .lg .middle } __Use a VPN__

    ---

    As an additional layer, use a trusted VPN service.

-   :material-clock:{ .lg .middle } __Wait Before Querying__

    ---

    Do not look up recent transactions immediately. Wait to avoid timing correlation.

</div>

---

## Recommended Explorers

| Explorer | .onion Available | Self-Hostable | Best For |
|----------|-----------------|---------------|----------|
| **mempool.space** | Yes | Yes | General use |
| **Blockstream Explorer** | Yes | Yes | Cross-referencing |
| **BTC RPC Explorer** | No | Yes | Lightweight use |
| **OXT** | No | No | Advanced analysis (offline) |
