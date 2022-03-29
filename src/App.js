import {useState} from 'react'
import './App.css'
import Question from './Components/Question/Question'
import {nanoid} from 'nanoid'

function App() {
  const [questions, setQuestions] = useState([])
  const [quizEnded, setQuizEnded] = useState(false)
  const [score, setScore] = useState(0)

  function getNewQuestions(){
    setQuizEnded(false)
    setScore(0)
    const newQuestions = []
    for(let i=1; i<6; i++){
      const newQuestion = {
        id: nanoid(),
        question: `test question ${i}`,
        correct_answer: `correct`,
        incorrect_answers: [`first`, `second`, `third`],
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
        />
      )
    })
    return questionsMapped
  }

  function handleAnswerChange(questionId, isCorrect){
    setQuestions(prevQuestions=>prevQuestions.map(question=>question.id===questionId ?
      {...question, correctSelected: isCorrect} :
      question))
      console.log(questions)
  }

  function endQuiz(){
    setQuizEnded(true)
    let finalScore = 0
    //questions.forEach(question => question.correctSelected && finalScore++)
    for(let i=0; i<questions.length; i++){
      if(questions[i].correctSelected)
        finalScore++
    }
    setScore(finalScore)
    //console.log(score)
  }


  return (
    <main>
      {questions.length > 0 ? 
        <div className='quiz'>
          <div className='questions'>
            {renderQuestions()}
          </div>
          <div className='results'>
            {quizEnded && `Score: ${score}/${questions.length}`}
            <button className='quiz__button' onClick={quizEnded ? getNewQuestions : endQuiz}>
              {quizEnded ? "Start new quiz" : "Check answers"}
            </button>
          </div>
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
