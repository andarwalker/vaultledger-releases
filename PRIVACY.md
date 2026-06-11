# VaultLedger — Privacy Policy

**Effective:** 2026-06-10 · **Applies to:** the VaultLedger desktop app (closed beta `v0.1.x`), the `vaultledger.app` website, and the VaultLedger account/licensing service

> **Canonical version:** <https://vaultledger.app/legal/privacy>. This file is a synced copy.
>
> This is a closed-beta privacy notice. It will be revised before any general-availability release. The version that applies to you is the one in effect at the time you install or update the app or use the website.

VaultLedger is a **local-first** desktop app. By design, your purchase history, email content, and financial data live on your device and nowhere else. This document describes the narrow set of data that VaultLedger's servers do receive — from the desktop app and from the `vaultledger.app` website and account portal — and what they do not.

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

**Backups you export are sensitive.** The file produced by **Settings → Data → Export** contains your full local database, including your encrypted email credentials. Treat backup files like passwords: store them somewhere safe and do not share them.

## What the desktop app sends to VaultLedger's servers

There are exactly two outbound paths from the desktop app to a VaultLedger-operated server.

### 1. License and device verification

When you launch the app and sign in, it calls our licensing API to check whether your account has an active beta license. This channel sends and stores:

- Your Discord user ID and a short-lived token (used to authenticate you).
- A generated device identifier, a device name, and your platform (Windows/macOS) — used to enforce the per-license device cap and to let you view and sign out devices from the web portal.
- The app version.

The server never receives your orders, emails, or any commerce data through this channel. It exists only to enforce the closed-beta gate and the device cap.

### 2. Crash reports (on by default; you can turn them off)

If an error or crash occurs and crash reporting is enabled (**Settings → Behavior → Diagnostics → "Send crash reports"**), the app sends a crash report containing:

- The error message and stack trace, run through a scrubber that removes file paths, email addresses, URLs, credentials, and order-number-shaped values before sending.
- A short, scrubbed trail of recent app actions (e.g. "navigated to Orders", "started email sync") to help reproduce the bug.
- The app version, platform, and OS version.
- A random per-install ID that is not derived from your identity.
- **If you are signed in at the time of the crash: your account ID and license tier.** We use this to prioritize and follow up on beta-breaking bugs.

The server runs a second scrubbing pass on every report it receives. You can disable crash reporting at any time with the toggle above; when disabled, no crash data leaves your device.

## What the website and account portal collect

If you create an account or sign in at `vaultledger.app`:

- **Account records:** your email address; if you register with email + password, a salted hash of your password (we never store the password itself).
- **Sign-in identities:** if you sign in with Discord or Google, the provider's user ID, username/display name, and avatar reference. We do not receive your password from these providers.
- **License records:** license key, tier, status, expiry, and issuance metadata.
- **Device sessions:** the device list described above, with activation and last-seen timestamps.
- **Sign-in security metadata:** when a session is created or refreshed, we record the IP address and browser user-agent of the request. This is standard abuse- and account-security metadata; we do not use it for tracking or profiling.
- **Cookies:** the portal sets authentication cookies only (`vl_session`, `vl_refresh`, `vl_device`). There are no analytics, advertising, or third-party cookies on `vaultledger.app`.
- **Administrative logs:** actions taken by VaultLedger admins (e.g. issuing or revoking a license) are recorded in an audit log that references the affected account.

## Discord community

The closed beta is run through a Discord server. Our Discord bot stores server-management data tied to Discord IDs — role mappings (including the beta role used for license issuance), moderation actions, and support tickets. Anything you post in Discord is also governed by Discord's own terms and privacy policy.

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

- `github.com/andarwalker/vaultledger-releases` — to check for and download updates. GitHub (a Microsoft service) sees the IP address of update checks, as with any download.
- VaultLedger's own licensing API — for the verification described above.
- VaultLedger's own crash-report endpoint — if and only if crash reporting is enabled.
- Your configured IMAP server — for email sync.
- Retailer websites (Target, etc.) — for opt-in price-monitor checks. These calls happen from your device, not from our server.

Our servers are hosted on Railway (API), Neon (database), and Vercel (website). These infrastructure providers process data on our behalf as hosting providers.

## Data retention

- **Local data:** kept until you delete the app data folder or use the reset option in **Settings → Data**.
- **Account, license, and device records:** retained while your account or beta license is active and for a reasonable period after the closed beta ends.
- **Sign-in security metadata (IP / user-agent):** retained with the session records and removed when those records are cleaned up.
- **Crash reports:** retained while they are useful for triage and then deleted.

## Your controls

- **Disable crash reporting:** Settings → Behavior → Diagnostics → "Send crash reports" → off. Reports stop immediately.
- **Disconnect an email account:** Emails → Mailboxes → remove the mailbox. The local cache for that account is also removed.
- **Erase local data:** Settings → Data → reset. Returns the app to first-run state.
- **Sign out devices:** the account portal at `vaultledger.app` lists your active devices and lets you sign any of them out.
- **Delete your account or data:** email us (address below) and we will delete your account, license, device, and crash-report records, subject to any records we must keep for abuse prevention.

## Children

VaultLedger is not directed to children under 13, and you must be old enough to consent to these terms in your jurisdiction to create an account.

## Changes to this policy

We may revise this policy as the product evolves. Material changes will be announced in the beta Discord and reflected at the canonical URL above with a new effective date. Continued use of the app or website after a revised policy takes effect constitutes acceptance.

## Contact

Privacy questions, or requests to access or delete your data: **vaultledger.app@gmail.com**
