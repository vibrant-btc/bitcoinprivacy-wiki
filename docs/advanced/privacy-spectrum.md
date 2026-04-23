---
description: Understand the Bitcoin privacy spectrum
---

# The Privacy Spectrum

Bitcoin privacy is not a binary state. It exists on a spectrum, ranging from completely public to maximally private. Understanding where you fall on this spectrum helps you assess your privacy posture and identify areas for improvement.

---

## The Privacy Spectrum Levels

=== "Level 0: Fully Public"

    **Characteristics:**
    - All bitcoin held on KYC exchanges
    - Address reuse everywhere
    - Public donation addresses
    - No privacy tools used
    - All transactions visible on-chain

    **Risk:** Maximum exposure. Anyone can see your entire Bitcoin history.

=== "Level 1: Basic Hygiene"

    **Characteristics:**
    - Self-custody wallet
    - Fresh addresses for each receive
    - No address reuse
    - Basic coin control
    - Still using KYC bitcoin

    **Risk:** Reduced but still significant. KYC anchor point remains.

=== "Level 2: Intermediate Privacy"

    **Characteristics:**
    - Non-KYC bitcoin acquisition
    - Running own node
    - Tor for Bitcoin activity
    - Good coin control practices
    - Hardware wallet for cold storage

    **Risk:** Moderate. Good foundation but still traceable.

=== "Level 3: Advanced Privacy"

    **Characteristics:**
    - CoinJoin usage (Whirlpool, JoinMarket)
    - PayJoin for spending
    - Multiple rounds of mixing
    - Good post-mix practices
    - Compartmentalized identities

    **Risk:** Low. Significant privacy achieved.

=== "Level 4: Expert Privacy"

    **Characteristics:**
    - Self-hosted infrastructure
    - Regular privacy auditing
    - BIP47 or Silent Payments
    - Lightning for spending

    **Risk:** Very low. Strong privacy against most adversaries.

=== "Level 5: Maximum Privacy"

    **Characteristics:**
    - GrapheneOS or similar hardened OS
    - Tor for all internet activity
    - Air-gapped cold storage
    - Regular CoinJoin with large anonymity sets
    - Complete identity compartmentalization
    - Legal structures for holdings
    - Disaster recovery plan

    **Risk:** Minimal. Only state-level adversaries could potentially deanonymize.

---

## Where Do You Fall?

To assess your current privacy level, consider:

1. **How did you acquire your bitcoin?** (KYC vs non-KYC)
2. **Where do you store it?** (Exchange vs self-custody)
3. **Do you reuse addresses?** (Yes vs no)
4. **Do you run your own node?** (Yes vs no)
5. **Do you use CoinJoin?** (Yes vs no)
6. **Do you use Tor?** (Yes vs no)
7. **Do you practice good coin control?** (Yes vs no)
8. **Do you use PayJoin?** (Yes vs no)
9. **Do you use reusable payment codes?** (Yes vs no)
10. **Do you audit your privacy regularly?** (Yes vs no)

---

## Moving Up the Spectrum

You do not need to jump from Level 0 to Level 5 overnight. Privacy is built in layers:

<div class="grid cards" markdown>

-   :material-step-forward:{ .lg .middle } __Start with the Basics__

    ---

    Move to self-custody, stop reusing addresses, learn about UTXOs.

-   :material-step-forward-2:{ .lg .middle } __Add Intermediate Layers__

    ---

    Run your own node, use Tor, acquire non-KYC bitcoin.

-   :material-shield-lock:{ .lg .middle } __Add Advanced Techniques__

    ---

    Use CoinJoin, PayJoin, practice good post-mix hygiene.

-   :material-shield-check:{ .lg .middle } __Master OPSEC__

    ---

    Multisig, air-gapped signing, self-hosted infrastructure, regular auditing.

</div>

---

## The Threat Model Question

Your ideal privacy level depends on your threat model:

| Threat Model | Recommended Level |
|-------------|-------------------|
| **Casual observer** | Level 1-2 |
| **Chain analysis company** | Level 3 |
| **Determined adversary** | Level 4 |
| **State-level adversary** | Level 5 |

