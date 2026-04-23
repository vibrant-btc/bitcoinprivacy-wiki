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

    ```
    git clone https://github.com/Copexit/am-i-exposed
    cd am-i-exposed
    docker compose up -d --build
    ```

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
