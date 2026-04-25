---
description: Learn how Ricochet adds transactional distance between post-mix UTXOs and final destinations with 4-hop self-payments
---

# Ricochet

[Ricochet](../glossary.md#ricochet) is a privacy technique that adds "transactional distance" between your post-mix [UTXOs](../glossary.md#utxo) and their final destination. It does this by routing your bitcoin through several intermediate addresses before it reaches the recipient.

---

## What Is Ricochet?

Ricochet creates a chain of 4 transactions:

``` mermaid
graph LR
    A[Origin] --> B[Hop 1]
    B --> C[Hop 2]
    C --> D[Hop 3]
    D --> E[Destination]
```

!!! tip "The Key Idea"

    Each hop creates a new transaction with its own change output. This makes it much harder for chain analysis to trace the funds back to the original post-mix UTXO.

    Think of it like bouncing a ball off several walls before it reaches its target. Each bounce adds distance and makes it harder to trace the original trajectory.

---

## Understanding Ricochet

> A premium tool that adds extra hops of history to your transaction. Stump blacklists and help guard against unjust third-party account closures.

Ricochet is a technique where you create several self-payments to your own fresh addresses to simulate a change of ownership of your bitcoin before the final spend. Unlike Ashigaru's other spending tools inherited from Samourai Wallet, Ricochet does not aim for prospective anonymity; instead, it provides a form of retrospective anonymity. In practice, Ricochet blurs properties that could compromise the fungibility of a Bitcoin UTXO.

For example, if you perform a coinjoin, your postmix coin will be identifiable as having passed through a coinjoin. Chain-analysis tools can detect coinjoin patterns and tag coins that exit them. Coinjoins break historical links, but their presence is still detectable - like encrypted text: you can't read it, but it's easy to see that encryption was applied.

That coinjoin-tagged coin label can affect fungibility. Regulated entities, for example exchanges, may refuse coinjoin-sourced UTXOs, ask for explanations, or even freeze accounts or funds. In some cases, an exchange may report activity to state authorities.

Ricochet addresses this by inserting four successive self-transactions, each to a new address you control, then sending to the final destination, for example an exchange. The goal is to create distance between the original coinjoin and the final spend. This makes chain-analysis tools more likely to consider a change of ownership has occurred post-coinjoin, discouraging them from taking action against the sender.

You might ask why chain-analysis tools don't simply look beyond four hops. In practice, these companies face an optimization dilemma: they must choose a threshold for number of hops after which they assume a change of ownership likely occurred and ignore older links. Raising that threshold increases false positives exponentially - wrongly flagging people as coinjoin participants when someone else did the coinjoin earlier in the chain. Too many false positives push users to competitors and threaten long-term viability. As a result, raising the threshold is challenging; four hops is often enough to defeat their heuristics in many cases.

!!! warning "Use Ricochet Pragmatically"

    Ideally, do not send coinjoin-sourced coins to regulated entities. If you must, for example urgent fiat liquidation, Ricochet can help reduce misclassification risks.

!!! info "Ricochet Is a Pragmatic Tool"

    Ricochet is a pragmatic, retrospective privacy tool. It does not guarantee acceptance by any third party, but it commonly reduces friction with blacklist heuristics.

---

## How Ricochet Works in Ashigaru

Ricochet is simply sending bitcoin to yourself; you can simulate it manually without any specialized tool. Ashigaru, a fork of Samourai Wallet, offers a streamlined, automated Ricochet that produces clean results.

- **Service cost:** Ricochet on Ashigaru charges 100,000 sats for service fees, plus mining fees.
- **Practical use:** Best suited for larger transfers where the fee overhead is proportionally reasonable.

!!! warning "Cost Consideration"

    Because Ricochet costs 100,000 sats plus mining fees, it's recommended for significant amounts rather than small spends.

Ashigaru offers two Ricochet variants:

=== "Staggered Delivery (Reinforced Ricochet)"

    - Distributes the 100,000-sat service fee across the five successive transactions
    - Ensures each transaction is broadcast at a distinct time and confirms in a different block
    - Maximizes the appearance of ownership change for better resistance to chain analysis
    - Slower, but preferred when you're not in a hurry

=== "Classic Ricochet"

    - Executes quickly, broadcasting transactions within a short interval
    - Offers less privacy and resistance to analysis than staggered delivery
    - Use for urgent sends only

!!! tip "Choose Staggered for Best Privacy"

    Choose "staggered delivery" for best privacy; choose "Classic" only if you need speed.

---

## How to Do a Ricochet in Ashigaru

1. **Start a Send**: Tap `+` → `Send`, select the account to spend from
2. **Fill Transaction Details**: Enter the amount to send, enter the final destination address, check the `Ricochet` option
3. **Choose Ricochet Mode**: Select `Classic` (faster, lower privacy) or `Staggered Delivery` (slower, higher privacy)
4. **Review and Fee Management**: On the summary screen, review all details, adjust miner fees according to current market conditions
5. **Broadcast**: Slide the green arrow to sign and broadcast the Ricochet sequence
6. **Wait**: Ricochet will automatically manage the sequence of hops. If you chose staggered delivery, allow time for each hop to confirm in a separate block.
7. **Confirm Success**: Wait for final delivery confirmation

---

## Why Ricochet Is Powerful

=== "Breaking the Link"

    After a CoinJoin, your post-mix UTXOs are private but still traceable backward through the CoinJoin. Ricochet adds multiple hops between the post-mix and the final destination, making it much harder to trace.

=== "Creating Change Outputs"

    Each hop creates a new change output. This means chain analysis must figure out which output is the payment and which is the change at each hop.

=== "Adding Time Distance"

    The 4 transactions take time to confirm. This temporal distance makes it harder to link the origin to the destination.

---

## Ricochet Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use After Whirlpool__

    ---

    Ricochet is designed to be used after Whirlpool CoinJoin. It adds an extra layer of privacy to your post-mix spending.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Always route Ricochet through Tor. Samourai Wallet supports this natively.

-   :material-clock:{ .lg .middle } __Be Patient__

    ---

    Ricochet takes time because 4 transactions need to confirm. Do not rush it.

-   :material-hand-back-right-off:{ .lg .middle } __Use One Post-Mix UTXO__

    ---

    Each Ricochet should use only one post-mix UTXO. Never combine post-mix outputs.

</div>

---

## Ricochet vs Other Techniques

| Feature | Ricochet | Stowaway | Regular PayJoin |
|---------|----------|----------|-----------------|
| **Hops** | 4 transactions | 1 transaction | 1 transaction |
| **Privacy Level** | Very High | High | Medium-High |
| **Speed** | Slow (4 confirmations) | Fast | Fast |
| **Best For** | Maximum privacy | Post-mix spending | General spending |
| **Fees** | Higher (4 transactions) | Normal | Normal |

---

## Common Ricochet Mistakes

=== "Using Ricochet for Non-Post-Mix UTXOs"

    Ricochet is designed for post-mix spending. For regular spending, use PayJoin or Stonewall.

=== "Not Using Tor"

    Without Tor, your Ricochet transactions can be linked to your IP address.

=== "Combining Post-Mix UTXOs"

    Never spend more than one post-mix UTXO in a Ricochet. This re-links your mixed outputs.
