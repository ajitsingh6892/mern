import React, {useState} from 'react'
import axios from 'axios'

function Create1() {

    const [state, setstate] = useState({
        person_name:'',
        person_position:'',
        person_level:''
    })

    //Destructuring state
    const { person_name, person_position, person_level } = state

    const handleChange = e => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        let newperson = {
            person_name, 
            person_position, 
            person_level
        }
        axios
        .post("/records/add", newperson)
        .then((res) => console.log(res.data))
        .then(()=>
        setstate({
                person_name:'',
                person_position:'',
                person_level:''
            })
        )
    }

    
    return (
        <div style={{ marginTop: 20 }}>
        <h3>Create New Record</h3>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Name of the person: </label>
            <input
              type="text"
              className="form-control"
              name="person_name"
              value={person_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Person's position: </label>
            <input
              type="text"
              className="form-control"
              name="person_position"
              value={person_position}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <select
                name="person_level"
                value={person_level}
                onChange={handleChange}>

                <option value="">Select Level</option>
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>

            </select>
            {/* <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                name="person_level"
                value="Intern"
                checked={this.state.person_level === "Intern"}
                onChange={handleChange}
              />
              <label className="form-check-label">Intern</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Junior"
                name="person_level"
                checked={this.state.person_level === "Junior"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Junior</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Senior"
                checked={this.state.person_level === "Senior"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Senior</label>
            </div> */}
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create person"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
}

export default Create1
