/**
 * Cloudflare Worker: live Instagram stats for the founder cards.
 * GET https://<your-worker>.workers.dev/?username=its_neelimaaa
 *  -> { username, name, followers_count, follows_count, media_count, profile_picture_url }
 *
 * Uses the OFFICIAL Instagram Graph API "Business Discovery" endpoint, which can read
 * public stats of any Business/Creator account. Requirements (one-time setup):
 *   1. An Instagram Business or Creator account (e.g. the agency account) linked to a Facebook Page.
 *   2. A Meta developer app with instagram_basic + pages_show_list (+ instagram_manage_insights) permissions.
 *   3. A long-lived access token and that account's IG user id.
 *   4. The founders' accounts must be Business or Creator accounts (most creators already are).
 * Set secrets:  wrangler secret put IG_TOKEN   and   wrangler secret put IG_USER_ID
 * Responses are cached for 1 hour to stay well within API rate limits.
 */
const ALLOWED = ["its_neelimaaa", "soulful_funnygirl"]; // only these handles can be looked up

export default {
  async fetch(request, env, ctx) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*",
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    };
    const username = new URL(request.url).searchParams.get("username") || "";
    if (!ALLOWED.includes(username)) return new Response(JSON.stringify({ error: "unknown username" }), { status: 400, headers: cors });

    const cache = caches.default;
    const key = new Request(`https://cache.local/ig/${username}`);
    const hit = await cache.match(key);
    if (hit) return new Response(hit.body, { headers: cors });

    const fields = `business_discovery.username(${username}){username,name,followers_count,follows_count,media_count,profile_picture_url}`;
    const api = `https://graph.facebook.com/v21.0/${env.IG_USER_ID}?fields=${encodeURIComponent(fields)}&access_token=${env.IG_TOKEN}`;
    const r = await fetch(api);
    const j = await r.json();
    if (!r.ok || !j.business_discovery) return new Response(JSON.stringify({ error: "lookup failed" }), { status: 502, headers: cors });

    const body = JSON.stringify(j.business_discovery);
    ctx.waitUntil(cache.put(key, new Response(body, { headers: { "Cache-Control": "max-age=3600" } })));
    return new Response(body, { headers: cors });
  },
};
