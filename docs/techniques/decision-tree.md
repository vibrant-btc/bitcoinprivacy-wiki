---
description: A simple decision tree for choosing Bitcoin privacy tools like CoinJoin, PayJoin, Stonewall, Ricochet, BIP47, Silent Payments, Lightning, and lnproxy.
---

# Privacy Tools Decision Tree

Bitcoin privacy tools solve different problems. The hard part for beginners is knowing which tool to use and when.

This page gives you a simple decision tree. Start with what you are trying to do, then choose the tool that fits.

!!! tip "No Tool Fixes Everything"

    Privacy is built in layers. A tool that is good for receiving may not be good for spending. A tool that hides payment history may not hide your IP address. Use the right tool for the right problem.

---

## Quick Decision Tree

``` mermaid
graph TD
    A[What are you trying to do?] --> B[Receive publicly]
    A --> C[Spend on-chain]
    A --> D[Break old transaction links]
    A --> E[Recieve via Lightning privately]

    B --> B1[Use BIP47 PayNyms, Silent Payments or BTCPay Server]
    C --> C1[Does recipient support PayJoin?]
    C1 -->|Yes| C2[Use PayJoin or Stowaway]
    C1 -->|No| C3[Use Stonewall if available]
    D --> D1[Use CoinJoin]
    E --> E1[Consider lnproxy or Bolt12 invoices]
```

---

## If You Are Receiving Publicly

Use this when you need to publish something people can pay repeatedly.

| Situation | Tool |
|---|---|
| Public donations, creator tips, project funding | [BIP47 PayNyms](address-reuse/bip47.md) or [Silent Payments](address-reuse/silent-payments.md) |
| Small tips or casual payments | [Lightning](../lightning/basics.md) |
| One private payment from one person | Fresh normal address |

!!! danger "Do Not Publish One Normal Address Forever"

    A normal Bitcoin address should not be used like an email address. If you publish one static address, every payment to it is linked forever.

For more detail, see [Public Receiving](public-receiving.md).

---

## If You Are Spending On-Chain

Start with the best available option.

### 1. Use PayJoin if the recipient supports it

[PayJoin](payjoin.md) lets the recipient contribute an input to the transaction. This breaks the [Common Input Ownership Heuristic](../glossary.md#common-input-ownership-heuristic) and can hide the real payment amount.

Best for:

- Paying a merchant that supports PayJoin
- Spending without creating an obvious normal payment
- Poisoning chain analysis assumptions

### 2. Use Stowaway when spending post-mix in Ashigaru

[Stowaway](../glossary.md#stowaway) is Ashigaru's PayJoin implementation. It is especially useful when spending [Whirlpool](../glossary.md#whirlpool) post-mix UTXOs.

Best for:

- Spending from post-mix
- Collaborative payments with another Ashigaru user
- Adding an extra layer after CoinJoin

### 3. Use Stonewall if PayJoin is not available

[Stonewall](stonewall.md) creates a transaction that looks like a small collaborative transaction. It gives plausible deniability when PayJoin is not available.

Best for:

- Normal on-chain spending
- Adding ambiguity without waiting for a CoinJoin round
- Spending from wallets that support Stonewall-style construction

---

## If You Need to Break Historical Links

Use [CoinJoin](coinjoin/index.md).

CoinJoin is designed to break links between your old transaction history and your future spending. It is the main tool for creating forward-looking on-chain privacy.

Best for:

- KYC bitcoin you want to spend with more future privacy
- Long-term savings before moving to cold storage
- Breaking links between old UTXOs and new UTXOs

!!! warning "CoinJoin Requires Post-Mix Discipline"

    CoinJoin is powerful, but careless spending can destroy the privacy gain. Never consolidate post-mix UTXOs unless you understand the consequences.

Read [Post-Mix Best Practices](post-mix.md) before spending mixed coins.

---

## If You Are Spending Post-Mix

Post-mix UTXOs need special care.

| Destination | Better choice |
|---|---|
| Recipient supports PayJoin or Stowaway | Use [PayJoin & Stowaway](payjoin.md) |
| Recipient does not support PayJoin | Use [Stonewall](stonewall.md) if available |
| Regulated exchange or service | Avoid if possible; if necessary, consider [Ricochet](ricochet.md) |
| Another wallet you control | Use fresh addresses and move UTXOs one at a time |

!!! danger "Never Spend Multiple Post-Mix UTXOs Together"

    Spending two or more post-mix UTXOs together can re-link them through the Common Input Ownership Heuristic.

---

## If You Need Distance From a CoinJoin

Use [Ricochet](ricochet.md) only for a specific problem: creating transactional distance between a CoinJoin and a final destination.

Best for:

- Adding hops before a final spend
- Reducing friction with simple blacklist heuristics
- Situations where you cannot avoid sending to a regulated service

Ricochet does not create the same kind of privacy as CoinJoin. It creates distance. It is a pragmatic tool, not a magic eraser.

---

## If You Are Making Small Payments

Consider [Lightning](../lightning/basics.md).

Lightning payments are not recorded on-chain one by one, which can be useful for small payments. However, Lightning has its own privacy issues, including node IDs, routing analysis, channel liquidity probing, and invoice privacy.

Best for:

- Small payments
- Fast payments
- Frequent spending
- Avoiding unnecessary on-chain transactions

Read [Lightning Privacy](../lightning/privacy.md) before assuming Lightning is perfectly private.

---

## If You Are Paying a Lightning Invoice

If you want to hide the final destination from your wallet provider or custodian, consider [lnproxy](../lightning/lnproxy.md).

Best for:

- Custodial Lightning wallet users
- Hiding the recipient node from the sender side
- Simple extra privacy without custody risk

Limitations:

- The relay sees information about the payment
- Relay fees may apply
- It does not solve every Lightning privacy problem

---

## If You Are Choosing Between Tools

| Goal | Tool |
|---|---|
| Avoid public address reuse | BIP47 or Silent Payments |
| Receive small public payments | Lightning |
| Break historical on-chain links | CoinJoin |
| Spend privately to a compatible receiver | PayJoin or Stowaway |
| Add ambiguity to a normal spend | Stonewall |
| Add distance before a final destination | Ricochet |
| Hide Lightning destination from sender-side observer | lnproxy |
| Avoid linking UTXOs by accident | Coin control |

---

## A Simple Beginner Path

If you are new, follow this order:

1. Use a wallet where you control the keys
2. Never reuse addresses
3. Learn [coin control](coin-control.md)
4. Keep KYC and non-KYC funds separate
5. Use BIP47, Silent Payments, or Lightning for public receiving
6. Use PayJoin or Stonewall when spending
7. Learn CoinJoin before making large privacy-sensitive spends
8. Learn post-mix rules before spending mixed coins

---

## Key Takeaways

1. Use BIP47 or Silent Payments for public receiving
2. Use PayJoin when the recipient supports it
3. Use CoinJoin to break historical links
4. Use Stonewall when PayJoin is not available
5. Use Ricochet only when you need transactional distance
6. Use Lightning for small payments, but understand its trade-offs
7. Use lnproxy when paying Lightning invoices through an observer you do not want to reveal the destination to

---

## Related Pages

- [Public Receiving](public-receiving.md)
- [Address Hygiene](address-reuse/index.md)
- [Coin Control](coin-control.md)
- [CoinJoin Intro](coinjoin/index.md)
- [PayJoin & Stowaway](payjoin.md)
- [Stonewall](stonewall.md)
- [Ricochet](ricochet.md)
- [Lightning Privacy](../lightning/privacy.md)
- [lnproxy](../lightning/lnproxy.md)
