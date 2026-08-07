const axios = require('axios');

// Render's free tier spins the service down after ~15 minutes with no
// inbound HTTP traffic. Pinging our own public URL every 5 minutes counts
// as inbound traffic, so it keeps the instance awake. This only helps
// while the instance IS awake and only matters on Render — it auto-skips
// if RENDER_EXTERNAL_URL isn't set (e.g. running locally).
function startKeepAlive() {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (!url) {
    console.log('RENDER_EXTERNAL_URL not set — keep-alive disabled (fine for local dev)');
    return;
  }
  const FIVE_MINUTES = 5 * 60 * 1000;
  setInterval(() => {
    axios
      .get(`${url}/api/health`)
      .then(() => console.log(`[keep-alive] pinged self at ${new Date().toISOString()}`))
      .catch((err) => console.error('[keep-alive] ping failed:', err.message));
  }, FIVE_MINUTES);
}

module.exports = { startKeepAlive };
