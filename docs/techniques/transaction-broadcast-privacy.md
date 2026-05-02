---
description: Learn how Bitcoin transaction broadcasting can leak your IP address and how Tor, I2P, Bitcoin Core privatebroadcast, P2P Transport V2, Dandelion, and careful wallet setup improve network privacy.
---

# Transaction Broadcast Privacy

A Bitcoin transaction can leak information before it is ever confirmed. The moment your wallet broadcasts a transaction to the Bitcoin peer-to-peer network, network observers may try to guess where it came from.

This page explains how transaction broadcasting works and how to reduce IP address leaks.

!!! warning "On-Chain Privacy Is Not Network Privacy"

    [CoinJoin](../glossary.md#coinjoin), [PayJoin](../glossary.md#payjoin-p2ep), and [coin control](../glossary.md#coin-control) protect the transaction graph.

    Transaction broadcast privacy protects your network identity, especially your IP address. You need both.

---

## Why Broadcasting Matters

When your wallet creates a transaction, it must reach Bitcoin miners. Usually it does this by sending the transaction to a Bitcoin node, which then relays it to other nodes.

A spying node may ask:

> Which node did I hear this transaction from first?

If many spying nodes are watching the network, they may estimate the original source of the transaction.

If your node is using a normal public IP address, that source may be linked to:

- your internet connection
- your city or region
- your internet service provider
- your home or school network
- other Bitcoin activity from the same IP address

!!! danger "IP Address + Transaction = Dangerous Link"

    If an observer links a transaction to your IP address, they may connect your Bitcoin activity to your real-world network identity.

    This does not require breaking Bitcoin cryptography. It is a network privacy failure.

---

## How Normal Transaction Relay Works

In the usual model:

1. Your wallet creates and signs a transaction.
2. Your wallet gives it to your node or wallet server.
3. That node checks whether the transaction is valid.
4. The node announces it to connected peers.
5. Those peers verify it and relay it further.
6. The transaction spreads across the network.

``` mermaid
graph LR
    A[Your wallet] --> B[Your node]
    B --> C[Peer 1]
    B --> D[Peer 2]
    B --> E[Peer 3]
    C --> F[More peers]
    D --> F
    E --> F
```

This works well for reliability, but it can leak where the transaction entered the network.

---

## Who Can Watch Broadcasts?

Potential observers include:

- spying Bitcoin nodes
- chain analysis companies
- internet service providers
- Wi-Fi network operators
- VPN providers
- governments
- malware on your device
- custodial wallet servers

A single observer may not see enough. A large network of spying nodes can see more.

This is a network-level version of data fusion: several small observations can combine into a stronger guess.

---

## Using Tor for Broadcast Privacy

[Tor](../glossary.md#tor) hides your IP address by routing traffic through several relays. When your Bitcoin node or wallet broadcasts through Tor, peers see a Tor connection instead of your normal IP address.

### Benefits

- Your ISP cannot easily see which Bitcoin peers you connect to.
- Bitcoin peers do not see your home IP address.
- Your transaction broadcast is harder to connect to your physical location.
- You can use onion services for node connections.

### Trade-Offs

- Tor is slower than clearnet.
- Initial block download can take much longer over Tor.
- If Tor is down, your node may lose connectivity.
- Some peers may be less reliable over Tor.

??? tip "Full Node Over Tor vs Broadcast Over Tor"

    Running your whole node over Tor is strong for hiding that you use Bitcoin at all, but it can be slow.

    A practical compromise is:

    - download blocks over clearnet for speed
    - broadcast your own transactions over Tor for privacy

    This does not hide from your ISP that you run a Bitcoin node, but it can help hide which transactions are yours.

---

## Wallets Over Tor

Some wallets can connect over Tor directly. Others can connect to your own node or Electrum server through Tor.

This matters because a wallet may leak privacy in two different ways:

1. **History lookup:** asking about addresses and balances.
2. **Broadcast:** sending a new transaction to the network.

A wallet that uses Tor for both is stronger than a wallet that uses Tor for only one.

See [Running Your Own Node](../getting-started/node.md) for the wallet history side.

---

## Public Transaction Broadcasters

Some websites let you paste a signed transaction and broadcast it for you.

This can be useful if your wallet does not broadcast over Tor, but it must be used carefully.

A broadcaster may see:

- your IP address
- the exact transaction you submitted
- the time you submitted it
- browser metadata

!!! warning "Use Tor Browser If You Use a Public Broadcaster"

    If you paste a transaction into a public broadcaster from your normal browser and home IP, the broadcaster can link your IP to that transaction.

    If you must use one, use Tor Browser and avoid logging into identifying accounts in the same session.

---

## Bitcoin Core `privatebroadcast`

Bitcoin Core v31 introduced a new option called `-privatebroadcast` for transactions submitted with the `sendrawtransaction` RPC.

In plain English: when this option is enabled, Bitcoin Core can broadcast locally submitted transactions using short-lived Tor or I2P connections instead of immediately announcing them to all normal connected peers.

!!! tip "Why This Matters"

    Normal broadcast can reveal your IP address to the peers that first receive your transaction.

    `privatebroadcast` tries to avoid that by sending the transaction through short-lived tor (or i2p) connections first, so the first recipients do not learn your clearnet IP address or geolocation.

### What Changes

Normally, a node broadcasts a local transaction to all connected peers that accept transaction relay.

With `privatebroadcast`, Bitcoin Core uses a separate private broadcast mechanism:

1. A local transaction is submitted through `sendrawtransaction`.
2. Bitcoin Core opens short-lived connections over Tor, I2P, or IPv4/IPv6 through a Tor proxy.
3. Each connection uses a dummy handshake that avoids revealing normal identifying connection data.
4. One transaction is sent to the peer.
5. Bitcoin Core sends a `PING`.
6. After receiving `PONG`, the short-lived connection closes.
7. Bitcoin Core keeps trying until it hears the transaction back from ordinary peers.

The goal is to get the transaction into the network without making your normal node identity look like the origin.

### Why Short-Lived Connections Help

If you send many unrelated transactions over the same long-running connection, the receiving peer may guess those transactions came from the same origin.

Short-lived one-shot connections reduce this linkability:

- Your home IP address is not revealed to the first recipients.
- Two unrelated transactions are less likely to be linked by connection reuse.
- Even Tor-only or I2P-only nodes benefit because unrelated transactions are not pushed over the same long-running connection.

??? info "What happens after the first private push?"

    The transaction is held by peer-management logic and does not immediately enter the node's mempool through the normal local-broadcast path.

    Once the node receives an `INV` for that transaction from one of its ordinary peers, it requests the transaction with `GETDATA`, receives it with a `TX` message, accepts it into its mempool, and then relays it normally as if it saw the transaction for the first time.

    This is how the node confirms that the transaction has propagated through the network.

### Trade-Offs

`privatebroadcast` improves broadcast privacy, but it is not magic:

- It depends on Tor, I2P, or Tor-proxied connections being available.
- Some peers may blackhole the transaction, so Bitcoin Core sends to a few peers and retries if needed.
- It protects network origin privacy, not on-chain transaction graph privacy.
- It applies to transactions submitted through `sendrawtransaction`, so wallet behavior matters.

!!! warning "Still Use Good On-Chain Privacy"

    `privatebroadcast` can help hide where a transaction entered the network. It does not fix address reuse, bad coin control, toxic change, or post-mix consolidation.

---

## PandoTx and Soroban in Samourai Dojo

Samourai Dojo [v1.27.0](https://github.com/Dojo-Open-Source-Project/samourai-dojo/releases/tag/v1.27.0) introduced the Soroban P2P network and a transaction transport feature called **PandoTx**.

PandoTx changes how transactions can be pushed from a wallet to the Bitcoin network:

1. Your wallet sends a transaction to your Dojo.
2. Dojo relays it to a random Soroban node.
3. That Soroban node pushes it to the Bitcoin network.
4. Your own Soroban node may also receive and relay other people's transactions.

The goal is to weaken the assumption that the node relaying a transaction is closely connected to the person who created it.

!!! info "The Privacy Idea"

    If many users relay transactions for each other, a spy cannot simply assume that the node that first relayed a transaction is the spender.

    This is similar in spirit to broadcast privacy: add distance between the transaction creator and the transaction's first visible network entry point.

---

## P2P Transport V2

P2P Transport V2 is a newer Bitcoin peer-to-peer transport protocol described in BIP324. It adds opportunistic encryption to communication between Bitcoin nodes.

In simpler words: it makes Bitcoin node traffic harder for passive observers to identify, read, fingerprint, or censor.

### What It Helps With

P2P Transport V2 helps against passive network observers such as:

- ISPs
- Wi-Fi providers
- VPN providers
- broad internet surveillance systems

It makes Bitcoin traffic look more like random encrypted data instead of obvious Bitcoin protocol messages.

### What It Does Not Do

P2P Transport V2 does **not** make you anonymous by itself.

It does not hide:

- your IP address from peers
- all timing patterns
- the transaction graph
- wallet server leaks

!!! info "Useful, Not Magical"

    P2P Transport V2 improves confidentiality between nodes, but it is not a replacement for Tor.

    Think of it as making node communication harder to inspect, while Tor helps hide where the communication comes from.

### Bitcoin Core Status

P2P Transport V2 was included as an optional feature in Bitcoin Core 26.0 and enabled by default in Bitcoin Core 27.0.

It can be controlled with the `v2transport` option in Bitcoin Core configuration.

---

## Dandelion

Dandelion was a proposed transaction relay protocol designed to hide the source node of a transaction. It was formalized in BIP156, but it was not adopted into Bitcoin Core.

Dandelion splits transaction broadcast into two phases:

=== "Stem Phase"

    The transaction is passed along a random path of nodes, one node at a time.

    The goal is to move the transaction away from the original source before broadcasting it widely.

=== "Fluff Phase"

    After the stem phase, the transaction is broadcast widely across the network like a normal Bitcoin transaction.

``` mermaid
graph LR
    A[Original node] --> B[Stem node 1]
    B --> C[Stem node 2]
    C --> D[Fluff starts]
    D --> E[Many peers]
    D --> F[Many peers]
    D --> G[Many peers]
```

### Why It Would Help

If a spy sees the transaction during the fluff phase, they may identify the node that started the fluff phase. But that node is not necessarily the original creator of the transaction.

This creates doubt about where the transaction began.

### Why It Was Not Adopted

One major concern is denial-of-service risk.

In normal Bitcoin relay, each node verifies a transaction before relaying it. Invalid transactions are dropped quickly.

Dandelion's stem phase could require relaying transactions before the network has widely verified them, which may create new ways to waste node resources.

!!! note "Dandelion Is Educational Here"

    Dandelion is useful to understand because it explains the problem clearly: the first broadcast point matters. But it is not something you can simply turn on in Bitcoin Core today.

---

## Best Practices

<div class="grid cards" markdown>

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Route wallet and node traffic through Tor where practical.

-   :material-server:{ .lg .middle } __Use Your Own Node__

    ---

    Avoid handing transaction broadcast and wallet history to third-party servers.

-   :material-broadcast:{ .lg .middle } __Broadcast Carefully__

    ---

    Do not paste transactions into public broadcasters from your home IP.

-   :material-eye-off:{ .lg .middle } __Separate Lookup and Broadcast Privacy__

    ---

    A wallet can leak through history queries and through transaction broadcast. Think about both.

-   :material-lan:{ .lg .middle } __Prefer Encrypted P2P Transport__

    ---

    Use modern Bitcoin Core versions that support P2P Transport V2.

-   :material-shield-lock:{ .lg .middle } __Use Private Broadcast When Available__

    ---

    If your setup supports Bitcoin Core `privatebroadcast`, use it for locally submitted transactions that need stronger broadcast privacy.

-   :material-transit-connection-variant:{ .lg .middle } __Consider Relay Networks Carefully__

    ---

    PandoTx-style relay networks can add distance between your wallet and the first public relay point, but they do not replace good on-chain privacy.

-   :material-clock-outline:{ .lg .middle } __Avoid Obvious Timing Links__

    ---

    Do not immediately broadcast privacy-sensitive transactions from an identifiable network when timing matters.

</div>

---

## Key Takeaways

1. Broadcasting a transaction can leak your IP address.
2. Network privacy is different from on-chain privacy.
3. Tor helps hide your IP address from peers and wallet servers.
4. Bitcoin Core `privatebroadcast` uses short-lived Tor or I2P-style broadcast connections for stronger origin privacy.
5. PandoTx relays transactions through Soroban to weaken the link between the spender and the node that relays the transaction.
6. P2P Transport V2 encrypts node communication, but does not make you anonymous by itself.
7. Dandelion explains a useful broadcast privacy idea, but is not available in Bitcoin Core.
8. Public transaction broadcasters should be used carefully, preferably through Tor Browser.
9. Your own node plus Tor is a strong foundation for broadcast privacy.

---

## References

- [Bitcoin Core PR #29415: private transaction broadcast](https://github.com/bitcoin/bitcoin/pull/29415) — Introduces private broadcast connections for `sendrawtransaction`
- [Samourai Dojo v1.27.0 Release Notes](https://github.com/Dojo-Open-Source-Project/samourai-dojo/releases/tag/v1.27.0) — Soroban P2P network and PandoTx
- [BIP324: Version 2 P2P Encrypted Transport Protocol](https://github.com/bitcoin/bips/blob/master/bip-0324.mediawiki)
- [BIP156: Dandelion](https://github.com/bitcoin/bips/blob/master/bip-0156.mediawiki)
- [Loïc Morel's course'](https://planb.academy/en/courses/65c138b0-4161-4958-bbe3-c12916bc959c/privacy-on-the-p2p-network-04a2467b-db84-4076-a9ff-919be5135106) — Educational material covering Dandelion, P2P Transport V2, and Tor
- [Bitcoin Core 27.0 Release Notes](https://bitcoincore.org/en/releases/27.0/) — P2P Transport V2 enabled by default
- [Tor Project](https://www.torproject.org/) — Tor documentation and downloads
