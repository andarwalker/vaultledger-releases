# VaultLedger Releases

Public artifact mirror for the **VaultLedger** desktop app. This repo holds only built binaries and the updater manifest — there is no source code here.

The application source lives in a private repository. Binaries are published here so the in-app auto-updater can fetch them without authentication and so closed-beta testers have a stable download location.

## Install

Closed beta builds are distributed by invitation through the project Discord. If you are an invited tester, the install steps are in the tester README you received with your invite. In short:

- **Windows:** download the `.msi` from the latest release on this repo and run it. SmartScreen will warn about an unsigned installer — click **More info → Run anyway**.
- **macOS (14+):** download the matching `.dmg` (`aarch64` for Apple Silicon, `x64` for Intel), drag `VaultLedger.app` to **Applications**, then right-click → **Open** to bypass Gatekeeper on first launch. If that still gets blocked, run `xattr -d com.apple.quarantine /Applications/VaultLedger.app` in Terminal.
- **Linux:** the `.AppImage` and `.deb` are published for completeness; Linux is not part of the supported beta surface yet.

After install, log in with the Discord account that received the beta role. The app updates itself on launch when a new release is published here.

## Updates

The desktop app polls `releases/latest/download/latest.json` from this repo on each launch and prompts the user when a newer signed build is available. You do not need to redownload manually — `Settings → About → Check for updates` also forces a check.

## Privacy + license

Canonical versions live at [vaultledger.app/legal](https://vaultledger.app/legal/privacy); the copies here are kept in sync.

- [`PRIVACY.md`](./PRIVACY.md) — what VaultLedger does and does not send to its servers.
- [`TERMS.md`](./TERMS.md) — terms of service for the website and account/licensing service.
- [`LICENSE-EULA.md`](./LICENSE-EULA.md) — closed-beta end-user license agreement governing the binaries in this repo.

## Reporting bugs

GitHub Issues on this repo is **disabled**. Send bug reports, feature requests, and general feedback in the beta Discord server (`#beta-feedback`). Privacy-sensitive issues should be DM'd to an admin.

## What this repo is not

- Not the source code (which is private).
- Not a public release channel — installs are gated by a Discord-issued license at first launch.
- Not a support channel for general inquiries — Discord is the support venue.
