export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const response = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
    const short = await response.text();

    if (!short.startsWith('http')) {
      return res.status(500).json({ error: 'Failed to shorten URL', detail: short });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ original: url, short });
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Something went wrong', detail: err.message });
  }
}
