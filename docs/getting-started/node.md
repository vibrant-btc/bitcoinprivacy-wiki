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

    **Examples:**
    - **Umbrel** - Beautiful interface, app store, easy setup
    - **myNode** - Feature-rich, good for beginners
    - **Raspiblitz** - Open source, community-driven
    - **Start9** - Privacy-focused, self-sovereign

    **Pros:**
    - Easy setup
    - Beautiful interfaces
    - App ecosystems
    - Good support

    **Cons:**
    - More expensive
    - Less customizable

=== "DIY Solutions"

    Build your own node from scratch using a Raspberry Pi or old computer.

    **What you need:**
    - Mini Pc
    - 1TB+ SSD

    **Pros:**
    - Cheaper
    - Fully customizable
    - Learn more about Bitcoin

    **Cons:**
    - More technical setup
    - Requires troubleshooting skills

---

## Connecting Your Wallet to Your Node

Once your node is running, you can connect your wallet to it:

=== "Sparrow Wallet"

    1. Open Sparrow Wallet
    2. Go to Preferences > Server
    3. Enter your node's IP address and port (usually 50002 for Electrum)
    4. Test the connection
    5. Save and restart

=== "Electrum Wallet"

    1. Open Electrum
    2. Go to Network settings
    3. Uncheck "Select server automatically"
    4. Enter your node's IP and port
    5. Connect

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

Most node software (Umbrel, start9, Raspiblitz) has built-in Tor support. Enable it in settings.

### Why Tor Matters

When you run a node without Tor, your IP address is visible. This means:

- Other nodes know your IP address
- Your ISP can see you are running Bitcoin software
- Your physical location can be approximated from your IP

Running your node over Tor hides all of this. Your node appears to be coming from a random relay somewhere in the world, making it much harder to target.

---

## Node Requirements Summary

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **Storage** | 1TB SSD | 1TB+ SSD |
| **RAM** | 4GB | 12GB+ |
| **Internet** | Stable broadband | Unmetered broadband |
| **Uptime** | Occasional | 24/7 preferred |
| **Power** | Standard outlet | UPS recommended |

---

## What Comes Next

Now that you have the basics set up, let's look at your privacy checklist - a quick summary of everything you should do to protect your privacy.

[Your Privacy Checklist →](checklist.md)
