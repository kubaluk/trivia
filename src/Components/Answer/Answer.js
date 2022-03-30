import './Answer.css'

function Answer({id, text, selectAnswer, selected, quizEnded, isCorrect}){
  let color = ""
  if(quizEnded){
    if(selected){
      color = isCorrect ? "#94D7A2" : "#F8BCBC"
    }
    else{
      color = isCorrect && "#94D7A2"
    }
  }
  else{
    color = selected? "#D6DBF5" : "#F5F5F5"
  } 

  const border = selected || quizEnded && isCorrect ? "none" : "1px solid #4d5b9e"
  const opacity = quizEnded ? isCorrect ? 1 : 0.5 : 1
  const cursor = quizEnded ? "auto" : "pointer"

  const style = {
    backgroundColor: color,
    border: border,
    opacity: opacity,
    cursor : cursor
  }
	
  return (
    <div className='answer' onClick={!quizEnded ? () => selectAnswer(id) : null} style={style}>
      <p className='answer__paragraph'>
        {text}
      </p>
    </div>
  )
}


export default Answer