import './Answer.css'

function Answer({id, text, selectAnswer, selected}){
    const selectedStyle = {
        backgroundColor: "#D6DBF5",
        border: "none"
    }
    return (
        <div className='answer' onClick={() => selectAnswer(id)} style={selected ? selectedStyle : null}>
            <p className='answer__paragraph'>
                {text}
            </p>
        </div>
    )
}


export default Answer;