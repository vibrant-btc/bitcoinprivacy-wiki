---
description: Discover Bitcoin privacy scanning tools like am-i.exposed for analyzing transaction privacy and getting actionable recommendations
---

# Privacy Scanners

Privacy scanners analyze your Bitcoin addresses and transactions to identify privacy weaknesses and provide actionable recommendations.

---

## am-i.exposed

The most comprehensive Bitcoin privacy scanner available.

=== "Features"

    - 31 privacy heuristics
    - 14 chain analysis modules
    - Entity matching against 364+ known services
    - Boltzmann entropy computation
    - Privacy score 0-100 with letter grades
    - Interactive visualizations (Sankey diagrams, heatmaps, graph explorer)
    - Client-side analysis (no server sees your query and results together)
    - Tor-aware

=== "How to Use"

    1. Go to am-i.exposed
    2. Paste a Bitcoin address or transaction ID
    3. Review your privacy score and findings
    4. Follow the recommendations

=== "Self-Hosting"

    For maximum privacy, self-host am-i.exposed with Docker. This eliminates all third-party API exposure.

    ### Option 1: Use the Prebuilt Images

    This is the easiest manual path if you do not want to build anything locally.

    The deployment documentation in the am-i.exposed repository shows that the project publishes two relevant images:

    - `ghcr.io/copexit/am-i-exposed-umbrel`
    - `ghcr.io/copexit/am-i-exposed-tor-proxy`

    Despite the naming, you do not need to run Umbrel itself to use them. You can run the same images with plain Docker Compose, as long as you provide the expected environment variables.

    #### Create a directory for your deployment

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
    - `APP_TOR_PROXY_PORT` stays at 3001 unless you intentionally change the sidecar configuration;
    - `APP_MEMPOOL_HIDDEN_SERVICE` can stay blank unless you specifically want to surface a hidden service hostname.

    #### Start the stack

    Start it with:

    ```bash
    docker compose up -d
    ```

    Then check logs if needed:

    ```bash
    docker compose logs -f web
    docker compose logs -f tor-proxy
    ```

    At that point, the site should be available on port 3080 of your server, unless you changed the mapping.

    ### Option 2: Clone the Repo and Build It Yourself

    This path is for people who would rather build the site from source and not depend on prebuilt images.

    Clone the repository, add your own `docker-compose.yml` at the repo root, and let Compose build both containers locally.

    #### Clone the repository

    ```bash
    git clone https://github.com/copexit/am-i-exposed.git
    cd am-i-exposed
    ```

    #### Create a repo-root compose file

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

    #### Why this works

    The build flow is straightforward: Compose builds the main image from the repo, builds the Tor sidecar, and starts both containers together.

    In other words, you are not improvising some unsupported setup. You are simply using the project's own container logic outside Umbrel.

    ### Which Option Should You Choose?

    **Use the prebuilt image path if:**

    - you want the simplest deployment;
    - you are comfortable trusting the published images;
    - you want faster updates with less local build time.

    **Use the local build path if:**

    - you want more sovereignty over what you run;
    - you want more privacy by building from source yourself;
    - you want to inspect or modify the code before you deploy it.

    Neither approach is inherently magical. One is more convenient. The other is slightly more sovereign. Pick the trade-off you actually value instead of performing ideology for strangers online.

    ### Updating the Deployment

    This part matters more than people admit. Self-hosting is easy to start and boring to maintain, which is exactly why maintenance gets neglected.

    The right update process depends on which option you chose.

    #### Updating a prebuilt-image deployment

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

    `latest` is convenient. Specific version tags are more predictable. Pick the trade-off you actually want.

    #### Updating a local-build deployment

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

## Other Tools

=== "OXT.me (Offline Since April 2024)"

    Was the gold standard for Boltzmann entropy analysis. Created by LaurentMT as part of OXT Research. Shut down following the arrest of Samourai Wallet developers.

=== "KYCP.org (Offline Since April 2024)"

    "Know Your Coin Privacy" - Focused on CoinJoin analysis and post-mix privacy assessment. Also shut down after the Samourai arrests.

---

## Best Practices

<div class="grid cards" markdown>

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    When scanning your own addresses, use Tor to hide your IP.

-   :material-clock:{ .lg .middle } __Wait Before Querying__

    ---

    Do not look up recent transactions immediately. Wait to avoid timing correlation.

-   :material-server:{ .lg .middle } __Self-Host If Possible__

    ---

    Self-hosting eliminates all third-party API exposure.

-   :material-check-circle:{ .lg .middle } __Act on Recommendations__

    ---

    Do not just check and ignore. Follow the recommendations to improve your privacy.

-   :material-refresh:{ .lg .middle } __Re-Scan After Fixes__

    ---

    After applying privacy improvements, re-scan to verify the improvement.

</div>
