import React, {useEffect, useState} from 'react'
import axios from 'axios'
function RecordList1() {
    let res
    const [state, setstate] = useState('')
    useEffect(async ()=> {
        res = await axios.get('/records')
        setstate(res.data)
    },[])
    



    // DELETE RECORD FUNCTION
    const deleteRecord = async(id) =>{
        try {
            res = await axios.delete(`/records/${id}`)
            alert(res.data)
        } catch (error) {
            alert(error)
        }
    }
    


    
    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
                <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            
            {state && state.map((data)=>(
                <tr>
                    <td>{data.person_name}</td>
                    <td>{data.person_position}</td>
                    <td>{data.person_level}</td>
                    <td>
                        <button onClick={()=>deleteRecord(data._id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}

export default RecordList1
