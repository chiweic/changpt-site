// Cloudflare Worker: GitHub OAuth provider for Decap CMS.
//
// Decap (/admin) opens a popup at  https://auth.changpt.org/auth?provider=github&scope=repo
//   -> we redirect to GitHub's authorize page
//   -> GitHub redirects back to https://auth.changpt.org/callback?code=...
//   -> we exchange the code for an access token (server-side, with the secret)
//   -> we postMessage the token back to the /admin window and it closes the popup.
//
// Secrets (set with `wrangler secret put`):
//   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const redirectUri = `${url.origin}/callback`;

    if (url.pathname === '/auth') {
      const scope = url.searchParams.get('scope') || 'repo';
      const authorize = new URL('https://github.com/login/oauth/authorize');
      authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authorize.searchParams.set('redirect_uri', redirectUri);
      authorize.searchParams.set('scope', scope);
      authorize.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authorize.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return html(page('error', {message: 'missing code'}));
      try {
        const res = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Accept: 'application/json'},
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: redirectUri,
          }),
        });
        const data = await res.json();
        return data.access_token
          ? html(page('success', {token: data.access_token, provider: 'github'}))
          : html(page('error', {message: data.error_description || 'no access token'}));
      } catch (err) {
        return html(page('error', {message: String(err)}));
      }
    }

    if (url.pathname === '/health') return new Response('ok');
    return new Response('not found', {status: 404});
  },
};

function html(body) {
  return new Response(body, {headers: {'Content-Type': 'text/html; charset=utf-8'}});
}

function page(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>ChanGPT CMS</title></head>
<body>
<p>${status === 'success' ? '登入成功，視窗即將關閉…' : '登入失敗，請關閉視窗重試。'}</p>
<script>
(function () {
  if (!window.opener) { document.body.append('No opener window.'); return; }
  function receive(e) {
    window.opener.postMessage(${JSON.stringify(message)}, e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  // Handshake: announce readiness; the opener replies so we learn its origin.
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`;
}
