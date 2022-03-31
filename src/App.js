import { useState, useEffect } from 'react'
import './App.css'
import Question from './Components/Question/Question'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

function App() {
  const [apiData, setApiData] = useState([])
  const [questions, setQuestions] = useState([])
  const [quizEnded, setQuizEnded] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => {setApiData(data.results)})
  }, [quizEnded])

  function getNewQuestions(){
    setQuizEnded(false)
    setScore(0)

    const newQuestions = []
    for(let i=0; i<apiData.length; i++){
      const newQuestion = {
        id: nanoid(),
        question: decode(apiData[i].question),
        correct_answer: apiData[i].correct_answer,
        incorrect_answers: apiData[i].incorrect_answers,
        correctSelected: false
      }
      newQuestions.push(newQuestion)
    }
    setQuestions(newQuestions)
  }

  function renderQuestions(){
    const questionsMapped = questions.map(quest => { 
      return (
        <Question 
          id={quest.id}
          key={quest.id} 
          title={quest.question} 
          correct={quest.correct_answer}
          incorrect={quest.incorrect_answers}
          onAnswerChange={handleAnswerChange}
          quizEnded={quizEnded}
        />
      )
    })
    return questionsMapped
  }

  function handleAnswerChange(questionId, isCorrect){
    setQuestions(prevQuestions=>prevQuestions.map(question=>question.id===questionId ? 
      {
        ...question, 
        correctSelected: isCorrect
      } 
      : 
      question
    ))
  }

  function endQuiz(){
    let finalScore = 0
    for(let i=0; i<questions.length; i++){
      if(questions[i].correctSelected)
      finalScore++
    }
    setScore(finalScore)
    setQuizEnded(true)
  }

  return (
    <main>
      {questions.length > 0 ? 
        <div className='quiz'>
          <div className='questions'>
            {renderQuestions()}
          </div>
          <div className='results'>
            <p className='quiz__paragraph'>{quizEnded && `Score: ${score}/${questions.length}`}</p>
            <button className='quiz__button' onClick={quizEnded ? getNewQuestions : endQuiz}>
              {quizEnded ? 'Start new quiz' : 'Check answers'}
            </button>
          </div>
          <p className='quiz__paragraph--perfect'>{score===questions.length && `Congratulations!`}</p>
        </div>
      : 
        <div className='start'>
          <h1 className='start__title'>Quizzical</h1>
          <p className='start__description'>Answer 5 random trivia questions</p>
          <button className='start__button' onClick={getNewQuestions}>
            Start quiz
          </button>
        </div>
      }
    </main> 
  )
}

export default App
