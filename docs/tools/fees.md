# Fee Estimation

Bitcoin transaction fees are paid to miners to include your transaction in a block. Getting the fee right is important - too low and your transaction may take a long time to confirm, too high and you waste money.

---

## How Fees Work

Fees are calculated based on the size of your transaction in virtual bytes (vbytes) multiplied by the fee rate in satoshis per vbyte (sat/vB).

!!! tip "The Formula"

    **Fee = Transaction Size (vbytes) × Fee Rate (sat/vB)**

    A typical single-input, two-output transaction is about 140 vbytes. At 10 sat/vB, the fee would be 1,400 sats.

---

## Fee Estimation Tools

=== "mempool.space"

    Shows current mempool conditions and recommends fee rates for different confirmation targets. Available on your own node for privacy.

=== "Your Wallet"

    Most wallets estimate fees automatically. Sparrow, Samourai, and others let you set custom fee rates.

=== "Whirlpool Fee Calculator"

    Calculate estimated Whirlpool CoinJoin fees. Available at whirlpoolfees.com.

---

## Fee Market

The fee market fluctuates based on demand:

| Demand Level | Fee Rate | Confirmation Time |
|-------------|----------|-------------------|
| **Low** | 1-5 sat/vB | 1-6 blocks |
| **Medium** | 5-20 sat/vB | 1-3 blocks |
| **High** | 20-100+ sat/vB | 1-2 blocks |

---

## Privacy Considerations

=== "Round Fee Rates"

    Using exact integer sat/vB values (like 10 sat/vB) can be a wallet fingerprint. Some wallets use non-integer values to avoid this.

=== "RBF Signaling"

    Replace-By-Fee (RBF) signaling reveals wallet capabilities. Not all wallets support RBF.

=== "Fee Estimation Services"

    Using third-party fee estimation services leaks your transaction details. Use your own node for fee estimation.

---

## Best Practices

<div class="grid cards" markdown>

-   :material-server:{ .lg .middle } __Use Your Own Node__

    ---

    For fee estimation, use your own node to avoid leaking transaction details.

-   :material-numeric-off:{ .lg .middle } __Avoid Round Fee Rates__

    ---

    Use non-integer values like 10.3 sat/vB instead of 10 sat/vB.

-   :material-clock:{ .lg .middle } __Check Mempool Conditions__

    ---

    Before sending, check mempool conditions to avoid overpaying.

-   :material-swap-horizontal:{ .lg .middle } __Use RBF When Possible__

    ---

    RBF allows you to bump fees if your transaction is stuck.

-   :material-hand-back-right:{ .lg .middle } __Be Patient During Low Fees__

    ---

    During low-fee periods, you can save money by waiting.

</div>
