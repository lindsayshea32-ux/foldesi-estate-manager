export default async function handler(req, res) {
  try {
    const { system, prompt } = req.body;

    const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      text: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    res.status(500).json({ text: "Server error" });
  }
}
