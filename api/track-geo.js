// /api/track-geo.js
// Serverless proxy — receives geo data from browser, posts to ActiveCampaign
// Keeps AC API key server-side (never exposed in browser)

const AC_URL = 'https://srglobal75904.api-us1.com';
const AC_KEY = 'f6b8f9b55b88ea536fa20aa55e9ff87cbe6066a7a099e83714b333d21ba543eeef844a1c';

export default async function handler(req, res) {
  // Allow CORS from our domain
  res.setHeader('Access-Control-Allow-Origin', 'https://event.millionairemind.online');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')    { res.status(405).end(); return; }

  try {
    const { email, city, country } = req.body;
    if (!email) { res.status(400).json({ error: 'email required' }); return; }

    const acRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Api-Token': AC_KEY },
      body: JSON.stringify({
        contact: {
          email,
          fieldValues: [
            { field: '468', value: city    || '' },
            { field: '469', value: country || '' }
          ]
        }
      })
    });

    const data = await acRes.json();
    res.status(200).json({ ok: true, contactId: data.contact?.id });
  } catch (err) {
    console.error('track-geo error:', err);
    res.status(500).json({ error: err.message });
  }
}
