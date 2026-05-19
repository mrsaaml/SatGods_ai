const questions = require('./sat_questions.json')  
const { getGroqChatCompletion } = require('./ai.js')  

const express = require('express')
const app = express()

app.use(express.json())


app.post('/api/chat', async (req, res) => {
  const { question_id, user_message } = req.body;

  const question = questions.find(q => q.id === parseInt(question_id))

  if (!question) {
  return res.json({ error: "Question not found" })}
  
  else{
    const answer_groq = await getGroqChatCompletion({ question_text: question.question_text,
    answer_choices: question.answer_choices,
    correct_answer: question.correct_answer,
    user_message })
    res.json({ reply: answer_groq.choices[0].message.content })
  }
})


app.listen(3002, () => {
  console.log("Server running on http://localhost:3002")
})
