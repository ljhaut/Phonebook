import React from "react"



const Person = ({person, deleteThis}) => {
    return(
        <div>
            {person.name} {person.number} <button onClick={deleteThis}>poista</button>
        </div>
    )
}

export default Person