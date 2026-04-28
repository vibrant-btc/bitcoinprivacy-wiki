---
description: Explore JoinMarket's decentralized maker-taker CoinJoin model and why using the tumbler script is essential for privacy
---

# JoinMarket

!!! danger "Project Archived"

    JoinMarket has been **archived as of April 27, 2026** and is no longer under active development. The official repository states: *"Since the project has not been under active development for a considerable time, it is now being archived — the code and releases will remain in place, but there will be no further updates. Do not continue to use the code without having independent confidence that it is not exploitable; something we obviously cannot guarantee."* This page is kept for educational purposes only.

JoinMarket is a peer-to-peer marketplace for CoinJoin on Bitcoin. Unlike other CoinJoin implementations that use a coordinator, JoinMarket uses a maker/taker model where participants earn fees for providing liquidity.

!!! info "Other CoinJoin Implementations"

    JoinMarket is one of several CoinJoin implementations. Others include [Whirlpool](whirlpool.md) (5-party, fixed denominations) and [Wasabi Wallet](wasabi.md) (WabiSabi protocol, 20+ participants). Each has different trade-offs in terms of privacy, convenience, and censorship resistance.

---

## What Is JoinMarket?

JoinMarket is a decentralized CoinJoin protocol where:

- **Makers** advertise their willingness to participate in CoinJoins and earn fees
- **Takers** initiate CoinJoins and pay fees to the makers

This creates a free market for CoinJoin liquidity, where anyone can earn bitcoin by helping others mix.

!!! tip "The Key Difference"

    Unlike Whirlpool or Wasabi, JoinMarket has no central coordinator. Makers and find each other through a peer-to-peer network, making it more resistant to censorship and shutdown.

---

## JoinMarket Transaction Example

The image below shows a JoinMarket CoinJoin transaction as analyzed by [am-i.exposed](https://am-i.exposed). Notice the flexible denominations (10 equal 198,732,961 sat outpus) and 9 change outputs that distinguishes JoinMarket from other CoinJoin implementations.

![JoinMarket CoinJoin transaction scanned by am-i.exposed](../../images/joinmarket.png){ loading=lazy }

---

## How JoinMarket Works

=== "Step 1: Become a Maker or Taker"

    **As a Maker:** You advertise your availability to participate in CoinJoins. You earn fees when others use your liquidity.

    **As a Taker:** You initiate a CoinJoin and pay fees to the makers who participate.

=== "Step 2: Find Counterparties"

    Makers and takers find each other through the JoinMarket network. This happens over IRC or direct connections.

=== "Step 3: Execute the CoinJoin"

    The CoinJoin is constructed with inputs from multiple parties. Each party signs only their own inputs.

=== "Step 4: Broadcast"

    Once all signatures are collected, the transaction is broadcast to the Bitcoin network.

---

## JAM: A Web Interface for JoinMarket

For a long time, JoinMarket required users to be comfortable with command-line terminals. This technical barrier kept many people away — if you are not used to typing commands into a terminal, JoinMarket simply was not accessible to you.

[JAM](https://github.com/joinmarket-webui/jam) (JoinMarket Web UI) is a newer graphical interface that changes this. It provides a point-and-click experience for JoinMarket, making it much easier for non-technical users to participate in CoinJoins. Instead of configuring scripts and running commands, you can manage your mixing through a web browser.

However, even with JAM, JoinMarket still has a steeper learning curve than alternatives like [Whirlpool](whirlpool.md). You still need to understand concepts like [maker](../../glossary.md#maker) and [taker](../../glossary.md#taker) roles, fee markets, and [UTXO](../../glossary.md#utxo) management. Whirlpool handles most of this automatically behind the scenes.

The technical barrier has historically limited JoinMarket's [liquidity](../../glossary.md#liquidity). Fewer users means fewer participants per CoinJoin, which directly reduces the [anonymity set](../../glossary.md#anonymity-set) available. JAM helps lower this barrier, but the user base is still smaller than competing solutions.

---

## JoinMarket Denominations

Unlike Whirlpool, JoinMarket does not use fixed denominations. Takers can mix any amount, and makers can set their own minimum and maximum amounts.

This flexibility is both a strength and a weakness:

**Strengths:**
- Mix any amount
- No need to split into fixed denominations
- More efficient for large amounts

**Weaknesses:**
- Outputs may not be as uniform
- Requires more careful analysis to ensure privacy

---

## Structural Weaknesses

While JoinMarket's design offers unique advantages, it also introduces some structural privacy weaknesses compared to other [CoinJoin](../../glossary.md#coinjoin) implementations like [Whirlpool](whirlpool.md).

### Output Inequality

Unlike Whirlpool, which guarantees that every output in a round is exactly the same size, JoinMarket does not enforce perfect equality between outputs. This means that in some cases, an analyst can trace a [deterministic link](../../glossary.md#deterministic-link) between a specific input and a specific output. When outputs differ even slightly, it becomes easier to match them back to their original inputs using amount-matching techniques.

### Flexible Denominations Reduce Uniformity

The ability to mix any amount sounds convenient, but it comes at a privacy cost. Fixed-denomination CoinJoins like Whirlpool produce outputs that are completely indistinguishable from one another — every output looks identical. JoinMarket's flexible model means outputs can vary in size, which requires users to do more careful analysis to make sure they are actually getting privacy. If you are not paying attention, your mixed coins might still stand out.

### No Built-In Re-Mixing Prevention

JoinMarket does not have built-in safeguards to stop already-mixed [UTXOs](../../glossary.md#utxo) from being mixed again. In other words, the software will not warn you if you accidentally put coins through a CoinJoin that have already been through one. Re-mixing the same coins wastes fees and does not meaningfully increase your [anonymity set](../../glossary.md#anonymity-set). Other implementations handle this automatically — Whirlpool, for example, separates pre-mix and post-mix coins into different accounts so this mistake cannot happen by accident.

---

## No Pre-Mix / Post-Mix Separation

One of the biggest differences between JoinMarket and [Whirlpool](whirlpool.md) is how they handle the separation of mixed and unmixed coins.

Whirlpool uses the [ZeroLink](../../glossary.md#zerolink) protocol, which enforces a strict separation between different stages of the mixing process. Whirlpool wallets use four separate accounts: **Deposit** (unmixed coins), **Premix** (coins waiting to enter a round), **Postmix** (mixed coins), and **Bad Bank** ([doxxic change](../../glossary.md#doxxic-change) from preparation transactions). This separation is built into the wallet software — you literally cannot accidentally mix a clean coin with a mixed one.

JoinMarket does not enforce this separation at all. There are no separate accounts for pre-mix and post-mix coins. Everything lives in the same wallet, and it is entirely up to the user to keep track of which coins have been mixed and which have not. If you accidentally select an unmixed UTXO alongside a mixed one in the same transaction, you instantly link your clean coins to your dirty history — destroying all the privacy you worked to achieve.

This means JoinMarket users need to be much more careful about their own [UTXO](../../glossary.md#utxo) management. The responsibility for keeping mixed and unmixed coins separate falls entirely on you, not on the wallet software. Using [coin control](../../glossary.md#coin-control) and careful labeling is essential.

---

## Why You Must Use the [Tumbler](../../glossary.md#tumbler)

!!! danger "Single CoinJoins Are Not Enough"

    **Do not use `sendpayment` for serious privacy.** A single JoinMarket CoinJoin can be partially or fully unmixed by blockchain analysis. You must use the [tumbler](../../glossary.md#tumbler) script which performs multiple consecutive CoinJoins to achieve meaningful privacy.

??? danger "Why Single CoinJoins Are Not Enough"

    **Do not use `sendpayment` for serious privacy.** A single JoinMarket CoinJoin can be partially or fully unmixed by blockchain analysis. You must use the [tumbler](../../glossary.md#tumbler) script which performs multiple consecutive CoinJoins to achieve meaningful privacy.

    ??? note "The Unmixing Problem"

        In September 2016, a researcher published a tool called "jm_unmixer" on Bitcointalk that demonstrated a serious weakness in single JoinMarket CoinJoins. The tool was able to unmix approximately 40-54% of all JoinMarket transactions, with about 1 in 4 being fully unmixed.

        [[Source: Bitcointalk Thread](https://bitcointalk.org/index.php?topic=1609980.00)]

    ??? note "How the Attack Works"

        To understand why this works, you need to understand how JoinMarket transactions are structured:

        - **[Takers](../../glossary.md#taker)** are the people who want to mix their coins. They pay fees.
        - **[Makers](../../glossary.md#maker)** are the people providing liquidity. They earn fees.

        In a JoinMarket transaction, you can identify which inputs and outputs belong to makers versus takers by matching the amounts. The CoinJoin amount (the amount being mixed) appears as equal outputs for all participants. The change outputs are different for each participant.

        Here is the key insight: **makers often reuse their outputs**. When a maker participates in one CoinJoin and then spends their output in another CoinJoin, it creates a link between the two transactions. An analyst can follow this link and identify which outputs belong to makers (who are earning fees) versus takers (who are paying for privacy).

        Once the analyst knows which outputs belong to makers, they can effectively "unmix" the transaction — identifying which output belongs to the taker. This defeats the entire purpose of using CoinJoin.

    ??? tip "Why the Tumbler Solves This"

        The [tumbler](../../glossary.md#tumbler) script in JoinMarket addresses this vulnerability by performing **multiple consecutive CoinJoins** with several important features:

        1. **Multiple Rounds**: Instead of one CoinJoin, the tumbler performs several in sequence. Each round adds another layer of ambiguity.

        2. **Random Amounts**: Each CoinJoin uses a different, randomly chosen amount. This breaks the amount-matching algorithm that the unmixing tool relies on.

        3. **Random Timing**: The tumbler waits random amounts of time between rounds. This prevents timing analysis from linking the rounds together.

        4. **Multiple Destination Addresses**: The tumbler splits your coins across multiple addresses, making it harder to track where your coins ended up.

        5. **Role Mixing**: By participating in multiple rounds, the distinction between maker and taker roles becomes blurred over time.

    ??? quote "The Bottom Line"

        JoinMarket's own developers have acknowledged this vulnerability. As waxwing (a JoinMarket developer) stated in the original thread:

        > "Of course; that's why the tumbler script exists. A single coinjoin serves only to confuse automated wallet closure analysis, and to generally improve the health of Bitcoin's privacy... Whenever possible we have tried to make this clear."

        **Always use the [tumbler](../../glossary.md#tumbler) for serious privacy.** Single CoinJoins provide a false sense of security.

---

## JoinMarket Fees

Makers set their own fees. You can view the [orderbook](https://nixbitcoin.org/orderbook/) to get an idea of the fees.

!!! tip "Earn Bitcoin as a Maker"

    If you run a maker bot, you can earn bitcoin by providing liquidity for other people's CoinJoins. This is a great way to earn bitcoin while helping others achieve privacy.

---

## JoinMarket Best Practices

<div class="grid cards" markdown>

-   :material-server:{ .lg .middle } __Run Your Own Maker Bot__

    ---

    This earns you bitcoin and helps the JoinMarket network stay healthy.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    JoinMarket supports Tor natively. Use it to hide your IP address.

-   :material-shuffle:{ .lg .middle } __Do Multiple Rounds__

    ---

    Like any CoinJoin, multiple rounds increase your anonymity set.

-   :material-hand-back-right-off:{ .lg .middle } __Never Spend Post-Mix Together__

    ---

    Each post-mix output should be spent independently.

-   :material-shield-check:{ .lg .middle } __Use a Dedicated Wallet__

    ---

    Do not mix your JoinMarket wallet with your main wallet.

-   :material-clock:{ .lg .middle } __Be Patient__

    ---

    Finding counterparties can take time. Be patient and let the network work.

</div>

---

## Liquidity and the "Sub-Niche" Problem

To understand JoinMarket's privacy limitations, it helps to think about niches within niches. Bitcoin itself is already a niche within the world of financial transactions. [CoinJoin](../../glossary.md#coinjoin) users are a sub-niche within Bitcoin — only a fraction of Bitcoin users bother with privacy tools. And JoinMarket users are an even smaller fraction of that group.

This matters because CoinJoin privacy depends on having a large pool of participants. The more people mixing, the bigger your [anonymity set](../../glossary.md#anonymity-set) and the harder it is for analysts to trace your coins. A small user base means fewer people to hide among.

JoinMarket's [maker](../../glossary.md#maker)-[taker](../../glossary.md#taker) model helps somewhat. Makers earn fees by providing liquidity, which gives people a financial reason to keep their bots running and available. This creates a self-sustaining market for mixing. But the fundamental limitation remains: there are only so many JoinMarket users, and that caps the size of the anonymity sets you can achieve.

Compare this to [Whirlpool](whirlpool.md), which benefits from a more streamlined user experience and automatic remixing, or Wasabi, which attracts users with its simple interface. These alternatives pull from the same pool of privacy-conscious Bitcoin users, further fragmenting the already small CoinJoin community.

---

## JoinMarket vs Other CoinJoin Implementations

| Feature | JoinMarket | Whirlpool | Wasabi |
|---------|-----------|-----------|--------|
| **Coordinator** | None (P2P) | Centralized | Centralized |
| **Denominations** | Flexible | Fixed | Flexible |
| **Fees** | Earn as maker | Pay coordinator | Pay coordinator |
| **Complexity** | High | Low | Medium |
| **Censorship Resistance** | High | Low | Low |
| **Anonymity Set** | Variable | 5 | 20+ |
| **Pre/Post-Mix Separation** | None (user responsibility) | Enforced by wallet | Enforced by wallet |

---

## Common JoinMarket Mistakes

=== "Not Running a Maker Bot"

    If you only use JoinMarket as a taker, you are not helping the network. Consider running a maker bot to earn fees and help others.

=== "Spending Post-Mix UTXOs Together"

    Same as any CoinJoin - never spend post-mix outputs together.

=== "Not Using Tor"

    Without Tor, your IP is exposed to other participants.

=== "Impatience"

    JoinMarket can take longer than other CoinJoin implementations. Be patient and let the network find counterparties.

=== "Mixing Pre-Mix and Post-Mix UTXOs"

    Since JoinMarket does not enforce separation between mixed and unmixed coins, it is easy to accidentally combine them in a single transaction. Always use [coin control](../../glossary.md#coin-control) to carefully select only the UTXOs you intend to spend.

=== "Re-Mixing Already Mixed Coins"

    JoinMarket will not stop you from putting mixed coins through another CoinJoin. This wastes fees and does not meaningfully improve your privacy. Keep careful track of which UTXOs have been mixed.

---

## Post-Mix Management

Like Whirlpool, JoinMarket produces post-mix UTXOs that require careful handling. The principles are the same across all CoinJoin implementations:

- **Never spend post-mix UTXOs together** - Each output should be spent independently
- **Never mix post-mix with premix** - Keep mixed and unmixed coins separate
- **Label your UTXOs** - Track which coins have been through CoinJoins
- **Avoid consolidation** - Combining post-mix UTXOs reduces your anonymity set

For detailed guidance on managing post-mix coins and handling doxxic change, see the [Whirlpool page](whirlpool.md#spending-the-doxxic-change) which covers these topics in depth.

!!! info "Post-Mix Best Practices"

    The post-mix management principles from [Whirlpool](whirlpool.md#how-to-manage-postmix) apply equally to JoinMarket. Never merge mixed and unmixed UTXOs, prefer spending from post-mix directly, don't reuse addresses, and be cautious with script types and consolidations.
