import { writeFileSync } from 'fs';
import OpenAI from 'openai';

// Initialize OpenAI with the secret key stored in GitHub Actions
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generate() {
  const prompt = `
Generate complete vanilla JavaScript code for 'game.js' in a browser-based Logo Freelancer Simulator game.
Include:
- AI-generated clients (random names, companies, descriptions, budgets)
- Animated, glowing notifications that slide in from bottom-right
- Close (X) and Deny buttons
- Mouse-tilt animation when hovered
- Play sound when a new client appears
- Clicking a notification scrolls and highlights the client's inbox entry
Return only valid JavaScript code with no explanation.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }]
  });

  const code = response.choices[0].message.content;

  // Save to game.js
  writeFileSync('game.js', code);
  console.log("✅ AI-generated code written to game.js");
}

generate().catch(console.error);
