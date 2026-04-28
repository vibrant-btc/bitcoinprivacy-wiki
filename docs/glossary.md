---
description: Comprehensive terminology reference for Bitcoin privacy concepts.
---

# Glossary

## A

<a id="address"></a>
!!! info "Address"

    A bitcoin address—also called bitcoin invoice address—is a string of characters that you send to someone else to receive funds.

    There are currently four invoice address formats in use:

    - **P2PKH** starting with `1`
    - **P2SH** starting with `3`
    - **Bech32** starting with `bc1q`
    - **Taproot (Bech32m)** starting with `bc1p`

<a id="address-reuse"></a>
!!! warning "Address Reuse"

    Address reuse refers to the practice of reusing a single bitcoin invoice address for multiple transactions. It is highly discouraged since it harms the privacy of yourself and others. You should never reuse addresses.

<a id="air-gapped"></a>
!!! info "Air-Gapped"

    A device that has never been connected to the internet. Air-gapped devices are used for signing transactions securely, as they cannot be remotely compromised. Hardware wallets like Passport and Coldcard support air-gapped operation.

<a id="anonymity-set"></a>
!!! tip "Anonymity Set"

    The only way to hide in plain sight is by hiding in a crowd. The anonymity set is simply the size of this crowd.

    If you are putting on a hat and sunglasses to hide in a crowd of people that are wearing the same hat and sunglasses, your anonymity set is the size of this crowd. If said crowd is 50 people, an attacker could mistake you for anyone out of these 50 people. Similarly, when doing a collaborative transaction in bitcoin, you are creating an onchain footprint that is equivalent to the onchain footprint of others.

<a id="ashigaru-wallet"></a>
!!! info "Ashigaru Wallet"

    A fork of Samourai Wallet created after the Samourai developers' arrest. Inherits all of Samourai's privacy features including Whirlpool, Stowaway, Stonewall, and Ricochet.

<a id="azteco"></a>
!!! info "Azteco"

    A Bitcoin voucher service that allows you to buy bitcoin without KYC using cash or other methods.

---

## B

<a id="base-layer"></a>
!!! info "Base Layer"

    Bitcoin's base layer (or *Layer 1*) refers to any transaction that touches the timechain, i.e. all onchain transactions. The base layer is concerned with global consensus and settlement.

    Higher layers build ontop the settlement assurances of the base layer. One example of a *Layer 2* system is the Lightning Network.

!!! info "Batch Transaction"

    A batch transaction is a transaction that combines multiple real-world transactions into one on-chain transaction. It has multiple inputs and multiple outputs. Different parties may control one or multiple inputs and receive one or multiple outputs.

<a id="bayesian-updating"></a>
!!! info "Bayesian Updating"

    A statistical method where analysts update their probability estimates as new evidence becomes available. In chain analysis, each new heuristic or data point narrows the possibility space, making deanonymization increasingly likely over time.

!!! info "Bech32"

    Bech32 is an invoice address format. It was specified in BIP 173 and is used for both SegWit and Taproot addresses.

<a id="bip-bitcoin-improvement-proposal"></a>
!!! info "BIP (Bitcoin Improvement Proposal)"

    A design document providing information to the Bitcoin community about new features or processes. Examples include BIP47 (PayNyms), BIP78 (PayJoin), and BIP352 (Silent Payments).

<a id="bip-353"></a>
!!! info "BIP 353"

    A standard for human-readable Lightning Network payment identifiers that look like email addresses (e.g., user@domain.com). Makes it easy to share payment codes without QR codes.

<a id="bip69"></a>
!!! info "BIP69"

    A Bitcoin Improvement Proposal that specifies lexicographic ordering of transaction inputs and outputs. While intended to improve privacy by standardizing ordering, it has ironically become a [wallet fingerprint](#wallet-fingerprint) because not all wallets implement it.

!!! info "Bisq"

    A desktop P2P exchange. Fully decentralized, no central server. Tor by default. Built-in dispute resolution.

!!! info "BitBox02"

    A hardware wallet with a companion desktop app. Simple setup, automatic SD card backups. Bitcoin-only edition available.

!!! info "Bitcoin"

    A decentralized digital currency that operates without any central authority like a bank or government. Created in 2009 by someone using the name Satoshi Nakamoto. Bitcoin lets you send value directly to anyone in the world without needing a middleman.

!!! info "Bitcoin Core"

    The reference implementation of Bitcoin. Includes a full node and wallet. Most trusted and audited codebase. Requires downloading the full blockchain (600GB+).

!!! info "Block"

    A group of confirmed transactions added to the blockchain. New blocks are created approximately every 10 minutes through mining.

!!! warning "Blockchain"

    The **blockchain** is a decentralized digital ledger that records transactions across a network of computers in a secure, transparent, and tamper-resistant way. 

    Transactions are grouped into blocks, and each block is linked to the previous one using cryptographic techniques, forming a chronological chain. Once data is recorded on the blockchain, it is extremely difficult to alter, ensuring trust without the need for a central authority.

!!! info "Blockstream Green"

    A mobile wallet (iOS/Android) by blockstream, Tor support, and the ability to connect to your own node.

<a id="bloom-filter"></a>
!!! info "Bloom Filter"

    A space-efficient probabilistic data structure used by some Bitcoin wallets to query transactions from full nodes without revealing the full address. Used in BIP47 version 2 payment codes for notification detection.

<a id="boltzmann-entropy"></a>
!!! tip "Boltzmann Entropy"

    A measure of the number of possible interpretations of a Bitcoin transaction's inputs and outputs. Higher entropy means more ambiguity and better privacy. Named after physicist Ludwig Boltzmann.

<a id="actual-entropy"></a>
!!! info "Actual Entropy"

    The entropy of a transaction computed after incorporating blockchain context, such as clustering heuristics or change detection. Actual entropy is always less than or equal to [intrinsic entropy](#intrinsic-entropy) because additional information can only reduce ambiguity.

<a id="bluewallet"></a>
!!! info "BlueWallet"

    A mobile wallet (iOS/Android) focused on simplicity. Features include coin control, send to Silent Payments, and the ability to connect to your own node. No Tor support.

!!! info "Breez"

    A non-custodial Lightning wallet. Mobile-focused.

---

## C

<a id="cake-wallet"></a>
!!! info "Cake Wallet"

    A multi-cryptocurrency wallet (iOS/Android/Desktop) that supports Bitcoin, Monero, and other coins. One of the few wallets with full Silent Payments support.

<a id="chain-analysis"></a>
!!! danger "Chain Analysis"

    Chain analysis is the practice of applying heuristics to a blockchain's public transaction graph. The goal of chain analysis is to link the pseudonymous identities created by bitcoin software with "real" identities corresponding to natural persons or entities.

    Chain analysis is based on flawed assumptions, because ownership in bitcoin is defined by secret knowledge, not possession. Identities can only be linked probabilistically, not provably. One of the main assumptions used by chain analysis companies is the [common input ownership heuristic](#common-input-ownership-heuristic). Collaborative transactions break this heuristic.

<a id="change"></a>
!!! info "Change"

    When using physical cash, spending a $100 bill to pay for a $25 item, you will get $75 back in change. The reason for this is that you can't spend just a part of the bill, because ripping off a quarter of it for payment will invalidate the bill. Consequently, when bills change hands, the whole bill has to be spent, and an appropriate amount of change goes back to the spender.

    Bitcoin works the same way. When sats change hands, the spender has to spend the whole UTXO. Bitcoin creates the appropriate amount of change automatically.

<a id="change-detection"></a>
!!! warning "Change Detection"

    When it comes to chain analysis, change detection is the name of the game. The goal of chain analysis companies is to link identities to transactions, and to do that, one has to detect whether funds changed hands or not.

    Technically speaking, change detection is trying to figure out which output of a transaction is a change output. Change detection is based on various heuristics. False positives will always exist.

<a id="channel"></a>
!!! info "Channel"

    A payment link between two Lightning nodes. Each channel has a total capacity and a balance split between the two channel partners.

<a id="cioh"></a>
!!! info "CIOH"

    Short for [Common Input Ownership Heuristic](#common-input-ownership-heuristic).

<a id="coin-control"></a>
!!! tip "Coin Control"

    A wallet feature that allows manual selection of specific UTXOs as inputs for a transaction, rather than relying on the wallet's automatic selection algorithm. Essential for privacy because it prevents accidentally co-spending UTXOs from different sources, which would link them via the Common Input Ownership Heuristic.

<a id="coinjoin"></a>
!!! success "CoinJoin"

    A CoinJoin is a collaborative transaction that combines inputs from multiple parties. The purpose of a CoinJoin is to combine inputs and create outputs in ways that improves the financial privacy of participants, without relying on a trusted third party. When done correctly, a CoinJoin breaks any deterministic links between transactions, moving the process of chain analysis from quasi-deterministic with high certainty to probabilistic with low certainty.

    CoinJoins break the common input ownership heuristic that is used by chain analysis companies to de-anonymize actors. The concept was first introduced in 2011 by Bitcointalk user hashcoin, but later popularised in 2013 by Gregory Maxwell.

    All CoinJoin transactions are collaborative transactions. The three main implementations of coinjoin today are joinmarket, whirlpool and wabisabi (wasabi).

<a id="collaborative-transaction"></a>
!!! info "Collaborative Transaction"

    A collaborative transaction is a bitcoin transaction that is initiated and signed by multiple participants. A collaborative transaction involves two or more parties and is thus always a batch transaction. All CoinJoins are collaborative transactions.

<a id="common-input-ownership-heuristic"></a>
!!! danger "Common Input Ownership Heuristic"

    The common input ownership heuristic assumes that all inputs of a transaction are controlled by a single entity. This assumption is clearly wrong, because collaborative transactions exist. CoinJoin transactions are designed to break this heuristic.

!!! info "Coldcard"

    An air-gapped hardware wallet by Coinkite. Features include encrypted backups, duress attack solutions, and BIP85 support.

!!! info "Confirmation"

    A confirmation is when a transaction is included in a block. More confirmations (additional blocks built on top) make the transaction increasingly difficult to reverse.

<a id="custodial-wallet"></a>
!!! info "Custodial Wallet"

    A wallet where a third party holds your private keys. You trust the custodian to manage your funds. Examples include exchange wallets and Wallet of Satoshi. If the custodian goes bankrupt or freezes your account, you lose access to your funds.

<a id="coordinator-fee"></a>
!!! info "Coordinator Fee"

    A service fee charged by the Whirlpool coordinator for organizing and facilitating CoinJoin rounds. This fee is paid once when entering a pool and covers the infrastructure costs of running the mixing service.

<a id="cycle-priority"></a>
!!! info "Cycle Priority"

    A setting in Whirlpool that lets users choose how quickly they want their first mix to occur. Low priority uses a 24-block moving average of fee rates, normal uses 6 blocks, and high uses 2 blocks. Higher priority means faster confirmation but higher mining fees.

<a id="zerolink"></a>
!!! info "ZeroLink"

    A comprehensive mixing protocol that incorporates Chaumian coinjoins and strategies to protect users' anonymity against chain analysis. It enforces strict separation between pre-mix and post-mix UTXOs using separate wallet accounts, standardizes script types and transaction options, and prevents accidental associations between mixed and unmixed coins. Whirlpool is the only implementation that rigorously follows the ZeroLink protocol.

---

## D

<a id="deterministic-link"></a>
!!! info "Deterministic Link"

    A connection between a transaction input and output that exists in ALL possible interpretations of that transaction. Even in CoinJoin transactions, some input-output links can be deterministic, meaning the CoinJoin provides zero privacy for those specific participants.

<a id="doxxic-change"></a>
!!! warning "Doxxic Change"

    "Doxxic" change is any leftover change that is going back to you when participating in an equal-output CoinJoin. Doxxic change is problematic because it can potentially destroy any privacy benefits gained from a CoinJoin.

    The word is a combination of "toxic" and "doxxing." Doxxing is the act of finding out the legal identity (or similar identifying information) of a pseudonymous entity. Bitcoin is a pseudonymous system and does not require the *True Names* of participants.

<a id="double-spend"></a>
!!! info "Double Spend"

    An attempt to spend the same bitcoin twice. Bitcoin's consensus mechanism prevents this in various ways.

<a id="dust-attack"></a>
!!! danger "Dust Attack"

    Sending tiny amounts of Bitcoin (dust) to target addresses. If the recipient spends the dust alongside other UTXOs, the attacker can link those addresses together, mapping the victim's wallet.

---

## E

<a id="eclipse-attack"></a>
!!! warning "Eclipse Attack"

    An eclipse attack is an attack in networked systems in which an attacker targets a node to convince it of a false network state. The attacker surrounds the node in order to conceal or block off accurate information, leaving the attacked node(s) in the dark in terms of the global network state.

!!! info "Electrum"

    A long-standing desktop wallet (Mac/Windows/Linux) with extensive features including Lightning, multisig, hardware wallet support, and coin control. Can connect to your own node.

<a id="equal-output-coinjoin"></a>
!!! info "Equal-Output CoinJoin"

    An equal-output CoinJoin is a collaborative transaction that produces outputs of equal denomination, i.e. outputs of equal value when measured in sats. For this reason, these types of transactions are also referred to as equal-amount or equal-value CoinJoin transactions.

    Equal-output CoinJoins are batch transactions that are easily identifiable on-chain due to their uniform output structure.

    Like any collaborative transaction, an equal-output CoinJoin breaks the Common Input Ownership Heuristic. Participating in such a transaction allows you to gain privacy by "hiding in the crowd."

---

## F

<a id="fidelity-bond"></a>
!!! note "Fidelity Bond"

    A fidelity bond is an insurance policy which protects the policyholder from wrongful acts committed by others. In JoinMarket, a fidelity bond is a mechanism which ensures that market actors act honestly. It is a protection mechanism against Sybil attacks, because a fidelity bond makes the creation of cryptographic identities costly.

<a id="fungibility"></a>
!!! info "Fungibility"

    The property of a good where each unit is interchangeable with any other unit. Cash is fungible - one $10 bill is worth the same as any other. Bitcoin's fungibility can be compromised when certain coins are tainted by their history.

<a id="funding-transaction"></a>
!!! info "Funding Transaction"

    The on-chain Bitcoin transaction that locks bitcoin into a 2-of-2 multisig wallet to open a Lightning channel.

---

## H

!!! info "Halving"

    An event that occurs approximately every four years where the block reward for miners is cut in half. This reduces the rate at which new bitcoin is created.

<a id="hd-wallet-hierarchical-deterministic"></a>
!!! info "HD Wallet (Hierarchical Deterministic)"

    A wallet that generates a new address for each transaction from a single seed phrase. Avoids address reuse by default. Defined in BIP32/BIP44.

<a id="heuristic"></a>
!!! info "Heuristic"

    A rule-of-thumb or assumption used to infer information about a Bitcoin transaction. Privacy scanners apply dozens of heuristics to estimate what surveillance firms can deduce about any transaction or address.

!!! info "Hodl Hodl"

    A non-custodial P2P exchange. No KYC required. Wide range of payment methods. Global availability.

<a id="htlc"></a>
!!! info "HTLC (Hashed Time-Locked Contract)"

    The mechanism that enables multi-hop routing on the Lightning Network. It ensures that either the payment completes all the way through the route, or it fails entirely and all funds are returned.

---

## I

<a id="invoice"></a>
!!! info "Invoice"

    A Lightning Network payment request containing the recipient's node ID, payment amount, payment hash, and expiry time.

<a id="intrinsic-entropy"></a>
!!! info "Intrinsic Entropy"

    The entropy of a transaction computed in isolation, with no outside information. This is the raw privacy the transaction structure provides based solely on its inputs, outputs, and values. Compare with [actual entropy](#actual-entropy).

---

## J

!!! success "JoinMarket"

    A decentralized CoinJoin implementation using a maker-taker model. Makers offer liquidity and earn fees; takers pay for privacy. Creates transactions with varied input/output counts. Tumbler must be used for a taker to gain any privacy.

---

## K

<a id="kyc-know-your-customer"></a>
!!! danger "KYC (Know Your Customer)"

    Identity verification required by regulated financial institutions. KYC exchanges collect your name, address, photo ID, and link it to your Bitcoin addresses.

---

## L

<a id="lightning-network"></a>
!!! info "Lightning Network"

    A Layer 2 payment protocol built on top of Bitcoin. It enables fast, 'low-cost' transactions by creating payment channels between users that settle on the Bitcoin blockchain only when opened or closed.

<a id="link-probability"></a>
!!! info "Link Probability"

    The probability that a specific input funded a specific output in a transaction, computed by counting how many valid interpretations contain that link and dividing by the total number of interpretations. See also [Link Probability Matrix](#link-probability-matrix).

<a id="link-probability-matrix"></a>
!!! info "Link Probability Matrix (LPM)"

    A table showing the link probability for every input-output pair in a transaction. Rows represent inputs, columns represent outputs. Each cell shows the probability that the row's input funded the column's output. A cell value of 1.0 (100%) indicates a [deterministic link](#deterministic-link).

<a id="liquidity"></a>
!!! info "Liquidity"

    The amount of bitcoin available in a Lightning channel for sending. If a channel has 0.5 BTC on your side, you can send up to 0.5 BTC through that channel.

<a id="lnproxy"></a>
!!! info "lnproxy"

    A simple Lightning Network privacy tool that acts as a proxy between sender and receiver. Instead of paying an original invoice directly, you pay a "proxy invoice" generated by an lnproxy relay, which then pays the original invoice. This hides the sender's and receiver's node IDs from each other.

<a id="low-r-signature"></a>
!!! info "Low-R Signature"

    A technique where Bitcoin Core grinds the ECDSA nonce to produce signatures where the R value is in the lower half of the curve order. This produces 71-byte signatures instead of 72-byte, saving 1 byte per input. It is a distinctive [wallet fingerprint](#wallet-fingerprint).

<a id="lsp"></a>
!!! info "LSP (Lightning Service Provider)"

    A Lightning node that provides connectivity and routing services to other nodes, particularly mobile wallets that maintain a single connection. Examples include Acinq and Zeus.

---

## M

<a id="maker"></a>
!!! info "Maker"

    A market maker is someone who offers bitcoin liquidity to the market, to be used by others.

<a id="mempool"></a>
!!! info "Mempool"

    Short for "memory pool." A pool of valid bitcoin transactions held by each node that are not yet confirmed in a block. Transactions wait here until a miner includes them.

!!! info "Mining"

    The process of creating new blocks by solving complex mathematical puzzles. Miners are rewarded with newly created bitcoin and transaction fees.

<a id="multisig-multi-signature"></a>
!!! info "Multisig (Multi-Signature)"

    A spending condition requiring M of N private keys to authorize a transaction (e.g., 2-of-3). Used for shared custody, escrow, and enhanced security.

!!! info "Muun"

    A non-custodial Lightning wallet that combines on-chain and Lightning in a single interface.

!!! info "myNode"

    A plug-and-play node solution that is feature-rich and good for beginners.

---

## N

<a id="nlocktime"></a>
!!! info "nLockTime"

    A transaction field that specifies the earliest block height or timestamp at which a transaction can be mined. Bitcoin Core sets this to the current block height as an anti-fee-sniping measure, which becomes a [wallet fingerprint](#wallet-fingerprint).

<a id="node"></a>
!!! info "Node"

    A computer running Bitcoin software that validates transactions and blocks. Running your own node allows you to verify incoming transactions independently without trusting anyone else.

<a id="node-id"></a>
!!! info "Node ID"

    A public identifier for a Lightning Network node. Everyone with access to an invoice can discover the associated node ID.

<a id="nsequence"></a>
!!! info "nSequence"

    A per-input field that encodes RBF and timelock information. Different wallets set different default nSequence values, making it a [wallet fingerprint](#wallet-fingerprint) signal.

!!! info "Non-Custodial Wallet"

    A wallet where you hold your own private keys. You have full control over your funds. Examples include Sparrow, Samourai, BlueWallet, and Ashigaru.

<a id="np-hard"></a>
!!! info "NP-Hard"

    A classification from computer science describing problems that are computationally difficult to solve. NP-hard problems have no known efficient algorithm - as the problem size grows, the time required grows extremely fast (often exponentially). Finding all valid interpretations for a transaction with mixed values is NP-hard, which is why tools like am-i.exposed use optimized algorithms and timeouts.

---

## O

!!! info "Offchain"

    An offchain (or off-chain) transaction is any transaction that does not happen onchain. Examples include transactions on the Lightning network, the handing over of physical private keys, as well as transactions on centralized ledgers such as exchanges and other trusted third parties.

<a id="onchain"></a>
!!! warning "Onchain"

    An onchain (or on-chain) transaction is a bitcoin transaction that is settled on the bitcoin timechain. The analysis of these transactions is called chain analysis, which is the spying on and de-anonymizing of bitcoin's users by trying to find patterns in the onchain data.

<a id="onion-messaging"></a>
!!! info "Onion Messaging"

    An encrypted messaging system on the Lightning Network that routes messages through nodes, similar to how payments are routed. Used by BOLT12 offers.

<a id="op_return"></a>
!!! note "OP_RETURN"

    A Bitcoin script opcode that embeds arbitrary data in the blockchain. Can leak metadata like timestamps, protocol identifiers, or messages that fingerprint the transaction.

---

## P

<a id="p2pkh"></a>
!!! info "P2PKH"

    Short for pay-to-public-key-hash. Legacy address format starting with `1`.

!!! info "P2SH"

    Short for pay-to-script-hash. Address format starting with `3`. Used for multisig and other complex scripts.

!!! info "Passport"

    An air-gapped hardware wallet by Foundation. Uses QR codes for PSBT communication. Fully open sourced firmware and hardware.

<a id="payjoin-p2ep"></a>
!!! success "PayJoin (P2EP)"

    A PayJoin is a collaborative transaction between two parties that facilitates an actual payment for a good or service. The merchant agrees to provide one or multiple inputs to the transaction, increasing the privacy of both parties.

    A PayJoin has different onchain characteristics than an equal-output CoinJoin and is not detectable via chain analysis alone. A PayJoin transaction has multiple interpretations, all of which are equally valid. Due to it breaking the common input ownership heuristic it poisons the basis of all chain analysis.

!!! tip "PayJoin v2 (BIP77)"

    The asynchronous, serverless version of the PayJoin protocol defined in BIP77. Unlike PayJoin v1 which required the receiver to run a server and respond in real time, v2 uses a relay directory so sender and receiver do not need to be online simultaneously.

<a id="paynym"></a>
!!! info "PayNym"

    A user-friendly identity layer built on BIP47 reusable payment codes. Allows receiving Bitcoin without revealing addresses publicly. Used by Samourai, Ashigaru and Sparrow wallets.

!!! info "Peach Bitcoin"

    A mobile-first P2P exchange. No KYC required. Wide range of payment methods.

<a id="peel-chain"></a>
!!! warning "Peel Chain"

    A pattern where a large UTXO is repeatedly spent, peeling off small payments and returning the remainder as change. Creates a traceable chain of decreasing outputs. Chain analysts use this to track funds across many transactions.

<a id="payment-hash"></a>
!!! info "Payment Hash"

    A cryptographic hash used to route Lightning payments. The same payment hash is used across all hops in an HTLC payment.

!!! info "Phoenix"

    A non-custodial Lightning wallet. Uses liquidity service providers for Lightning channels.

<a id="private-channel"></a>
!!! info "Private Channel"

    A Lightning channel that is not announced to the network through the gossip protocol. Only the two channel partners know about it.

<a id="private-key"></a>
!!! info "Private Key"

    A secret number (often represented by 12 or 24 bip-39 seed words) that allows you to spend bitcoin from a specific address. Anyone who knows your private key can spend your bitcoin. **Never share your private key with anyone.**

<a id="privacy-score"></a>
!!! tip "Privacy Score"

    A 0-100 rating computed by privacy scanners like am-i.exposed, based on heuristics.

<a id="ptlc"></a>
!!! info "PTLC (Point Time-Locked Contract)"

    An upgrade to HTLCs that uses different payment points for each hop, preventing payment correlation by nodes that control multiple hops in a route.

<a id="public-key"></a>
!!! info "Public Key"

    A cryptographic key derived from your private key, used to generate receiving addresses. It is safe to share (until the advent of sufficiently powered quantum computers).

!!! info "PSBT (Partially Signed Bitcoin Transaction)"

    A format for sharing unsigned or partially signed transactions between devices. Commonly used with air gapped hardware wallets where the unsigned transaction is sent to the device for signing, then returned.

---

## R

!!! info "Raspiblitz"

    An open source, community-driven node solution for Raspberry Pi.

!!! info "RBF (Replace-By-Fee)"

    A feature that allows you to replace an unconfirmed transaction with a new one that pays a higher fee. Useful for speeding up stuck transactions. Can be used in wallet fingerprinting.

<a id="ricochet"></a>
!!! success "Ricochet"

    A technique where you create several self-payments to your own fresh addresses to simulate a change of ownership of your bitcoin before the final spend. Provides retrospective anonymity by adding distance between a CoinJoin and the final destination.

<a id="remixer"></a>
!!! info "Remixer"

    A participant in a CoinJoin round who has already completed at least one mix and is going through another round to increase their [anonymity set](#anonymity-set). Remixers do not pay additional service or mining fees — these are covered by new entrants ([premixers](#premixer)).

<a id="premixer"></a>
!!! info "Premixer"

    A new entrant into a CoinJoin pool. Premixers are users whose coins have not yet been mixed. They pay the mining fees for the round, which also cover the costs for remixers participating in the same round.

!!! warning "Round Amount Detection"

    A heuristic that identifies round-number outputs (e.g., 0.1 BTC, 1,000,000 sats) as likely payments, with the non-round output being change. Reveals spending patterns.

---

## S

<a id="samourai-wallet"></a>
!!! info "Samourai Wallet"

    A mobile wallet (Android only) focused on maximum privacy. Features include Whirlpool CoinJoin, PayJoin (Stowaway), Ricochet, Stonewall, and PayNyms. Runs over Tor and connects to your own Dojo node. Now succeded by Ashigaru wallet.

<a id="satoshi-sat"></a>
!!! info "Satoshi (sat)"

    The smallest unit of bitcoin. There are 100,000,000 sats in 1 BTC. Named after Bitcoin's creator.

<a id="satoshi-nakamoto"></a>
!!! info "Satoshi Nakamoto"

    The pseudonymous creator (or creators) of Bitcoin. The true identity remains unknown. The smallest unit of bitcoin, one hundred millionth of a bitcoin, is called a "satoshi" in their honor.

!!! info "Scheduler"

    The 'scheduler' is a component of JoinMarket which schedules multiple collaborative transactions in a row. It will use random intervals and amounts to make timing analysis and de-anonymization via chain analysis more difficult.

<a id="script-type"></a>
!!! warning "Script Type"

    The address format used in a transaction (P2PKH, P2SH, P2WPKH, P2TR). Mixing script types in inputs or outputs can fingerprint change outputs since the change usually matches the sender's address type.

<a id="seed-phrase-recovery-phrase"></a>
!!! info "Seed Phrase (Recovery Phrase)"

    A list of 12 or 24 words that can regenerate all the private keys in your wallet. This is the most important thing to back up. Write it on paper and store it somewhere safe. Never store it digitally.

!!! info "SeedSigner"

    A DIY air-gapped hardware wallet that can be built using off the shelf parts. Minimizes supply chain attack risk. Stateless by default and excellent for privacy.

<a id="self-send-self-transfer"></a>
!!! danger "Self-send (Self-transfer)"

    A transaction where one or more outputs return to an address that was also an input. This trivially identifies the change output, revealing the sender's remaining balance and the exact payment amount.

!!! success "Silent Payments (BIP352)"

    A protocol that allows a recipient to publish a single static payment address from which senders derive unique, unlinkable Taproot (P2TR) outputs for each payment.

!!! info "SNICKER"

    Simple Non-Interactive Coinjoin with Keys for Encryption Reused.

<a id="sparrow-wallet"></a>
!!! info "Sparrow Wallet"

    A desktop wallet (Mac/Windows/Linux) focused on privacy. Features include coin control, Whirlpool integration (now removed), hardware wallet support, and detailed transaction previews. Connects to your own node via Electrum server.

<a id="steganographic-transaction"></a>
!!! info "Steganographic Transaction"

    A transaction designed to look like something it is not. Examples include PayJoin (looks like a normal payment but the receiver contributes an input), Stonewall (simulated CoinJoin from a single wallet), and Ricochet (adds intermediate hops). These exploit the fact that chain analysis relies on heuristics.

<a id="stonewall"></a>
!!! tip "Stonewall"

    A steganographic transaction format from Samourai Wallet (now Ashigaru) that mimics a CoinJoin. Has a minimum of 2 inputs and exactly 4 outputs: 2 equal-valued outputs (one real payment, one decoy) and 2 change outputs. Solo Stonewall uses only the sender's UTXOs. STONEWALLx2 involves a collaborator contributing inputs, making it indistinguishable from a genuine 2-party CoinJoin.

<a id="surge-cycle"></a>
!!! info "Surge Cycle"

    A Whirlpool CoinJoin round with more than 5 participants. Surge Cycles can include 6, 7, 8, 9, or 10 participants. They are triggered when on-chain mining fees drop after premixers have already committed to a higher fee rate, allowing the coordinator to fit more remixers into the same round without increasing costs. This increases privacy by creating more possible interpretations of the transaction.

<a id="tx0"></a>
!!! info "Tx0"

    The preparation transaction in Whirlpool. It takes a user's deposit UTXO(s) and splits them into equal-sized premix outputs matching the pool denomination. Any leftover bitcoin becomes [doxxic change](#doxxic-change). The Tx0 also pays the coordinator service fee and the one-time pool entry fee.

!!! info "Start9"

    A open source, self-sovereign node solution.

<a id="stowaway"></a>
!!! info "Stowaway"

    Ashigaru's implementation of PayJoin, designed for spending post-mix UTXOs with an extra layer of privacy.

!!! info "Submarine Swap"

    A trustless atomic exchange between on-chain Bitcoin and Lightning Network payments using Hash Time-Locked Contracts (HTLCs). Allows moving funds between layers without a trusted intermediary.

!!! warning "Sweep"

    A transaction that sends the entire balance of one or more addresses to a single output with no change. Common when migrating wallets or claiming funds. Often terrible for privacy as it may involve consolidating UTXOs

!!! danger "Sybil Attack"

    A Sybil attack is a special kind of attack in peer-to-peer networked computing. The victim is surrounded by malicious entities, each of which act as if they are a separate entity in order to gain additional information from the victim.

---

## T

!!! warning "Taint"

    "Taint" is an external property defined by chain analysis surveillance firms. It is an attempt to trace the origin and ownership of UTXOs, classifying their owners and building lists of "good" and "bad" money.

    All "taint" in bitcoin always is and always will be arbitrarily defined.

<a id="taker"></a>
!!! info "Taker"

    A market taker is someone who buys bitcoin liquidity from the market, taking up market makers on their offers.

<a id="taproot"></a>
!!! success "Taproot"

    A Bitcoin upgrade (activated November 2021) that makes complex spending conditions look like simple ones on-chain. Improves privacy by making multisig, timelocks, and scripts indistinguishable from regular payments.

!!! tip "Taproot Channels"

    Lightning Network channels that use Taproot (P2TR) outputs with MuSig2 key aggregation for the 2-of-2 funding multisig. Unlike legacy P2WSH channels, Taproot channel opens and cooperative closes are indistinguishable from regular single-signature Taproot spends on-chain.

<a id="temporal-analysis"></a>
!!! info "Temporal Analysis"

    The practice of analyzing the timing of transactions to identify patterns and link addresses. This includes studying when transactions occur, how quickly funds are spent, and whether there are regular payment patterns.

<a id="timechain"></a>
!!! info "Timechain"

    An alternative term for what is commonly called the "blockchain." It represents a timestamped and linked list of blocks.

!!! info "Timelock"

    A UTXO can be locked up by a script which defines that said UTXO can only be spent in a block that is higher than a certain blockheight. This makes UTXOs unspendable before a specific time.

<a id="tor"></a>
!!! success "Tor"

    An anonymity network that routes internet traffic through multiple relays. Privacy tools and wallets can use Tor and route requests through .onion endpoints (hiddenservices) to hide which addresses are being queried.

<a id="transaction"></a>
!!! info "Transaction"

    A bitcoin transaction describes the movement of sats. It is structured data that describes inputs and outputs, among other things. A valid bitcoin transaction has at least one input and at least one output.

!!! info "Trezor"

    A hardware wallet company.

<a id="tumbler"></a>
!!! info "Tumbler"

    A JoinMarket script that performs multiple consecutive CoinJoins with random amounts and random timing between rounds. Unlike a single CoinJoin (`sendpayment`), the tumbler is designed to achieve meaningful privacy by breaking the amount-matching analysis that can partially unmix single JoinMarket transactions. It uses random amounts, random timing delays, and multiple destination addresses to make blockchain analysis significantly more difficult.

!!! info "TX"

    Short for transaction.

---

## U

!!! info "Umbrel"

    A plug-and-play node solution with a beautiful interface and app store.

<a id="utxo"></a>
!!! tip "UTXO"

    Short for Unspent Transaction Output. The tip of the chain of signatures which originates in a coinbase output. It's a "coin" that has not yet been spent and can still be spent.

---

## W

<a id="wabisabi"></a>
!!! info "WabiSabi"

    A CoinJoin protocol used by Wasabi Wallet that allows variable-amount outputs using cryptographic credentials. Supports 20+ participants per round with flexible denomination selection.

<a id="wallet"></a>
!!! info "Wallet"

    Software or hardware that stores your private keys and allows you to send and receive bitcoin. A wallet does not actually "store" bitcoin - the bitcoin exists on the blockchain. The wallet stores the keys that prove ownership by allowing you to sped (move) UTXOs.

<a id="wallet-fingerprint"></a>
!!! warning "Wallet Fingerprint"

    Distinctive patterns left by wallet software - transaction version, locktime, sequence numbers, signature encoding - that can indicate which wallet created a transaction.

!!! info "Wallet of Satoshi"

    A custodial Lightning wallet. Simple to use but the custodian holds your keys and knows your transaction history.

<a id="whirlpool"></a>
!!! success "Whirlpool"

    A CoinJoin implementation by Samourai Wallet that creates transactions with exactly 5 equal outputs at fixed denominations (0.5, 0.05, 0.01, 0.001 BTC), achieving high entropy and strong privacy.

!!! info "Zeus"

    A non-custodial Lightning wallet that can connect to your own LND node. Supports Tor.
