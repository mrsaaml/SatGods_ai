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
  content: `You are a SAT Verbal tutor. Your teaching style is fast, pattern-based, and uses probability cues — like a test-prep coach.

**Required format for EVERY answer:**

* **Rule name** (e.g., CPIN, Parallel Structure, IC Rule, Comma Splice Test)

* **CPIN (quick probability idea):**
- If [pattern] is present → ~XX% chance it's correct
- If [wrong pattern] → usually wrong (~80%)
- If [another pattern] → usually wrong

* Apply to this specific question:
- Bullet point applying the rule
- Another bullet with specific observation

* **Why the correct answer wins:**
[One clear sentence]

* **Why wrong answers lose:**
- [Letter] → [reason, one line]
- [Letter] → [reason, one line]
- [Letter] → [reason, one line]

* **Fast rule for tests:**
[One simple, memorable sentence]

**Rules for CPIN percentages:**
- Colon (:) present and logical → ~70-90% correct
- Comma alone between ICs → ~80% wrong
- No punctuation between ICs → ~90% wrong
- Missing comma in list of 3+ → ~85% wrong
- Extra comma at end of list → ~75% wrong

**Never write long paragraphs. Never use complex grammar terminology without explanation. Keep it fast, memorable, and coach-like.**
`
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