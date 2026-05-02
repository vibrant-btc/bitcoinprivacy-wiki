---
description: Learn how to self-host am-i.exposed on Umbrel, StartOS, or with Docker for more private Bitcoin transaction analysis.
---

# Self-Hosting am-i.exposed

[am-i.exposed](https://am-i.exposed/) is a Bitcoin privacy scanner. It helps you inspect a Bitcoin [address](../glossary.md#address) or [transaction](../glossary.md#transaction) and understand what [chain analysis](../glossary.md#chain-analysis) tools may be able to learn from it.

Using the public website is useful, but it is not the most private way to audit your own coins. Even when analysis happens in your browser, your browser still needs blockchain data. If that data comes from a public server, that server may see your IP address and the addresses or transactions you are checking.

Self-hosting reduces that leak. The goal is simple:

1. Run your own Bitcoin infrastructure.
2. Run your own [mempool.space](https://mempool.space/) instance.
3. Run am-i.exposed against your own mempool backend.
4. Keep your lookups on your own network where possible.

!!! warning "Prerequisite: You Need mempool.space"

    For all approaches on all platforms, having a working mempool.space instance is a prerequisite.

    In plain English: am-i.exposed needs a source of blockchain data. Your self-hosted mempool instance provides that data, so you do not need to query the public mempool.space servers for your own privacy checks.

---

## Which Method Should You Use?

| Platform | Best for | Difficulty |
|---|---|---|
| [Umbrel](#install-on-umbrel) | Easiest setup if you already use Umbrel | Easy |
| [StartOS 0.4.0](#install-on-startos-v040) | StartOS users with Marketplace support | Easy |
| [StartOS 0.3.5](#install-on-startos-v035) | Older StartOS installs that need sideloading | Medium |
| [Docker with prebuilt images](#option-1-use-prebuilt-docker-images) | Self-hosters who want a simple manual setup | Medium |
| [Docker from source](#option-2-clone-the-repository-and-build-it-yourself) | Self-hosters who want to build the app themselves | Medium |

---

## Why Self-Host?

When you paste an address or transaction into a public website, you may reveal interest in that address or transaction.

That does not always prove ownership, but repeated lookups from the same IP address can create a pattern. If you check your own wallet history using public services, you may accidentally tell those services which coins you care about.

Self-hosting helps because:

- Your am-i.exposed instance talks to your own mempool backend.
- Your lookups can stay inside your local network.
- You reduce reliance on public blockchain data providers.
- You can combine it with [Tor](../glossary.md#tor) and your own [node](../glossary.md#node) for stronger privacy.

---

## A Quick Note on Self-Hosted Mempool Backends

The am-i.exposed project documentation notes an important caveat: not every self-hosted mempool stack behaves exactly like the public hosted mempool.space instance. Some setups may produce incorrect or slightly different results.

For the closest behavior, prefer a mempool setup using **Fulcrum** over **electrs**.

??? info "What are Fulcrum and electrs?"

    Fulcrum and electrs are Electrum server implementations. An Electrum server indexes Bitcoin blockchain data so wallets and applications can ask questions like:

    - Has this address received bitcoin?
    - What transactions involve this script?
    - Is this UTXO spent or unspent?

    You do not need to understand every detail to follow this guide. The important point is that different indexing backends can behave differently, and am-i.exposed works best when your mempool backend behaves like the public mempool.space instance.

---

## Install on Umbrel

This is the easiest method. Install am-i.exposed directly on your Umbrel and it automatically connects to your local mempool instance.

### Steps

1. Open your Umbrel dashboard.
2. Go to the **App Store**.
3. Click the three-dot menu in the top right.
4. Select **Community App Stores**.
5. Paste this store URL:

    ```text
    https://github.com/Copexit/copexit-umbrel-app-store
    ```

6. Click **Add**.
7. Find **am-i.exposed** in the store.
8. Click **Install**.

??? warning "If You Do Not See am-i.exposed"

    Check these things:

    1. Make sure the community app store URL was pasted exactly.
    2. Make sure your Umbrel has internet access.
    3. Refresh the App Store page.
    4. Confirm that mempool.space is already installed and working on Umbrel.

---

## Install on StartOS v0.4.0

On StartOS v0.4.0, am-i.exposed can be downloaded directly from the Marketplace.

### Steps

1. Open your StartOS dashboard.
2. Go to the **Marketplace**.
3. Search for **am-i.exposed**.
4. Install the app.
5. Make sure your mempool.space service is installed and running.

---

## Install on StartOS v0.3.5

StartOS v0.3.5 does not install am-i.exposed from the Marketplace directly. Instead, download the latest package and sideload it.

### Steps

1. Go to the release page:

    [am-i.exposed StartOS releases](https://github.com/remcoros/am-i-exposed-startos/releases)

2. Download the latest file that looks like:

    ```text
    am-i-exposed.s9pk
    ```

3. Open your StartOS dashboard.
4. Go to **Settings**.
5. Find the sideload option.
6. Upload the `am-i-exposed.s9pk` file.
7. Install it.
8. Make sure your mempool.space service is installed and running.

---

## Manual Self-Hosting with Docker

Self-hosting software manually sounds more intimidating than it really is. The actual work is usually ordinary:

1. Read what the project expects.
2. Create a directory.
3. Write a Docker Compose file.
4. Point the app at your mempool backend.
5. Start the containers.
6. Check the logs if something breaks.

This section assumes two things are already true:

- You already run a Bitcoin node somewhere.
- You already run a working mempool.space stack somewhere.

You have two manual choices:

- Use prebuilt images.
- Clone the repository and build the images yourself.

---

## Option 1: Use Prebuilt Docker Images

This is the easiest manual path if you do not want to build anything locally.

The am-i.exposed project publishes two relevant images:

- `ghcr.io/copexit/am-i-exposed-umbrel`
- `ghcr.io/copexit/am-i-exposed-tor-proxy`

Despite the name, you do not need to run Umbrel to use these images. You can run the same images with plain Docker Compose, as long as you provide the expected environment variables.

### Create a Directory for the Deployment

On your server, create a dedicated directory for this stack:

```bash
mkdir -p am-i-exposed
cd am-i-exposed
```

The first command creates a folder named `am-i-exposed` if it does not already exist. The second command moves your terminal into that folder.

### Create `docker-compose.yml`

Create a file named `docker-compose.yml` with this content:

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

!!! warning "Change the Mempool IP and Port"

    The example uses `192.168.1.50` and port `4080`. These are example values.

    You must change them to match your own mempool backend.

??? info "Environment Variables Explained"

    `APP_MEMPOOL_IP`
    :   The IP address or container name of your existing mempool backend.

    `APP_MEMPOOL_PORT`
    :   The HTTP port exposed by that mempool backend.

    `APP_TOR_PROXY_IP`
    :   The hostname of the Tor proxy sidecar. In this Compose file, `tor-proxy` works because that is the service name.

    `APP_TOR_PROXY_PORT`
    :   The port used by the Tor proxy sidecar. Keep this as `3001` unless you intentionally change the sidecar configuration.

    `APP_MEMPOOL_HIDDEN_SERVICE`
    :   Can stay blank unless you specifically want to expose or use a hidden service hostname.

    `PORT`
    :   The port the Tor proxy sidecar listens on inside Docker.

    `TOR_PROXY_IP` and `TOR_PROXY_PORT`
    :   Tell the sidecar where the Tor SOCKS proxy is inside its own container.

??? info "What does `3080:8080` mean?"

    This maps port `8080` inside the container to port `3080` on your server.

    So if your server IP is `192.168.1.20`, you would open:

    ```text
    http://192.168.1.20:3080
    ```

### Start the Stack

Run:

```bash
docker compose up -d
```

This tells Docker Compose to start the containers in the background.

### Check the Logs

If something does not work, check the logs:

```bash
docker compose logs -f web
docker compose logs -f tor-proxy
```

The first command shows logs for the web app. The second command shows logs for the Tor proxy sidecar.

Press `Ctrl+C` to stop watching logs. This does not stop the containers; it only stops showing the live log output.

### Open the Site

The site should be available on port `3080` of your server unless you changed the port mapping.

For example:

```text
http://192.168.1.20:3080
```

---

## Option 2: Clone the Repository and Build It Yourself

This path is for people who would rather build the site from source and not depend on prebuilt images.

Use this if you want more control over what you run.

### Clone the Repository

```bash
git clone https://github.com/copexit/am-i-exposed.git
cd am-i-exposed
```

The first command downloads the source code. The second command moves your terminal into the project folder.

### Create a Repo-Root Compose File

At the root of the cloned repository, create `docker-compose.yml` with content like this:

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

!!! warning "Change the Mempool IP and Port"

    Again, `192.168.1.50` and `4080` are example values. Replace them with the real IP address and port for your mempool backend.

### Build and Start

Run:

```bash
docker compose up -d --build
```

This tells Compose to:

- build the main image from the repository's Docker build file
- build the Tor sidecar from the repository's Tor proxy build folder
- create both containers
- start both containers in the background

### Why This Works

The build flow is straightforward. Compose builds the main image from the repo, builds the Tor sidecar, and starts both containers together.

You are not inventing a strange unsupported setup. You are using the project's own container logic outside Umbrel.

---

## Which Docker Option Should You Choose?

Use the prebuilt image path if:

- you want the simplest manual deployment
- you are comfortable trusting the published images
- you want faster updates with less local build time

Use the local build path if:

- you want more sovereignty over what you run
- you want to inspect or modify the code before deploying it
- you want to build the software from source yourself

!!! tip "Convenience vs Sovereignty"

    Prebuilt images are more convenient. Building from source gives you more control.

    Neither choice is magic. Pick the trade-off you actually want.

---

## Updating the Deployment

Self-hosting is not only installing. You also need to update sometimes.

### Updating a Prebuilt Image Deployment

If you used published images, run:

```bash
docker compose pull
docker compose up -d
```

This downloads newer images and restarts the containers if needed.

If you want to force container recreation cleanly, run:

```bash
docker compose pull
docker compose up -d --force-recreate
```

??? info "Should I use `latest`?"

    The `latest` tag is convenient because updates are simple.

    Specific version tags are more predictable because you choose exactly when to move to a new version.

    If you are new, `latest` is easier. If you want tighter control, pin a specific version tag.

### Updating a Local Build Deployment

If you cloned the repository and build locally, run:

```bash
git pull
docker compose up -d --build
```

This fetches upstream changes, rebuilds the images locally, and recreates the containers.

If you suspect Docker is reusing old cached layers, use:

```bash
git pull
docker compose build --no-cache
docker compose up -d
```

You probably do not need `--no-cache` every time. It is useful when you think cached build layers are hiding a change.

---

## Final Thoughts

There is nothing exotic about hosting am-i.exposed yourself. It is a web app, a connection to your mempool backend, and a Tor sidecar.

If you want the fastest path, use Umbrel, StartOS, or the prebuilt Docker images.

If you want the most independent path, clone the repository and build it yourself.

Both approaches are valid. The important part is understanding what is happening: you are keeping sensitive privacy lookups closer to your own infrastructure instead of handing them to public servers.

---

## References

- [am-i.exposed](https://am-i.exposed/) — Bitcoin privacy scanner
- [am-i.exposed GitHub repository](https://github.com/Copexit/am-i-exposed) — Source code and deployment information
- [Copexit Umbrel App Store](https://github.com/Copexit/copexit-umbrel-app-store) — Umbrel community app store
- [am-i.exposed StartOS](https://github.com/remcoros/am-i-exposed-startos/releases) — StartOS package releases
- [Privacy Analysis Walkthrough](../analysis/index.md) — Learn how to analyze transactions with am-i.exposed
