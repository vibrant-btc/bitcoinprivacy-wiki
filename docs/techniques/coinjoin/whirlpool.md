---
description: Learn about Whirlpool CoinJoin, its 5-party fixed denomination model, and how to manage post-mix UTXOs safely
---

# Whirlpool

[Whirlpool](../../glossary.md#whirlpool) is a [CoinJoin](../../glossary.md#coinjoin) implementation originally developed by [Samourai Wallet](../../glossary.md#samourai-wallet). It uses a 5-party model with fixed denominations to create privacy on the Bitcoin blockchain.

!!! info "Other CoinJoin Implementations"

    Whirlpool is one of several CoinJoin implementations. Others include [JoinMarket](joinmarket.md) (decentralized, [maker](../../glossary.md#maker)-[taker](../../glossary.md#taker) model) and [Wasabi Wallet](wasabi.md) ([WabiSabi](../../glossary.md#wabisabi) protocol, 20+ participants). Each has different trade-offs in terms of privacy, convenience, and censorship resistance.

---

## What Is Whirlpool?

Whirlpool is a CoinJoin protocol where *usually* exactly 5 participants come together to mix their bitcoin. Each participant contributes one input of a specific denomination and receives one output of the same denomination.

!!! tip "How It Works"

    Example: 5 users each contribute 0.1 BTC. The coordinator combines all 5 inputs and creates 5 outputs of 0.1 BTC each. An outside observer cannot tell which input funded which output.

---

## Whirlpool Transaction Example

The image below shows a Whirlpool CoinJoin transaction as visualised by [am-i.exposed](../../advanced/check-privacy.md). Notice the beautiful 5 equal outputs at a fixed denomination, the signature pattern of Whirlpool.

![Whirlpool CoinJoin transaction scanned by am-i.exposed](../../images/whirlpool.png){ loading=lazy }

---

## Whirlpool Denominations

Whirlpool uses fixed denominations to make the CoinJoin outputs indistinguishable from each other:

| Denomination | Sats | Use Case |
|-------------|------|----------|
| **0.0005 BTC** | 50,000 | Small amounts, testing |
| **0.001 BTC** | 100,000 | Small payments |
| **0.01 BTC** | 1,000,000 | Medium amounts |
| **0.05 BTC** | 5,000,000 | Larger amounts |
| **0.5 BTC** | 50,000,000 | Large holdings |

!!! warning "Fixed Denominations Matter"

    The fixed denominations are what make Whirlpool effective. If outputs were different sizes, they could be linked to specific inputs.

---

## How Whirlpool Works

Whirlpool wallets use 4 distinct accounts to support the coinjoin process:

| Account | Index | Purpose |
|---------|-------|---------|
| **Deposit** | `0'` | Where you receive unmixed bitcoin |
| **Premix** | `2147483645'` | [UTXOs](../../glossary.md#utxo) waiting to enter a round |
| **Postmix** | `2147483646'` | Mixed UTXOs after completing rounds |
| **Bad Bank** | `2147483644'` | [Doxxic change](../../glossary.md#doxxic-change) from Tx0 transactions |

### Whirlpool Tx0 and CoinJoin Flow

=== "Step 1: Create the Tx0"

    When you initiate a mix, your wallet creates a Tx0 transaction. This transaction takes your deposit UTXO(s) and splits them into equal-sized premix outputs. Any leftover bitcoin becomes **[doxxic change](../../glossary.md#doxxic-change)**.

=== "Step 2: Enter the Queue"

    Your premix UTXOs enter the queue. When 5 participants are ready, the CoinJoin round executes.

=== "Step 3: Complete the Mix"

    Once the round completes, you receive post-mix outputs of the same denomination. These UTXOs have been mixed with 4 other participants.

=== "Step 4: Remix"

    Post-mix UTXOs can automatically enter additional rounds (remixes) to increase your [anonymity set](../../glossary.md#anonymity-set). Each remix costs no additional service or mining fees.

---

## Whirlpool Fees

Whirlpool charges a coordinator fee for each Tx0. Remixes cost nothing extra - no additional service or mining fees.

| Denomination | Fee |
|-------------|-----|
| 0.0005 BTC | 0.000005 BTC (1%) |
| 0.001 BTC | 0.00001 BTC (1%) |
| 0.01 BTC | 0.0001 BTC (1%) |
| 0.05 BTC | 0.0005 BTC (1%) |
| 0.5 BTC | 0.005 BTC (1%) |

---

## Spending the Doxxic Change

Remember: Whirlpool's model equalizes coins in the Tx0 before entering pools, which makes tracking harder. This is the most effective coinjoin model, but it has a drawback: a change output that does not go through the coinjoin process, we call this **[doxxic change](../../glossary.md#doxxic-change)**.

This change output is created for each Tx0. It is isolated in a specific account named `Doxxic Change` or `Bad Bank` depending on the software to avoid using it with your other [UTXOs](../../glossary.md#utxo). This point is critical: these UTXOs have not been mixed - their traceability links remain intact and can compromise your privacy by tying you to your coinjoin activity. Handle them carefully and never use them with other UTXOs, mixed or not. **Combining a toxic UTXO with a mixed UTXO destroys all privacy gains from coinjoins.**

Currently, Ashigaru does not provide direct access to the `Doxxic Change` account, at least it wasn't found at the time of writing. This feature will likely be added in a future update. In the meantime, the only way to retrieve these funds is to import your seed into Sparrow Wallet. Sparrow usually auto-detects a Whirlpool wallet and gives access to all four accounts, including `Doxxic Change`. You can then spend those UTXOs like regular bitcoin from Sparrow.

Here are several possible strategies to handle coinjoin change UTXOs without compromising your privacy:

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Mix Them in Smaller Pools__

    ---

    If a toxic UTXO is large enough for a smaller pool, this is often the best option. Do not merge multiple toxic UTXOs to reach the threshold - that would link your entries.

-   :material-lock:{ .lg .middle } __Mark Them as Unspendable__

    ---

    Another cautious approach is to keep them in their separate account and not touch them to avoid accidental spending. If BTC appreciates, new pools may become available for their size.

-   :material-gift:{ .lg .middle } __Donate Them__

    ---

    You can donate toxic UTXOs to Bitcoin developers, open-source projects, or nonprofits that accept BTC. This disposes of them usefully while supporting the ecosystem.

-   :material-card-account-details:{ .lg .middle } __Buy Gift Cards or Prepaid Cards__

    ---

    Platforms like [Bitrefill](https://www.bitrefill.com/) allow exchanging bitcoin for gift cards or reloadable Visa cards. This can be a simple, discreet way to spend toxic UTXOs. But be aware that these UTXOs are still linked to their previous history so be careful which ones you spend.

-   :material-swap-horizontal:{ .lg .middle } __Swap Them for Monero__

    ---

    Samourai Wallet previously offered atomic BTC/XMR swaps, now discontinued. This service exists in [Eigen Wallet](https://eigenwallet.org/). You can isolate these UTXOs, convert to XMR, then back to BTC if desired. This method can be costly and depends on available liquidity. Also consider whether you want to potentially risk a UTXO that may be associated with you being given to a third party who can do whatever they want with it.

-   :material-lightning-bolt:{ .lg .middle } __Open a Lightning Channel__

    ---

    Transferring toxic UTXOs to LN to benefit from lower transaction fees can be useful. However, this may leak information depending on your LN usage, so proceed carefully.

</div>

!!! danger "Handle Doxxic Change Carefully"

    Carefully consider what you want to do with your doxxic change, always proceed carefully.

---

## How to Manage Postmix

After several coinjoin cycles, the best strategy is to keep [UTXOs](../../glossary.md#utxo) in the `Postmix` account, letting them remix indefinitely until you actually need to spend them.

Some users prefer moving mixed BTC to a hardware wallet. This is possible, but it requires discipline to avoid compromising privacy gains from coinjoins.

=== "Never Merge Mixed and Unmixed UTXOs"

    The most common mistake is merging UTXOs. Never combine mixed UTXOs with unmixed UTXOs in the same transaction, or you risk creating links via the [CIOH](../../glossary.md#cioh). This means rigorous UTXO management is key - clear and precise labeling is essential. In general, UTXO merging is risky and often leads to privacy loss when done poorly.

=== "Be Careful with Consolidation"

    Be careful with consolidation of mixed UTXOs with each other, too. Limited consolidation may be acceptable if UTXOs have large anonsets, but it inevitably reduces your privacy. Avoid large or rushed consolidations before sufficient remixes, as they can create deducible links between your coins before and after mixing. When in doubt, do not consolidate postmix UTXOs. Instead, transfer them one by one to your hardware wallet, generating a fresh receiving address each time. Label every transferred UTXO carefully.

=== "Avoid Minority Script Types"

    It is strongly discouraged to move postmix UTXOs into wallets using minority [script types](../../glossary.md#script-type). For example, if you participated in Whirlpool from a multisig `P2WSH` wallet, few users share that script type. Sending postmix UTXOs back to the same script greatly reduces your [anonymity set](../../glossary.md#anonymity-set). Beyond script type, other [wallet fingerprints](../../glossary.md#wallet-fingerprint) can harm your privacy. The safest option is to spend from the Ashigaru app.

=== "Never Reuse Addresses"

    Finally, as with any Bitcoin usage, never reuse a receiving address. Each payment should go to a fresh, unused address.

The simplest and safest method remains: keep mixed UTXOs resting in `Postmix`, let them remix naturally, and spend only when needed from Ashigaru.

Ashigaru and Sparrow include additional protections against common [chain analysis](../../glossary.md#chain-analysis) pitfalls, helping you preserve transaction privacy.

!!! warning "Postmix Best Practices"

    Avoid merging mixed and unmixed UTXOs; prefer spending from Postmix directly; don't reuse addresses; and be cautious with script types and consolidations.

---

## Whirlpool Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Do Multiple Rounds__

    ---

    One round gives you 5 possible interpretations. Multiple rounds multiply your anonymity set.

-   :material-timer:{ .lg .middle } __Wait Between Rounds__

    ---

    Do not do all your rounds in quick succession. Wait hours or days between rounds.

-   :material-hand-back-right-off:{ .lg .middle } __Never Spend Post-Mix Together__

    ---

    Each post-mix output should be spent independently. Never combine them.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Always route Whirlpool through Tor. Samourai Wallet supports this natively.

-   :material-label:{ .lg .middle } __Label Your Outputs__

    ---

    Keep track of which UTXOs are post-mix. Never mix them with premix.

-   :material-shield-check:{ .lg .middle } __Use Sparrow for Desktop__

    ---

    Sparrow Wallet has built-in Whirlpool support for desktop users.

</div>

---

## Whirlpool and Ashigaru

[Ashigaru](https://ashigaru.rs) is now the primary wallet for Whirlpool. It provides all the features originally offered by Samourai Wallet when combined with Ashigaru Terminal:

- **Deposit**: Where you deposit Bitcoin before initiating a Tx0
- **Premix**: Where you hold bitcoin before mixing
- **Post-mix**: Where you receive mixed bitcoin
- **Bad Bank**: A pool of post-mix UTXOs that have been through many rounds

Ashigaru continues to be actively maintained by an anonymous team committed to Bitcoin privacy and user sovereignty.

!!! info "Whirlpool Is Now Done via Ashigaru"

    [Ashigaru](https://ashigaru.rs) is a Bitcoin wallet that continues the Samourai Wallet project in a new form. In April 2024, the founders of Samourai Wallet were arrested by American authorities and their servers were seized. While the original Samourai app remained usable, it is no longer maintained.

    Ashigaru is a free, open-source fork maintained by an anonymous team to preserve Samourai's functionality and original philosophy: defending the privacy and sovereignty of Bitcoin users. All Whirlpool CoinJoin features are now accessed through Ashigaru.

    Excellent guides on using Ashigaru Whirlpool from [Loïc Morel](https://github.com/LoicPandul) can be found on [planb academy](https://planb.academy/en/tutorials/privacy).

---

## Common Whirlpool Mistakes

=== "Spending Post-Mix UTXOs Together"

    This is the single most damaging mistake. It completely destroys the forward looking anonset you could achieve.

=== "Doing Only One Round"

    One round is enough to break deterministic links, multiple rounds are free and increase the forward looking anonset.

=== "Mixing KYC and Non-KYC"

    Do not mix KYC bitcoin with non-KYC bitcoin in Whirlpool. Keep them separate.

=== "Consolidating Pre-Mix UTXOs"

    Combining multiple pre-mix UTXOs in a single transaction links those UTXOs, even though they are CoinJoined after there is a record on the permanent blockchain stating that those UTXOs likely had the same owner.
