---
description: Learn how to build a simple Bitcoin privacy threat model so you can choose the right privacy tools without trying to do everything at once.
---

# Threat Modeling

A threat model is a simple plan for thinking about privacy. It helps you answer three questions:

1. **What am I trying to protect?**
2. **Who am I trying to protect it from?**
3. **What trade-offs am I willing to make?**

You do not need to hide from everyone in the world. You need to understand your own situation and choose tools that match it.

!!! tip "Privacy Is Personal"

    A journalist, a shop owner, a teenager saving sats, a public donation project, and a long-term holder all have different privacy needs.

    The right privacy setup is the one that fits your real life, not the one that looks most extreme.

---

## Why Threat Modeling Matters

Bitcoin privacy can feel overwhelming because there are many tools: [CoinJoin](../glossary.md#coinjoin), [PayJoin](../glossary.md#payjoin-p2ep), [Stonewall](../glossary.md#stonewall), [Lightning](../glossary.md#lightning-network), [Tor](../glossary.md#tor), [BIP47](../glossary.md#bip-bitcoin-improvement-proposal), and [Silent Payments](../glossary.md#silent-payments).

A threat model helps you avoid two common mistakes:

- **Doing too little** because you do not know where to start
- **Trying to do everything** and making mistakes because the setup is too complex

Good privacy is built in layers. Start with the biggest risks first.

---

## Step 1: What Are You Protecting?

First, decide what information you want to keep private.

<div class="grid cards" markdown>

-   :material-wallet:{ .lg .middle } __Your Balance__

    ---

    You may not want others to know how much bitcoin you own.

-   :material-account-eye:{ .lg .middle } __Your Identity__

    ---

    You may not want your real name linked to your addresses or transactions.

-   :material-swap-horizontal:{ .lg .middle } __Your Payments__

    ---

    You may not want others to know who you pay or who pays you.

-   :material-map-marker:{ .lg .middle } __Your Location__

    ---

    You may not want your IP address or physical location connected to your Bitcoin activity.

-   :material-briefcase:{ .lg .middle } __Your Business Activity__

    ---

    If you accept payments publicly, you may not want competitors or strangers to see your income.

-   :material-shield-alert:{ .lg .middle } __Your Safety__

    ---

    If people know you own a lot of bitcoin, you may become a target for theft or coercion.

</div>

---

## Step 2: Who Are You Protecting Against?

Different adversaries have different powers. You do not defend against all of them in the same way.

| Adversary | What they may see | Main defenses |
|---|---|---|
| A stranger using a block explorer | Public addresses and transactions | Avoid [address reuse](../glossary.md#address-reuse), use fresh addresses, use public receiving tools |
| A KYC exchange | Your identity, withdrawals, deposits | Avoid unnecessary KYC, separate KYC and non-KYC funds |
| A wallet server | Your IP address and queried addresses | Run your own [node](../glossary.md#node), use [Tor](../glossary.md#tor) |
| Chain analysis companies | Transaction graph patterns and heuristics | Use [coin control](../glossary.md#coin-control), [CoinJoin](../glossary.md#coinjoin), [PayJoin](../glossary.md#payjoin-p2ep) |
| A payment recipient | The UTXO you spent and sometimes your change | Use good coin control, PayJoin, Stonewall, or Lightning |
| A public observer of your donation page | All payments to a reused address | Use [BIP47](../techniques/address-reuse/bip47.md), [Silent Payments](../techniques/address-reuse/silent-payments.md), BOLT12, or fresh invoices |

!!! warning "You Cannot Defend Against What You Do Not Notice"

    Most Bitcoin privacy leaks happen quietly. You may not feel like anything went wrong when you reuse an address, consolidate UTXOs, or query your wallet through a third-party server.

    The damage appears later when those links are combined.

---

## Step 3: Choose Your Privacy Level

Most people fit into one of these levels.

=== "Basic"

    This is for people who want better privacy without making Bitcoin difficult to use.

    Do this:

    - Use a non-custodial wallet like sparrow
    - Never reuse addresses
    - Label your [UTXOs](../glossary.md#utxo)
    - Do not mix KYC and non-KYC funds
    - Ideally run your own node
    - Use [coin control](../techniques/coin-control.md) before spending

=== "Intermediate"

    This is for people who want stronger privacy and are willing to learn more.

    Add this:

    - Run your own node
    - Use Tor for wallet connections
    - Use [BIP47](../techniques/address-reuse/bip47.md) or [Silent Payments](../techniques/address-reuse/silent-payments.md) for public receiving
    - Use [PayJoin](../techniques/payjoin.md) when available
    - Use [CoinJoin](../techniques/coinjoin/index.md) before privacy-sensitive spending
    - Learn [post-mix best practices](../techniques/post-mix.md)

=== "Advanced"

    This is for people with higher-risk situations or strong privacy requirements.

    Add this only after understanding the basics:

    - Separate wallets by identity and purpose
    - Use dedicated privacy wallets
    - Self-host more infrastructure
    - Use CoinJoin with strict post-mix discipline
    - Use collaborative spending tools when possible
    - Avoid linking public identities, IP addresses, and on-chain activity

---

## Step 4: Match Tools to Problems

Use the simplest tool that solves the problem you actually have.

| Problem | Tool to consider |
|---|---|
| You need to receive publicly | [Public Receiving](../techniques/public-receiving.md) |
| You keep accidentally linking UTXOs | [Coin Control](../techniques/coin-control.md) |
| You want to break historical links | [CoinJoin](../techniques/coinjoin/index.md) |
| You are spending to a competent business | [PayJoin](../techniques/payjoin.md) |
| You are spending post-mix | [Post-Mix Best Practices](../techniques/post-mix.md) |
| You need small payments | [Lightning](../lightning/basics.md) |
| You need help choosing | [Privacy Tools Decision Tree](../techniques/decision-tree.md) |

---

## Step 5: Think About Trade-Offs

Every privacy tool has trade-offs.

| Trade-off | What it means |
|---|---|
| Privacy vs convenience | Stronger privacy often requires more steps |
| Privacy vs fees | Some tools create larger or extra transactions |
| Privacy vs speed | Waiting can improve privacy, but slows you down |
| Privacy vs complexity | Complex setups can cause mistakes if you do not understand them |
| Privacy vs liquidity | Some tools need other users or available routing capacity |

!!! tip "Do Not Let Perfect Stop Good"

    You do not need perfect privacy to improve. Never reusing addresses, using coin control, and keeping funds separated already puts you ahead of most users.

---

## Example Threat Models

=== "Beginner saving bitcoin"

    Main risks:

    - KYC exchange knows purchases
    - Wallet leaks addresses to third-party servers
    - Accidental UTXO consolidation

    Good first steps:

    - Move funds to a wallet you control
    - Label UTXOs
    - Avoid address reuse
    - Connect to your own node when ready

=== "Public donation project"

    Main risks:

    - Reused donation address reveals all income
    - Public funds get linked to private savings
    - Donor activity becomes visible

    Good first steps:

    - Use BIP47, Silent Payments, BOLT12, or fresh invoices
    - Keep donation funds in a separate wallet
    - Label incoming payments
    - Avoid sweeping everything into personal savings

=== "Privacy-sensitive spender"

    Main risks:

    - Recipient sees too much wallet history
    - Change output is identified
    - Post-mix UTXOs get consolidated

    Good first steps:

    - Use coin control
    - Use PayJoin when available
    - Use Stonewall if PayJoin is not available
    - Spend post-mix UTXOs independently

---

## Key Takeaways

1. A threat model helps you choose the right privacy tools
2. Start by deciding what you want to protect
3. Identify who you are protecting it from
4. Use the simplest tool that solves your real problem
5. Strong privacy is built slowly, with good habits

---

## What Comes Next

Now that you understand how to think about your own privacy needs, the next step is to understand [UTXOs](../glossary.md#utxo) - the individual pieces of bitcoin your wallet spends.

[Understanding UTXOs →](utxos.md)
