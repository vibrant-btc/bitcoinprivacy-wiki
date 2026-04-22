# Routing Analysis

Through the inherent nature of onion-routed payments, a certain degree of source and destination privacy is given as any payment flows through the network. Since Lightning payments typically go through other third parties, it is important that the source, destination, and any other metadata are concealed.

---

## The Problem

There are scenarios in which routing nodes may derive information about the sender or receiver of a Lightning payment. This page dives into those scenarios and the improvements that can make it difficult to observe payments as they route.

---

## Routing Concerns Today

The onion routing properties of Lightning payments provide benefits similar to Tor's onion routing. The source and destination of payments are supposed to be concealed as they are routed across the network. However, there are scenarios where routers could infer this information.

### Direct Channel Payments

Whenever a node is paying a direct channel partner, it is possible that the payment was routed through them so it cannot be certain whom the payment came from. However, if the payer has no public channel open with any other node, then there is a very low likelihood the payment was routed by anyone else.

This scenario happens frequently when there are [LSPs](../glossary.md#lsp) involved. Mobile wallets typically maintain a single connection to an LSP, making it trivial for the LSP to identify senders and receivers if they are directly connected.

---

## HTLCs and Payment Correlation

When an [HTLC](../glossary.md#htlc) payment goes through multiple nodes, the same [payment hash](../glossary.md#payment-hash) is used each time. So whenever the same actor sees the same payment hash on multiple nodes, they can tell that it is the same payment.

They might not know who exactly it came from or where it is going (except in cases outlined above). But if a Lightning service provider routes a user's payment to a major merchant, they might be able to conclude the exact source and destination.

### How It Could Be: PTLCs

[PTLCs](../glossary.md#ptlc) (Point Time-Locked Contracts) offer two main improvements to Lightning. One is escrow / DLC / smart contract possibilities and one helps payment correlatability.

With PTLCs, each hop uses a different payment point, so even if the same actor controls multiple nodes in the route, they cannot correlate the payments by comparing payment hashes.

---

## Timing Analysis

Timing delays are important so that it is not possible to estimate how far away a source or destination is from the observing node. Some early research shows that this is possible today. Some of the top nodes on the network are capable of analyzing the source and destination of 50 to 72% of payments.

### How the Attack Works

If the average time delay was 100ms between Alice and Bob, and Alice routes a payment to Bob, and Bob immediately responds with the preimage to that HTLC, then Alice has a reasonable assumption that Bob was the final destination.

Alice can even extend that assumption further if she knows the time delays of the nodes Bob is connected to. It does not assert which is the sending destination, but Alice could assume that if she was routing to Bob (and possibly further to some specific nodes past Bob), then she can do routing analysis to figure out the nodes that may have taken her path.

### Fixing Timing Analysis

There are a few solutions to solving the timing analysis problem after PTLCs are in place:

**Random delays:** Nodes add a random delay to the payment they are routing. For this delay to be meaningful, it should provide some amount of delay equal to about 2 to 3 times the average node delay. If each node is adding this level of random delay, then that is around 2 to 3 times the time it takes for payments to complete.

**Sender opt-in timing delays:** The sender can ask each node along the hop to add a delay to the payment before they send it off to the next node. This allows the sender to have more fine grain control of their anonymity set of payments being routed.

---

## Probing Attacks

Every public channel announces its capacity (the total amount of Bitcoin locked in the payment channel). But no information is available for how the capacity is currently distributed in a channel. This is where payment probing comes in.

The technique allows a Lightning node to "probe" other nodes in the network in order to find how the liquidity is distributed in their payment channels.

### How Probing Works

Let us suppose that Alice and Bob have a 1 BTC capacity channel. The attacker sends a payment of 1 BTC to Bob with an invalid payment hash. There are two possible scenarios:

- If the attacker receives an "insufficient balance error," they now know that Alice does not have 1 BTC outbound liquidity, so they could try again with smaller amounts until they receive an "unknown payment hash error."

Through this process, the attacker can discover that Alice's local balance is at least 0.5 BTC and less than 0.75. Since the total capacity has to be 1 BTC, the attacker can also infer Bob's local balance.

### Network-Wide Probing

The attacker can probe all the nodes in the network to discover how the liquidity is distributed over the network at a specific time. They can keep doing this periodically and compare each network snapshot to see where liquidity flowed.

The bright side is that, as the network scales, this attack becomes more difficult and expensive to achieve, as more nodes will have to be probed in the same amount of time.

---

## Multi-Path Payments (MPP)

Uncorrelatable payment hashes and some timing delays are not enough to break routing analysis completely. To improve assumptions that could be made about where a payment came from or where it is going, Multi-Path Payments are needed and it should be done with more randomness.

### Single Payment Analysis

In a basic payment flow through 4 routing nodes to pay a 100 sat invoice, routing through 4 hops on the Lightning Network should be able to provide pretty good source and destination anonymity at the surface level. However, if the first hop and the last hop are the same actors, they have a strong indication the payment flowed through their nodes.

Fee calculations are built into the public gossip layer of the Lightning Network, so it is not far off to believe that they can be reverse calculated to find all possible routes that a payment took.

### Multi-Path Payment Analysis

With MPP, we can improve the visibility that an observer had insights into by splitting up the payment into multiple shards. All major implementations of the Lightning Network support this.

Instead of "how many ~100 sat payments did an observer's nodes route?" becomes "how many 50 sat pieces did an observer's nodes route?" Effectively multiplying each payment part's anonymity set by a possible 2-10+, depending on how common amounts might be more frequent by more participants splitting their payments into common smaller denominations.

### Complex MPP

Splitting the payments into smaller denominations, even despite taking similar paths for some of the parts, complicates the analysis that can be done. Since there are many low-valued sat parts flowing around, if more of the network did this then it would increase the anonymity set even more.

While the example uses 10/20/30 sat parts to convey the message simply, in reality, these should be small random amount sats to remove the fee analysis concerns.

---

## Longer Paths

Evaluating the optimal amount of hops that a sender should route through to seek privacy has been discussed before by Lightning privacy researchers. All public nodes are typically within 10-20 hops of each other, with 20 hops being the current max that is supported.

Therefore, since most nodes are within 9 hops of each other, going beyond this number should be able to provide enough of an anonymity set to avoid being suspected of being in a specific area of the Lightning graph, assuming that HTLC, amount, and timing correlation of multiple nodes under the control of a single actor is not at play.

However, based on the "routing concerns today" section above, it is known that single or double hop routes significantly degrade the anonymity set of the sender and receiver and in some cases can be guaranteed to identify accurately.

---

## Tradeoffs

The negatives and tradeoffs of the improvements above will decrease the user experience, increase the amount of failed payments, increase the time it takes for a payment to be completed, and increase the fees that senders are required to pay. However, this should be part of the equation when network participants are using Lightning today for users to make that conscious choice.

---

## References

- [Lightning Privacy - Routing Analysis](https://lightningprivacy.com/en/routing-analysis)
- [Suredbits PTLCs Introduction](https://blog.suredbits.com/an-introduction-to-ptlcs-point-time-locked-contracts/)
- ["Counting Down Thunder" - Timing Analysis](https://github.com/tnull/counting-down-thunder)
