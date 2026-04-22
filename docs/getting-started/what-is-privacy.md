# What is Bitcoin Privacy?

Welcome to your journey into Bitcoin privacy. This page will explain what Bitcoin is, why privacy matters, and why Bitcoin is not as private as most people think.

---

## What Is Bitcoin?

Bitcoin is a digital currency that operates without any central authority like a bank or government. It was created in 2009 by someone using the name [Satoshi Nakamoto](../glossary.md#satoshi-nakamoto). Bitcoin lets you send value directly to anyone in the world without needing a middleman.

Think of Bitcoin like digital cash. When you hand someone a banknote, you do not need a bank to approve it. The transaction just happens. Bitcoin works the same way, but digitally.

### The Public Ledger

Every Bitcoin transaction that has ever happened is recorded on a public ledger that anyone can view. This ledger is permanent - once a transaction is recorded, it cannot be changed, removed, or hidden. It will be replicated on every Bitcoin [node](../glossary.md#node) around the world for as long as Bitcoin exists.

!!! warning "The Internet Forgets, Bitcoin Does Not"

    On the internet, if you post something embarrassing, you can sometimes delete it. Articles can be updated. Tweets can be removed. The internet slowly forgets over time.

    On Bitcoin, once a transaction is confirmed, it is there **forever**. This is why getting privacy right from the start is so important. **Mistakes on Bitcoin are permanent.**

---

## Bitcoin Is Not Anonymous

Bitcoin is often described as "anonymous" or "private." Neither of these descriptions is entirely accurate. Bitcoin is **pseudo-anonymous**, which means that while your real-world identity is not directly attached to your transactions, it is possible to link your identity to your Bitcoin activity through various methods.

Your Bitcoin [addresses](../glossary.md#address) look like random strings of characters, such as:

```
bc1qelem0ann687r2e9jax542lja7q8cu8s35h96pc
```

There is nothing in this address that says "this belongs to John Smith." However, there are many ways your identity can become linked to it.

---

## How Identities Get Linked to Addresses

<div class="grid cards" markdown>

-   :material-bank:{ .lg .middle } __KYC Exchanges__

    ---

    When you create an account on a regulated exchange, you provide your name, address, photo ID, and sometimes even a selfie. The exchange knows exactly who you are. When you withdraw bitcoin, they know which address you withdrew to. They have now linked your real identity to that Bitcoin address.

-   :material-ip-network:{ .lg .middle } __IP Addresses__

    ---

    When your [wallet](../glossary.md#wallet) connects to the Bitcoin network through someone else's server, that server can see your IP address and which addresses you are querying. Your IP address can often be linked to your physical location and your internet service provider account.

-   :material-web:{ .lg .middle } __Public Activity__

    ---

    If you post your Bitcoin address on a public website, link it to your social media, use it for a public donation page, or give it to a business that knows your identity, you have created a link.

-   :material-repeat-variant:{ .lg .middle } __Address Reuse__

    ---

    If you use the same Bitcoin address multiple times, anyone who learns your identity for that address can see every transaction you have ever received to it. This is why [address reuse](../glossary.md#address-reuse) is considered the number one privacy mistake.

</div>

---

## Why Privacy Matters

Privacy is recognized as a fundamental human right by the United Nations and many international bodies. Your financial information is deeply personal. Most people would not want strangers knowing:

- How much money they earn
- What they spend their money on
- Who they pay and who pays them
- How much they have saved
- Their spending patterns and habits

### The $5 Wrench Attack

!!! quote "Physical Safety"

    There is a famous joke in Bitcoin: "Bitcoin can be stolen with a $5 wrench." This refers to the fact that if someone knows you own a lot of bitcoin, they might try to physically force you to hand it over.

    **Keeping your bitcoin holdings private is not just about digital privacy - it is about physical safety.**

### Your Employer Could See Your Income

If your employer knows your Bitcoin address, they could see exactly how much you earn and how you spend it. This could affect your negotiating position, your job security, or your personal relationships.

### Chain Analysis Companies

Companies like **Chainalysis**, **Elliptic**, and **CipherTrace** (owned by Mastercard) exist specifically to link Bitcoin addresses to real identities. They use sophisticated software to analyze the blockchain and apply various assumptions to cluster addresses together. Their clients include law enforcement agencies, governments, and financial institutions.

---

## Privacy vs Anonymity

It is important to understand the difference:

| | Anonymity | Privacy |
|---|---|---|
| **Definition** | Nobody can tell who you are at all | You can choose who sees what information |
| **Bitcoin** | Bitcoin does not provide this | Bitcoin provides the tools for this |
| **Example** | Cash transactions in person | Using [CoinJoin](../glossary.md#coinjoin) to break transaction links |

Bitcoin does not give you anonymity. It gives you the **tools for privacy** - the ability to selectively reveal information about yourself while keeping other information hidden.

---

## Bitcoin Privacy Is Not Hopeless

While Bitcoin is not private by default, it is not hard to make it private. The tools and techniques exist. The knowledge exists. What is required is a willingness to learn and apply these techniques correctly.

This site will guide you through everything you need to know, from the absolute basics to advanced techniques. You do not need to implement every privacy measure from day one. Start with the fundamentals, and build your knowledge over time.

---

## What Comes Next

Now that you understand why privacy matters, the next step is to understand how Bitcoin actually works under the hood. The key concept is called [UTXOs](utxos.md) - and understanding them is the foundation of all Bitcoin privacy.

[Understanding UTXOs →](utxos.md)
