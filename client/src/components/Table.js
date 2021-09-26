import React,{useEffect,useState} from 'react'
import { useReset,useEdit,useEditMode } from '../App';
import axios from 'axios';
const Table = () => {
    const [data,setData] = useState([]);
    const Reset = useReset()
    const Edit = useEdit()
    const EditMode = useEditMode()
    

    useEffect(() => {
        axios.get("http://localhost:3001/getAll")
        .then(res=>setData(res.data))
    }, [Reset.a])

    function handleDelete(e){
        axios.delete(`http://localhost:3001/delete${e}`)
        .catch(err=>console.log(err));
        Reset.b()
    }
    function handleEdit(e){
        axios.get(`http://localhost:3001/update${e}`)
        .then((res)=>  Edit.setEditData({...Edit.editData,Name:res.data[0].Name,Gender:res.data[0].Gender,eDOB:convert(res.data[0].DOB),s_id:res.data[0].s_id}))
        .catch(err=>console.log(err));
        EditMode.b(false)      
    }
    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    return (
        <div className="table">
           
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e)=>
                    <tr key={e.s_id}>
                        <td>
                            {e.Name}
                        </td>
                        <td>
                            {e.Gender}
                        </td>
                        <td>
                            {new Date(e.DOB).toLocaleDateString()}
                        </td>
                        <td>
                            <button onClick={()=>handleEdit(e.s_id)}>Edit</button>
                        </td>
                        <td>
                            <button onClick={()=>handleDelete(e.s_id)}>Delete</button>
                        </td>
                    </tr>
                    )}   
                </tbody>
                
            </table>
            
        </div>
    )
}
export default Table;