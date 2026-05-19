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
        content: "You are a SAT tutor and your job is to explain given questions clearly using techniques.",
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