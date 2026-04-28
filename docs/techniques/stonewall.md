---
description: Learn how Stonewall creates CoinJoin-like transactions solo to break heuristics and add plausible deniability
---

# Stonewall

[Stonewall](../glossary.md#stonewall) is a privacy technique that creates a transaction indistinguishable from a [CoinJoin](../glossary.md#coinjoin), but performed by a single user. It is designed to break the [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) by creating false ambiguity.

---

## What Is Stonewall?

Stonewall is a method of creating a transaction with a **minimum of 2 inputs** and exactly 4 outputs, where 2 of the outputs are equal in value. This structure mimics the appearance of a 2-party CoinJoin, making it difficult for chain analysis to determine which inputs belong to which outputs.

!!! tip "The Key Idea"

    A normal transaction with 2 inputs and 2 outputs clearly shows the sender is combining their own UTXOs. A Stonewall transaction looks like a CoinJoin between two parties, creating plausible deniability about who owns what.

---

## Stonewall Transaction Example

The image below shows a Stonewall transaction as analyzed by [am-i.exposed](https://am-i.exposed). Notice the 4 outputs with 2 being equal-value outputs, which mimics the appearance of a 2-party CoinJoin.

![Stonewall transaction scanned by am-i.exposed](../images/stonewall.png){ loading=lazy }

---

## How Stonewall Works

=== "Step 1: Create Two Inputs"

    The user selects two UTXOs from their wallet to use as inputs.

=== "Step 2: Create Four Outputs"

    The transaction has 4 outputs:
    - 2 outputs of equal value (the "CoinJoin" outputs)
    - 2 outputs of different values (change and payment)

=== "Step 3: Broadcast"

    The transaction is broadcast to the network. To an observer, it looks like a 2-party CoinJoin.

---

## Stonewall vs CoinJoin

| Feature | Stonewall | CoinJoin |
|---------|-----------|----------|
| **Parties** | 1 (appears as 2) | 5+ |
| **Privacy Gain** | Moderate | High |
| **Fees** | Higher (4 outputs) | Shared |
| **Speed** | Instant | Queue required |
| **Best For** | Quick privacy boost | Serious mixing |

---

## What's the Difference Between Stonewall and Stonewall x2?

The key difference is whether you're working alone or with a helper. Let's break down both versions.

### Solo Stonewall

In a solo [Stonewall](../glossary.md#stonewall), you are the only participant. You combine two of your own [UTXOs](../glossary.md#utxo) as inputs and create four outputs. Even though there's only one person involved, the transaction is built to look like a two-party [CoinJoin](../glossary.md#coinjoin). All the inputs belong to you, and you receive three outputs back (two change outputs plus the payment).

### Stonewall x2: How Collaborative Stonewall Works

Stonewall x2 brings in a second person — a collaborator — who helps you boost your privacy. This person is not the one you're paying, and they're not receiving any payment themselves. They simply contribute one of their own UTXOs to the transaction and get their full amount back at the end. For them, it's a neutral action (aside from sharing a small portion of the mining fees).

There are three roles in a Stonewall x2:

- **The issuer** — the person making the actual payment
- **The recipient** — the person receiving the payment (who may not even know a Stonewall is happening)
- **The collaborator** — a friend or trusted community member who adds their own UTXO to the mix, creating extra confusion for anyone watching

#### A Concrete Example

Imagine Maya wants to send 12,000 [sats](../glossary.md#satoshi-sat) to her friend Leo for concert tickets. Leo doesn't support [PayJoin](../glossary.md#payjoin-p2ep), so Maya decides to use Stonewall x2 instead. She asks her friend Zara to help.

Here's what happens:

- Maya contributes one input of 20,000 sats
- Zara contributes one input of 18,000 sats

The transaction creates four outputs:

1. **12,000 sats to Leo** — this is the actual payment for the tickets
2. **8,000 sats back to Maya** — this is her change (20,000 minus the 12,000 she spent)
3. **10,000 sats back to Zara** — part of her change
4. **8,000 sats back to Zara** — the rest of her change

Zara receives a total of 18,000 sats across two outputs — exactly the same amount she put in. Nothing was taken from her. She simply helped Maya add confusion to the transaction, and in return she pays a small share of the mining fee.

From the blockchain, this looks like a 2-party CoinJoin with 2 inputs and 4 outputs. But in reality, only one output was an actual payment. The rest is just change bouncing around.

!!! tip "The Collaborator Gets Nothing Back... And That's the Point"

    Zara ends up with exactly what she started with. She didn't lose money, she didn't gain money. She just helped create a transaction that's much harder to analyze.

### Pattern Indistinguishability: Why Both Versions Look the Same

Here's the really clever part: from the perspective of someone watching the blockchain, a solo Stonewall and a Stonewall x2 look **exactly identical**. Both have:

- 2 inputs
- 4 outputs
- 2 outputs of equal value

This matters a lot. Even if a chain analyst spots the "Stonewall pattern" on the blockchain, they still can't figure out:

- **Which of the two equal outputs is the real payment** — one is the payment, the other is just a decoy going back to the collaborator (or the sender in solo mode)
- **Whether the two inputs came from two different people or one person** — they can't tell if this was a collaborative Stonewall x2 or a solo Stonewall where someone just combined their own UTXOs

This adds a second layer of plausible deniability on top of the already confusing structure. Not only is it unclear who paid whom, it's not even clear how many people were actually involved.

!!! tip "Same Structure, Different Reality"

    Both solo Stonewall and Stonewall x2 produce the exact same on-chain fingerprint. The difference — whether you worked alone or with a collaborator — is completely invisible to outside observers. This uncertainty is what makes the technique so powerful.

---

## Why Use a Stonewall Transaction?

Stonewall adds significant entropy to the transaction and confuses chain-analysis heuristics. From the outside, it can be misinterpreted as a small two-party coinjoin. In reality, it's a payment with a collaborator who remains net-neutral (in the x2 case) or a solo transaction designed to look like one.

Even if the observer identifies the Stonewall x2 pattern, they cannot know:

- Which of the two equal-amount outputs is the payment
- Whether Maya or Zara made the payment
- Whether the two inputs came from two different people or one person combining UTXOs

Because Stonewall solo and Stonewall x2 collaborative share the same pattern, distinguishing them without extra context is impossible, adding more doubt to the spend.

!!! info "The Ambiguity Is the Privacy"

    The ambiguity about who paid and who contributed which inputs/outputs is the privacy benefit.

---

## How to Do a Stonewall Transaction in Ashigaru

Stonewall was originally developed by the Samourai Wallet team and is now implemented in Ashigaru, the fork created after the Samourai developers' arrest.

Unlike Stowaway or Stonewall x2, Cahoots, Stonewall does not require PayNyms. It can be executed directly, without preparation or collaboration.

In practice, you don't need a guide just to make Stonewall - Ashigaru generates Stonewall automatically for each spend when your wallet has sufficient UTXOs.

1. Tap the `+` in the bottom-right, then select `Send`
2. Choose the account to spend from
3. Enter the transaction details: recipient address and amount to send, then press the arrow to confirm
4. You can adjust default fees for current network conditions. The most interesting element here is the transaction type: Ashigaru automatically selects `STONEWALL` when possible
5. Tap `PREVIEW` for more details - you'll see the Stonewall pattern: 2 inputs of equal amount, 2 outputs of equal amount, plus change outputs
6. If you prefer a simple payment, tap the pencil icon top-right, then switch `STONEWALL` to `Simple`
7. After checking all details, slide the green arrow at the bottom to sign and broadcast

---

## Recommended Usage Hierarchy: Which Privacy Technique Should You Use?

Not all privacy techniques are created equal. When you're about to make a payment, here's a simple decision tree to help you pick the best option available:

### 1. First Choice: [PayJoin & Stowaway](payjoin.md)

If the merchant or service you're paying supports PayJoin, always use it. PayJoin is the strongest option because it involves the actual recipient in the collaborative transaction. This means the person receiving your payment also contributes an input, which [poisons the Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) at its core. Chain analysts can't even be sure which input was the payment and which was the recipient's contribution.

PayJoin v2 (BIP77) is making this easier than ever, since it no longer requires the receiver to run a live server.

### 2. Second Choice: Stonewall x2 (Collaborative)

If the merchant doesn't support PayJoin, your next best option is to find a collaborator — a friend, a community member, or someone in a privacy-focused group — and do a Stonewall x2 together. This adds real collaborative confusion because a third party's UTXO is mixed into the transaction. The collaborator doesn't lose or gain anything; they just help create ambiguity.

This is better than solo Stonewall because there genuinely are two different people involved, which makes the [anonymity set](../glossary.md#anonymity-set) more credible.

### 3. Third Choice: Solo Stonewall

If you can't find a collaborator, a solo Stonewall is still a solid choice. Even though you're working alone, the transaction still mimics the Stonewall x2 pattern from the outside — 2 inputs, 4 outputs, 2 equal outputs. Anyone looking at the blockchain can't tell the difference between a solo Stonewall and a collaborative one.

Solo Stonewall provides slightly less privacy than the collaborative version, but it's still far better than a normal transaction that clearly shows all inputs belonging to one person.

### Why This Order?

Each step down this hierarchy gives you a bit less privacy, but every option is still better than a plain transaction. The hierarchy exists because:

- **PayJoin** involves the actual recipient, making the confusion part of the real payment
- **Stonewall x2** involves a real second person, making the collaboration genuine
- **Solo Stonewall** fakes the appearance of collaboration, which still works because observers can't tell the difference

!!! tip "Something Is Better Than Nothing"

    Even a solo Stonewall is a meaningful privacy improvement over a normal transaction. Don't let the perfect be the enemy of the good.

---

## Stonewall Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use Sparrow Wallet__

    ---

    Sparrow Wallet has built-in Stonewall support. It makes creating Stonewall transactions easy.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Route your Stonewall transaction through Tor to hide your IP address.

-   :material-hand-back-right-off:{ .lg .middle } __Do Not Overuse__

    ---

    If every transaction you make is a Stonewall, it becomes a fingerprint. Use it strategically.

-   :material-shield-check:{ .lg .middle } __Combine with Other Techniques__

    ---

    Stonewall works best when combined with good address hygiene and coin control.

</div>

---

## Common Stonewall Mistakes

=== "Using Stonewall for Every Transaction"

    If every transaction you make has the Stonewall structure, it becomes a wallet fingerprint. Use it strategically.

=== "Not Using Tor"

    Without Tor, your IP is exposed and the Stonewall can be linked to you.

=== "Poor UTXO Selection"

    Make sure the inputs you use for Stonewall are not already linked together. Otherwise, you are just consolidating.
