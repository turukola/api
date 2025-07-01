export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch("https://chatme.wuaze.com/ketok/api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const contentType = response.headers.get("content-type") || "application/json";
    res.setHeader("Content-Type", contentType);
    const data = await response.text(); // bisa JSON atau teks
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", detail: err.message });
  }
}
