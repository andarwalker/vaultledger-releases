// Posts a formatted Discord embed announcing a published GitHub Release.
// Invoked by .github/workflows/release-announce.yml. Zero deps — Node 22 fetch.
//
// Env in:
//   DISCORD_WEBHOOK_URL      required — Discord channel webhook URL
//   DISCORD_RELEASE_ROLE_ID  optional — role ID to ping in message content
//   RELEASE_JSON             required — toJson(github.event.release)

// The product accent. Kept in step with apps/web/src/styles/tokens.ts,
// tools/discord-mcp/src/render/theme.ts, and apps/discord-bot/src/brand.ts in
// the source repo, so a release post and a slash-command reply read as one
// product. Was an unrelated indigo (0x6366f1) until the brand was unified.
const BRAND_COLOR = 0xc4b5fd;
const DESCRIPTION_LIMIT = 3800; // Discord hard cap is 4096; leave room for the "Read more" tail
const READ_MORE_TAIL = (url) => `\n\n— [Read full notes →](${url})`;

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const roleId = process.env.DISCORD_RELEASE_ROLE_ID?.trim() || null;
const releaseJson = process.env.RELEASE_JSON;

if (!webhookUrl) {
  console.error(
    'DISCORD_WEBHOOK_URL is not set. Configure the DISCORD_RELEASE_WEBHOOK_URL repo secret.',
  );
  process.exit(1);
}
if (!releaseJson) {
  console.error(
    'RELEASE_JSON is not set — this script must run from a release.published workflow.',
  );
  process.exit(1);
}

const release = JSON.parse(releaseJson);
const assets = Array.isArray(release.assets) ? release.assets : [];

function findAsset(predicate) {
  return assets.find((a) => predicate(a.name));
}

const lower = (s) => s.toLowerCase();
const winMsi =
  findAsset((n) => /_x64.*\.msi$/i.test(n)) ?? findAsset((n) => lower(n).endsWith('.msi'));
const macArm = findAsset((n) => /(aarch64|arm64).*\.dmg$/i.test(n));
const macIntel = findAsset((n) => /(x64|x86_64).*\.dmg$/i.test(n));
const linuxAppImage = findAsset((n) => lower(n).endsWith('.appimage'));
const linuxDeb = findAsset((n) => lower(n).endsWith('.deb'));

function truncateDescription(body, htmlUrl) {
  const text = (body ?? '').trim();
  if (!text) return '_No release notes provided._';
  if (text.length <= DESCRIPTION_LIMIT) return text;
  const slice = text.slice(0, DESCRIPTION_LIMIT);
  const lastBreak = Math.max(slice.lastIndexOf('\n\n'), slice.lastIndexOf('\n'));
  const cut = lastBreak > DESCRIPTION_LIMIT * 0.6 ? slice.slice(0, lastBreak) : slice;
  return `${cut.trimEnd()}…${READ_MORE_TAIL(htmlUrl)}`;
}

const fields = [];

if (winMsi) {
  fields.push({
    name: 'Windows',
    value: `[Installer (.msi)](${winMsi.browser_download_url})`,
    inline: true,
  });
}

if (macArm || macIntel) {
  const lines = [];
  if (macArm) lines.push(`[Apple Silicon (.dmg)](${macArm.browser_download_url})`);
  if (macIntel) lines.push(`[Intel (.dmg)](${macIntel.browser_download_url})`);
  fields.push({ name: 'macOS', value: lines.join('\n'), inline: true });
}

if (linuxAppImage || linuxDeb) {
  const lines = [];
  if (linuxAppImage) lines.push(`[AppImage](${linuxAppImage.browser_download_url})`);
  if (linuxDeb) lines.push(`[Debian (.deb)](${linuxDeb.browser_download_url})`);
  fields.push({ name: 'Linux', value: lines.join('\n'), inline: true });
}

if (fields.length === 0) {
  fields.push({
    name: 'Downloads',
    value: `[View release assets on GitHub →](${release.html_url})`,
    inline: false,
  });
}

const embed = {
  author: { name: 'VaultLedger' },
  title: `VaultLedger ${release.tag_name}`,
  url: release.html_url,
  description: truncateDescription(release.body, release.html_url),
  color: BRAND_COLOR,
  fields,
  footer: { text: 'VaultLedger updates on next launch, or check Settings → Updates.' },
  timestamp: release.published_at ?? new Date().toISOString(),
};

const payload = {
  embeds: [embed],
  allowed_mentions: roleId ? { parse: [], roles: [roleId] } : { parse: [] },
};

if (roleId) {
  payload.content = `<@&${roleId}> A new VaultLedger build is out.`;
}

let res;
try {
  res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
} catch (err) {
  console.error(`Discord webhook POST failed (network error): ${err.message}`);
  process.exit(1);
}

if (!res.ok) {
  const responseText = await res.text().catch(() => '<unreadable>');
  console.error(`Discord webhook POST failed: ${res.status} ${res.statusText}\n${responseText}`);
  process.exit(1);
}

console.log(`Posted release announcement for ${release.tag_name} to Discord.`);
