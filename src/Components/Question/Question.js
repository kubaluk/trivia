import { useState, useEffect } from 'react'
import './Question.css'
import Answer from '../Answer/Answer'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

function Question({id, title, correct, incorrect, onAnswerChange, quizEnded}){
	const [answers, setAnswers] = useState([])

	useEffect(()=>getAnswers(), [])

	useEffect(()=>{
		if(answers.length>0){
			const selectedAnswer = answers.find(answer => answer.isSelected === true)
			if(selectedAnswer){
				onAnswerChange(id, selectedAnswer.isCorrect)
			}
		}
	}, [answers.find(answer=>answer.isSelected)])

	function getAnswers(){
		const newAnswers = []
		newAnswers.push(createNewAnswer(correct, true))
		for(let i=0; i<incorrect.length; i++){
			newAnswers.push(createNewAnswer(incorrect[i], false))
		}
		const shuffledAnswers = shuffleAnswers(newAnswers)

		setAnswers(shuffledAnswers)
	}

	function shuffleAnswers(array) {
		let currentIndex = array.length,  randomIndex;
	
		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
	
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
			text: decode(answer),
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
		const answersMapped = answers.map(answer => { 
			return (
				<Answer 
					key={answer.id}
					id={answer.id} 
					text={answer.text} 
					selectAnswer={selectAnswer} 
					selected={answer.isSelected}
					quizEnded={quizEnded}
					isCorrect={answer.isCorrect}
				/>
			)
		})
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