---
description: Learn how to verify your Bitcoin privacy using am-i.exposed and other privacy scanning tools
---

# Checking Your Privacy

After applying privacy techniques, it is important to verify that they actually worked. Tools like am-i.exposed help you check your on-chain privacy.

---

## [am-i.exposed](https://am-i.exposed)

am-i.exposed is an open-source, client-side Bitcoin privacy scanner. Paste a Bitcoin address, transaction ID, xpub/descriptor, or unsigned PSBT and get a privacy score from 0-100.

=== "How It Works"

    1. Paste a Bitcoin address or transaction ID
    2. Your browser fetches transaction data from the mempool.space API
    3. 31 heuristics, 14 chain analysis modules, and entity matching run client-side
    4. Boltzmann entropy is computed on-device
    5. You get a privacy score, letter grade, detailed findings, and actionable recommendations

=== "Privacy Score Grades"

    | Grade | Score | Meaning |
    |-------|-------|---------|
    | A+ | 90-100 | Excellent - you know what you are doing |
    | B | 75-89 | Good - minor issues |
    | C | 50-74 | Fair - notable concerns |
    | D | 25-49 | Poor - significant exposure |
    | F | 0-24 | Critical - you might as well use Venmo |

=== "What It Checks"

    - Round amount detection
    - Change detection
    - Common Input Ownership
    - CoinJoin detection (Whirlpool, Wasabi, JoinMarket)
    - Post-mix analysis
    - Address reuse
    - UTXO analysis
    - Dust detection
    - Wallet fingerprinting
    - Peel chain detection
    - Entity detection (exchanges, mixers, darknet)
    - And many more

---

## Privacy Warning

!!! warning "Your Queries Are Not Fully Private"

    Analysis runs client-side, but your browser makes API requests to mempool.space. Their servers can see your IP address and which addresses/transactions you look up.

    **For stronger privacy:**
    - Use Tor Browser - the tool auto-detects Tor and routes API requests through the mempool.space .onion endpoint
    - Use a trusted, no-log VPN
    - Wait before querying a recent transaction (timing correlation is a real risk)
    - Self-host with your own mempool.space instance

---

## Self-Hosting am-i.exposed

Self-hosting software manually is one of those things that sounds more intimidating than it really is. The actual work is usually quite ordinary: read the project, understand what it expects, wire a few containers together, and stop pretending you need an app store for every new app.

That is especially true for [am-i.exposed](https://am-i.exposed/), which is not some sprawling service with ten moving parts and a mystery control plane hidden somewhere behind the curtain. If you already run your own Bitcoin node and your own mempool.space instance, hosting this application yourself is very manageable.

In this guide, I am going to assume two things are already true:

- you already run a Bitcoin node elsewhere;
- you already run a working [mempool.space](https://mempool.space/) stack elsewhere.

You have two choices here: use the prebuilt images, or clone the repo and build it yourself for more sovereignty.

!!! info "A Quick Note on Self-Hosted Mempool Backends"

    It is worth mentioning one caveat from the project documentation: not every self-hosted mempool stack behaves exactly like the public hosted instance and may produce incorrect results.

    The documentation notes that if you want the closest behaviour, you should prefer using mempool with fulcrum over electrs to get the closest experience to using the public mempool.space website (which uses mempool/electrs on the backend).

---

## Option 1: Use the Prebuilt Images

This is the easiest manual path if you do not want to build anything locally.

The deployment documentation in the [am-i.exposed repository](https://github.com/Copexit/am-i-exposed) shows that the project publishes two relevant images:

- `ghcr.io/copexit/am-i-exposed-umbrel`
- `ghcr.io/copexit/am-i-exposed-tor-proxy`

Despite the naming, you do not need to run Umbrel itself to use them. You can run the same images with plain Docker Compose, as long as you provide the expected environment variables.

### Create a Directory for Your Deployment

On your server, create a dedicated directory for this stack:

```bash
mkdir -p ~/am-i-exposed
cd ~/am-i-exposed
```

Then create a `docker-compose.yml` file like this:

```yaml
services:
  web:
    image: ghcr.io/copexit/am-i-exposed-umbrel:latest
    container_name: am-i-exposed-web
    restart: unless-stopped
    ports:
      - "3080:8080"
    environment:
      APP_MEMPOOL_IP: 192.168.1.50
      APP_MEMPOOL_PORT: "4080"
      APP_TOR_PROXY_IP: tor-proxy
      APP_TOR_PROXY_PORT: "3001"
      APP_MEMPOOL_HIDDEN_SERVICE: ""
    depends_on:
      - tor-proxy

  tor-proxy:
    image: ghcr.io/copexit/am-i-exposed-tor-proxy:latest
    container_name: am-i-exposed-tor-proxy
    restart: unless-stopped
    environment:
      PORT: "3001"
      TOR_PROXY_IP: 127.0.0.1
      TOR_PROXY_PORT: "9050"
```

**Environment variables explained:**

- `APP_MEMPOOL_IP` should point to the host or container name of your existing mempool backend;
- `APP_MEMPOOL_PORT` should be the HTTP port exposed by that backend;
- `APP_TOR_PROXY_IP` points to the sidecar service name, which is why `tor-proxy` works;
- `APP_TOR_PROXY_PORT` stays at `3001` unless you intentionally change the sidecar configuration;
- `APP_MEMPOOL_HIDDEN_SERVICE` can stay blank unless you specifically want to surface a hidden service hostname.

### Start the Stack Up

Start it with:

```bash
docker compose up -d
```

Then check logs if needed:

```bash
docker compose logs -f web
docker compose logs -f tor-proxy
```

At that point, the site should be available on port `3080` of your server, unless you changed the mapping.

---

## Option 2: Clone the Repo and Build It Yourself

This path is for people who would rather build the site from source and not depend on prebuilt images.

Clone the repository, add your own `docker-compose.yml` at the repo root, and let Compose build both containers locally.

### Clone the Repository

```bash
git clone https://github.com/copexit/am-i-exposed.git
cd am-i-exposed
```

### Create a Repo-Root Compose File

At the root of the cloned repo, create `docker-compose.yml` with content like this:

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.umbrel
    container_name: am-i-exposed-web
    restart: unless-stopped
    ports:
      - "3080:8080"
    environment:
      APP_MEMPOOL_IP: 192.168.1.50
      APP_MEMPOOL_PORT: "4080"
      APP_TOR_PROXY_IP: tor-proxy
      APP_TOR_PROXY_PORT: "3001"
      APP_MEMPOOL_HIDDEN_SERVICE: ""
    depends_on:
      - tor-proxy

  tor-proxy:
    build:
      context: ./umbrel/tor-proxy
    container_name: am-i-exposed-tor-proxy
    restart: unless-stopped
    environment:
      PORT: "3001"
      TOR_PROXY_IP: 127.0.0.1
      TOR_PROXY_PORT: "9050"
```

Then start it exactly as requested:

```bash
docker compose up -d --build
```

This tells Compose to:

- build the main image from the repository's main Docker build file;
- build the Tor sidecar from the repository's Tor proxy Docker build file;
- create and start both containers in the background.

### Why This Works

The build flow is straightforward: Compose builds the main image from the repo, builds the Tor sidecar, and starts both containers together.

In other words, you are not improvising some unsupported setup. You are simply using the project's own container logic outside Umbrel.

---

## Which Option Should You Choose?

=== "Use the Prebuilt Image Path If"

    - you want the simplest deployment;
    - you are comfortable trusting the published images;
    - you want faster updates with less local build time.

=== "Use the Local Build Path If"

    - you want more sovereignty over what you run;
    - you want more privacy by building from source yourself;
    - you want to inspect or modify the code before you deploy it.

Neither approach is inherently magical. One is more convenient. The other is slightly more sovereign. Pick the trade-off you actually value instead of performing ideology for strangers online.

---

## Updating the Deployment

This part matters more than people admit. Self-hosting is easy to start and boring to maintain, which is exactly why maintenance gets neglected.

The right update process depends on which option you chose.

=== "Updating a Prebuilt-Image Deployment"

    If you used published GHCR images, the workflow is simple:

    ```bash
    docker compose pull
    docker compose up -d
    ```

    If you want to force recreation cleanly, you can do:

    ```bash
    docker compose pull
    docker compose up -d --force-recreate
    ```

    This pulls newer tags and recreates the containers using the updated images.

    Using `latest` is fine if you want the easiest update path. If you prefer tighter control, pin a specific version tag instead and update it deliberately when you are ready.

    > `latest` is convenient. Specific version tags are more predictable. Pick the trade-off you actually want.
    {: .prompt-info }

=== "Updating a Local-Build Deployment"

    If you cloned the repo and build locally, the workflow is usually:

    ```bash
    git pull
    docker compose up -d --build
    ```

    That fetches upstream changes, rebuilds the images locally, and recreates the containers.

    If you want a slightly cleaner sequence:

    ```bash
    git pull
    docker compose build --no-cache
    docker compose up -d
    ```

    You probably do not need `--no-cache` every single time, but it is useful when you suspect cached layers are hiding a change.

---

## Final Thoughts

There is nothing exotic about hosting [am-i.exposed](https://am-i.exposed/) yourself. It is a small web app, a connection to your mempool backend, and a Tor sidecar. That is all very manageable.

If you want the fastest path, use the prebuilt images.
If you want the most independent path, clone the repo and build it yourself.

Both approaches are valid. The only bad option is pretending you need a branded dashboard to run software that is already simple enough to understand on its own.

---

## Other Tools

=== "OXT.me (Offline Since April 2024)"

    Was the gold standard for Boltzmann entropy analysis. Created by LaurentMT as part of OXT Research. Shut down following the arrest of Samourai Wallet developers.

=== "KYCP.org (Offline Since April 2024)"

    "Know Your Coin Privacy" - Focused on CoinJoin analysis and post-mix privacy assessment. Also shut down after the Samourai arrests.
