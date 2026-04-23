---
description: Learn how to protect your on-chain history when opening and closing Lightning channels using CoinJoin techniques
---

# Channel Coinjoins

Lightning offers some privacy improvements over traditional on-chain bitcoin, however, it is still tied to the base layer of the bitcoin network. When using Lightning we should still use traditional bitcoin privacy techniques to protect our funds from observation.

---

## The Problem

A Lightning node must create on-chain bitcoin transactions to open and close channels. These inherently will reveal the Lightning node's on-chain history and can harm the privacy of the node. This is especially true for routing nodes which announce their channels to the entire network.

---

## Pre-Lightning Coinjoin

Today the primary way to protect your on-chain privacy when using Lightning is to coinjoin before opening a channel. The primary way to do this is to take some funds and send them into a wallet that supports coinjoins. After coinjoining until the desired [anonymity set](../glossary.md#anonymity-set) is reached, you would then send coinjoined funds to your Lightning node's on-chain wallet.

### Downsides

- **Multiple transactions required**: Even in the best case, two transactions are required - one coinjoin, and another channel opening transaction.
- **Privacy implications**: When creating the transaction to fund your Lightning channel, you are creating a transaction that explicitly exits your funds from the coinjoin liquidity pool. This means your UTXO will no longer be a part of the growing coinjoin pool.
- **Output script differences**: The output script of a Lightning channel today is a P2WSH whereas a traditional user's wallet would be a P2WPKH. These two are explicit on-chain, so you could tell which UTXOs are going out to a P2WSH and which are going to a P2WPKH.

[Taproot](../glossary.md#taproot) makes this all even stronger, as taproot lets our Lightning channels look the same as a normal wallet UTXO.

---

## Channel Open CoinJoins

What if we could open a Lightning channel inside a coinjoin? This would allow us to have a single transaction that opens multiple channels that are all indistinguishable from each other on-chain.

### Benefits

- **Intermingled on-chain history**: You are able to intermingle your on-chain history with the history of many other users.
- **Continued anonymity set growth**: Since the opening of the Lightning channel does not need to exit the coinjoin liquidity pool, your channel can continue to gain potential anonymity set from the coinjoin liquidity pool if your peers continue to remix.
- **Multiple channels**: If multiple channels are opened in a single coinjoin, an observer will not be able to tell if the other channels are also for your Lightning node or if they are for other users.

---

## Splicing

Splicing is a new feature that is being added to the Lightning protocol that allows you to update an active Lightning channel. This means that you can add or remove funds from a channel without closing it.

### Regular Splicing

Splicing can be done amongst any number of peers. You can initiate a splice with one peer, and then have another peer join in on the splice through either one of you. This can allow for splicing to become a coinjoin coordination mechanism where many peers can join in on a splice and all register UTXOs which they wish to mix.

### Coinjoin Splicing

Splicing could rework the way we think about coinjoin coordination. With splicing, we can have a channel that is always open, and we can add or remove funds at will, but we can also choose to splice a channel and not change its capacity at all.

This enables **remixing for Lightning channels**. Lightning channels can further intermingle and be indistinguishable from other on-chain UTXOs. This means we can have a Lightning channel that is always open, but is constantly changing its on-chain history, and is constantly being remixed with other UTXOs.

An easy way to think of this is that we are swapping the paint on our car every time we do a coinjoin. If someone is able to link a Lightning channel to us, then we can just do a spliced coinjoin and change the on-chain history of our channel to protect our privacy.

---

## Closing Channels

The current Lightning protocol does not actually support closing a channel inside a coinjoin. To close a channel, you just tell your peer which channel to close and an address to send the funds to. Notably, this means that you cannot construct a coinjoin transaction as this is an interactive process with other inputs and outputs.

### Future: Interactive-Tx for Closes

There are ideas on how to add this functionality. Interactive-tx is a proposal to add a way to interactively construct a transaction for opening a channel. This could be extended to allow for the construction of a transaction for closing a channel. Alternatively, you could just add a shutdownV2 message that allows you to specify a transaction to close the channel, rather than just an address.

---

## References

- [Lightning Privacy - Channel Coinjoins](https://lightningprivacy.com/en/channel-coinjoins)
