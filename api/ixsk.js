export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const formData = new URLSearchParams();
    formData.append('longurl', url);
    formData.append('action', 'create');

    const response = await fetch('https://ix.sk/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const html = await response.text();
    const match = html.match(/value="(https:\/\/ix\.sk\/[^"]+)"/);

    if (!match || !match[1]) {
      return res.status(500).json({ error: 'Failed to extract shortlink' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      original: url,
      short: match[1]
    });
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Request failed', detail: err.message });
  }
}
