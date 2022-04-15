import React from 'react';
import Person from './components/Person'
import axios from 'axios'
import Form from './components/Form'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: ''
        }
        console.log('constructor')
    }

    componentDidMount() {
        console.log('did mount')
        axios.get('https://lit-wildwood-03772.herokuapp.com/api/persons').then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            this.setState({persons: response.data})
        })
    }

    handleNameChange = (event) => {
      console.log(event.target.value)
      this.setState({newName: event.target.value})
    }

    handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({newNumber: event.target.value})
    }

    deleteThis = (person) => {
        return () => {
            if (window.confirm(`poistetaanko ${person.name}`)){
                const url = `https://lit-wildwood-03772.herokuapp.com/api/persons/${person.id}`
                axios.delete(url).then(response => {
                console.log(response)
                this.componentDidMount()
                console.log(`${person.id} poistettu`)
            })}
            else{
                console.log(`${person.id} ei poistettu`)
            }
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        const nameObject = {
            name: this.state.newName,
            number: this.state.newNumber,
        }

        if (this.state.persons.some(x =>{return JSON.stringify(nameObject.number) === JSON.stringify(x.number)})){
            alert('Numero jo olemassa')
            this.setState({
                newName:'',
                newNumber: ''
            })
        }
        else{
            axios.post('https://lit-wildwood-03772.herokuapp.com/api/persons', nameObject).then(response => {
                this.setState({
                    persons: this.state.persons.concat(response.data),
                    newName: '',
                    newNumber: ''
                })
            })
        }
        console.log(this.state.persons)
    }

    render() {
        console.log('render')
        return (
        <div>
            <h2>Puhelinluettelo</h2>

            <Form newName={this.state.newName} newNumber={this.state.newNumber} addPerson={this.addPerson} 
            handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange}/> 

            <h2>Numerot</h2>

            <div>
                {this.state.persons.map(person =>
                <Person key={person.id} person={person} deleteThis={this.deleteThis(person)}/>)}
            </div>
        </div>
        )
    }
}

export default App