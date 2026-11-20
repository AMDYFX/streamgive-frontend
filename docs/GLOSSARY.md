# StreamGive glossary

These terms describe the donation flows shown in the app. For implementation
details, see the [contract call reference](./CONTRACT_CALLS.md).

| Term | Meaning in StreamGive |
|---|---|
| **Stream** | A recurring donation from a donor to an NGO. The donor deposits a token amount into the DonationVault contract, which makes funds available to the NGO over time at a set rate. A donor can top up, change the rate, or cancel an active stream. |
| **Rate** | The amount that accrues to the NGO per second. When creating a stream, the app divides the deposit (in the token's smallest units) by the chosen duration in seconds. The rate must be greater than zero. |
| **Stroop** | The smallest unit of XLM: 1 XLM equals 10,000,000 stroops. Contract amounts and rates are handled as integers in each token's smallest units; other tokens may use a different scale. |
| **Committed** | Funds a donor has deposited into a donation stream. **Total committed** in the impact stats is the sum reported for verified NGOs; it does not mean all those funds have already been paid out. |
| **Verified NGO** | An NGO approved by the platform admin in the on-chain NGO registry. The public NGO list and verified NGO count use this status; applying to become an NGO alone does not grant it. |
| **Active stream** | A stream that has not been cancelled. Its balance can continue to accrue to the NGO at the current rate. |
| **Withdrawn** | Accrued funds that the NGO has claimed from a stream. This is distinct from the amount still held in the stream. |
| **Top up** | Add more funds to an existing active stream without creating a new stream. |
| **Cancel** | End a stream. Accrued funds are settled to the NGO and the unspent balance is refunded to the donor. |
