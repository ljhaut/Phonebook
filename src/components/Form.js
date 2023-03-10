import React from "react";

const Form =({newName, newNumber, addPerson, handleNameChange, handleNumberChange}) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                nimi:<input
                value={newName}
                onChange={handleNameChange}
                />
            </div>
            <div>
                numero: <input
                value={newNumber}
                onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default Form