import parse from "./aiResultParser"

export default async function generate(todo: string, config: { apiKey: string }) {
  let prompt = `
Generate code based on the following instruction: "${todo}". Each file should follow best practices for the specific language, include proper comments, and format the code correctly. Provide the output as:

filename: "filename.extension"
\`\`\`language
// Comment or documentation explaining what the code does

// Code that performs "${todo}" in this language
\`\`\`
`
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${config.apiKey}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": prompt
            }
          ]
        },
        {
          "role": "user",
          "parts": [
            {
              "text": "INSERT_INPUT_HERE"
            }
          ]
        }
      ],
      "generationConfig": {
        "temperature": 0.3,
        "topK": 40,
        "topP": 0.95,
        "maxOutputTokens": 8192,
        "responseMimeType": "text/plain"
      }
    })
  })
  const data = await res.json()
  const aiResult = data.candidates[0].content.parts[0].text
  return parse(aiResult)
}
