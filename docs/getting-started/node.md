---
description: Learn why running a Bitcoin node improves privacy and how to connect your wallet to your own node
---

# Running Your Own Node

A Bitcoin [node](../glossary.md#node) is a computer that runs Bitcoin software to validate transactions and blocks. Running your own node is one of the most important privacy steps you can take.

---

## What Is a Node?

A Bitcoin node downloads every transaction and block, checks them against the rules of the Bitcoin protocol, and relays valid data to other nodes. It is your personal, independent verifier of Bitcoin truth.

!!! tip "Don't Trust, Verify"

    When you use someone else's node (through a wallet that connects to a third-party server), that server can:

    - See which addresses you are interested in
    - Link your IP address and location to those addresses
    - Lie to you about your balance
    - Withhold transaction information
    - Track your financial activity

    When you run your own node, you verify everything yourself. No one can lie to you.

---

## Why Run a Node for Privacy?

=== "Without a Node"

    When you use a wallet that connects to a public server:

    1. Your wallet sends your addresses to the server
    2. The server sees your IP address
    3. The server can build a profile of your activity
    4. The server could be logging everything

=== "With a Node"

    When you connect your wallet to your own node:

    1. Your wallet queries your own server
    2. No third party sees your addresses
    3. Your IP is not logged
    4. No one is logging your activity

---

## How to Get a Node

=== "Plug and Play Solutions"

    Pre-built devices that run a node with minimal setup. Just plug in and go.

    The best plug and play nodes are from [Start9](https://start9.com) and [Umbrel](https://umbrel.com).

=== "DIY Solutions"

    If you want to be fully sovereign you will want to build your own node from scratch.

    A full walkthough of this is availiable [here](https://www.youtube.com/playlist?list=PLCRbH-IWlcW0g0HCrtI06_ZdVVolUWr39) presented by K3tan on YouTube.

---

## Connecting Your Wallet to Your Node

Once your node is running, you can connect your wallet to it:

=== "Sparrow Wallet"

    1. Open Sparrow Wallet
    2. Go to Preferences > Server
    3. Enter your node's IP address and port (usually 50001 for Electrum)
    4. Test the connection
    5. Save and restart

=== "BlueWallet"

    1. Open BlueWallet
    2. Go to Settings > Network
    3. Enter your node's Electrum server address
    4. Test and save

---

## Running a Node Over Tor

For maximum privacy, run your node over [Tor](../glossary.md#tor) so your IP address is not visible to the Bitcoin network.

!!! tip "Tor Benefits"

    - Hides your IP from peers
    - Prevents ISP from seeing Bitcoin traffic
    - Makes it harder to target your node
    - Protects your physical location

Most plug and play nodes have tor supported out of the box.

### Why Tor Matters

When you run a node without Tor, your IP address is visible. This means:

- Other nodes know your IP address
- Your ISP can see you are running Bitcoin software
- Your physical location can be approximated from your IP

Running your node over Tor hides all of this. Your node appears to be coming from a random relay somewhere in the world, making it much harder to target.

---

## What Comes Next

Now you understand the fundamentals of using bitcoin privately here is a short summary everything we have covered so far.

[First Steps To Privacy →](first-steps.md)
