import {useState, useEffect} from 'react'
import './Question.css'
import Answer from '../Answer/Answer'
import {nanoid} from 'nanoid'

function Question({title, correct, incorrect}){
	const [answers, setAnswers] = useState([])

	useEffect(()=>getAnswers(), [title])

	function getAnswers(){
		const newAnswers = []
		newAnswers.push(createNewAnswer(correct, true))
		for(let i=0; i<3; i++){
			newAnswers.push(createNewAnswer(incorrect[i], false))
		}
		const shuffledAnswers = shuffleAnswers(newAnswers)

		setAnswers(shuffledAnswers)
	}

	function shuffleAnswers(array) {
		let currentIndex = array.length,  randomIndex;
	
		// While there remain elements to shuffle...
		while (currentIndex != 0) {
	
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
	
			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]]
		}
	
		return array;
	}


	function createNewAnswer(answer, isCorrect){
		const newAnswer = {
			id: nanoid(),
			text: answer,
			isCorrect: isCorrect,
			isSelected: false
		}
		return newAnswer
	}

	function selectAnswer(answerId){
		setAnswers(prevAnswers => prevAnswers.map(
				answer => answer.id === answerId ? 
				{...answer, isSelected: !answer.isSelected} 
				: 
				answer.isSelected === true ? {...answer, isSelected: false} : answer
		))
	}
	
	function renderAnswers(){
		const answersMapped = answers.map(answer => { return (
			<Answer 
					key={answer.id}
					id={answer.id} 
					text={answer.text} 
					selectAnswer={selectAnswer} 
					selected={answer.isSelected}
			/>
		)})
		return answersMapped
	}

	return (
		<div className='question'>
			<h2 className='question__title'>{title}</h2>
			<div className='answers'>
				{renderAnswers()}
			</div>
			<hr className='question__separator'/>
		</div>
	)
	
}

export default Question