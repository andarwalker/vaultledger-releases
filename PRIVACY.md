# VaultLedger — Privacy

**Effective:** 2026-05-17 · **Applies to:** VaultLedger desktop, closed beta `v0.1.x`

> This is a closed-beta privacy notice. It will be revised before any general-availability release. The version that applies to you is the one in effect at the time you install or update the app.

VaultLedger is a **local-first** desktop app. By design, your purchase history, email content, and financial data live on your device and nowhere else. This document describes the narrow set of data the app does send to VaultLedger's servers and what it does not.

## What stays on your device

The following data is stored only in a local SQLite database (`vault-ledger.db`) in the VaultLedger application data folder, and is **never** transmitted to VaultLedger's servers:

- Email account credentials (IMAP host, username, app password — stored encrypted).
- Email message bodies, headers, and parsed receipt data.
- Order data, refund history, resale vs. personal classification, profit calculations.
- Inventory, expenses, and price observations from price-monitor checks.
- Any data you enter manually in the app.

Application data folder locations:

- **Windows:** `%APPDATA%\com.vaultledger.app\`
- **macOS:** `~/Library/Application Support/com.vaultledger.app/`

When you uninstall the app, this folder is not removed automatically. Delete it manually for a clean wipe.

## What the app does send to VaultLedger's servers

There are exactly two outbound paths from the desktop app to a VaultLedger-operated server. Both are minimal and documented below.

### 1. License verification

When you launch the app, it calls our licensing API to check whether your Discord account has an active beta license. Each call sends:

- Your Discord user ID and a short-lived OAuth token (used to authenticate you).
- A device identifier so the license can be bound to a known set of installations.
- The app version.

The server never receives your orders, emails, or any commerce data through this channel. It exists only to enforce the closed-beta gate.

### 2. Crash reports (opt-in, opt-out by default for sensitive fields)

If a crash occurs and you have crash reporting enabled in **Settings → Privacy**, the app sends an anonymized crash report containing:

- The JavaScript error message and a sanitized stack trace.
- The app version, OS family, and OS version.
- A non-identifying installation ID.

Before sending, the report is run through a scrubber that removes order IDs, email addresses, retailer names, and other commerce identifiers. You can disable crash reporting at any time in **Settings → Privacy → Crash reports**.

## What we do not collect

We do not — and the application architecture does not allow us to — collect:

- The contents of your email inboxes.
- Your purchase or sales history.
- Retailer names, order numbers, or amounts.
- Price observations or price-match alerts.
- Any data from third-party retailers or marketplaces.

If a future feature would require sending any of this data to our server, it will be opt-in with explicit consent at the point of activation.

## Email access

VaultLedger reads your connected email inboxes in **read-only** mode over IMAP. It never sends mail, never deletes messages, never modifies flags. Email content is parsed locally; only the parsed result (order data, locally stored) is retained, and parsed data never leaves your device.

The beta does not use Gmail or Outlook OAuth — only IMAP with an app-specific password you generate from your email provider. App passwords are stored encrypted in the local database.

## Third parties

The app has no third-party analytics, no advertising trackers, no telemetry SDKs. The only network destinations the app contacts are:

- `github.com/andarwalker/vaultledger-releases` — to check for and download updates.
- VaultLedger's own licensing API — for the verification described above.
- VaultLedger's own crash-report endpoint — if and only if crash reporting is enabled.
- Your configured IMAP server — for email sync.
- Retailer websites (Target, etc.) — for opt-in price-monitor checks. These calls happen from your device, not from our server.

## Data retention

- Local data: kept until you delete the app data folder or use **Settings → Data → Erase local database**.
- License records on the server: retained while your beta license is active and for a reasonable period after the closed beta ends. You can ask an admin in the beta Discord to delete your license record at any time.
- Crash reports: retained while they are useful for triage and then deleted. We do not associate crash reports with your identity or license.

## Your controls

- **Disable crash reporting:** Settings → Privacy → Crash reports → Off. Reports stop immediately.
- **Disconnect an email account:** Settings → Accounts → remove. The local cache for that account is also removed.
- **Erase local data:** Settings → Data → Erase local database. Reset to first-run state.
- **Revoke license:** ask an admin in the beta Discord. Your license is invalidated and the app will refuse to launch on next start.

## Contact

Privacy questions or requests: DM an admin in the beta Discord. There is no email contact for the beta; this will change before general availability.
