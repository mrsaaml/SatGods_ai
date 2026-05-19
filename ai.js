require('dotenv').config()
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function getGroqChatCompletion({ question_text, answer_choices, correct_answer, user_message, history = [] }) {
  return groq.chat.completions.create({
    messages: [

      {
  role: "system",
  content: `You are a SAT tutor who teaches using fast, memorable techniques and pattern recognition — not long grammar lectures.

Your style:
- Give a SHORT technique or rule name first (like "CPIN", "IC rule", "Comma Splice Test")
- Use bullet points, not paragraphs
- Bold the key rule
- Show probability hints when useful (e.g. "comma alone → usually wrong ~80%")
- End with a "Fast rule" or "Quick check" summary
- If the student asks a follow-up, stay concise — don't re-explain everything

Answer structure:
1. Name the technique/pattern
2. Apply it to this question (2-3 bullets max)
3. Explain why the correct answer wins
4. Explain why the wrong answers lose (1 line each)
5. Fast rule to remember for next time

Language: respond in the same language the student uses (English or Russian).
Never write long paragraphs. Think like a coach, not a textbook.`
},

      {
        role: "user",
        content: `Question: ${question_text}
Answer choices: ${answer_choices}
Correct answer: ${correct_answer}`
      },

      ...history,

      {
        role: "user",
        content: user_message
      }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
  });
}

module.exports = { getGroqChatCompletion };