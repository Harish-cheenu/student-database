import React,{useState} from 'react'
import { useReset,useEdit,useEditMode } from '../App';
import axios from "axios"
import {AiFillGithub} from "react-icons/ai"


const Form = () => {
    const Reset = useReset()
    const Edit = useEdit()
    const EditMode = useEditMode()
    const [name,setName] = useState("")
    const [dob,setDob] = useState("")
    const [gender,setGender] = useState("")
    
    function Add(e){
        e.preventDefault()
        axios.post("http://localhost:3001/Add",{
            name:name,
            dob:dob,
            gender:gender
        })
        .then(res=>console.log("success "))
        .then(res=>Reset.b())
    }

    function handleEdit(){
        axios.post(`http://localhost:3001/edit${Edit.editData.s_id}`,{
            Name: Edit.editData.Name,
            Gender: Edit.editData.Gender,
            Dob: Edit.editData.eDOB
        })
        .then(res=>console.log("Edit Success"))
        .catch(err=>console.log(err))
        Reset.b()   
        EditMode.b(true)
        setDob('');setGender('');setName('');
    }

    return (
        <div>{console.log("Edit...."+Edit.editData.s_id)}{console.log(EditMode.a)}{console.log("Add"+name+gender+(dob))}
            <form className="form" onSubmit={e=>Add(e)}>
                <div className="form-item form-name">
                    <label >Name : </label>
                    <input className="form-name-in form-in" type="text" 
                    value={EditMode.a?Edit.editData.Name:name}  
                    onChange={(e)=>EditMode.a?Edit.setEditData({...Edit.editData,Name:(e.target.value)}):setName(e.target.value)} 
                    placeholder="Full Name" required maxLength="25" />
                </div>
                <div className="form-item form-gender">
                    <label >Gender : </label>
                    <select className="form-in" 
                    onChange={(e)=>EditMode.a?Edit.setEditData({...Edit.editData,Gender:(e.target.value)}):setGender(e.target.value)} 
                    required>
                        <option value={EditMode.a?Edit.editData.Gender:gender}>{EditMode.a?Edit.editData.Gender:""}</option>
                        <option value="Male"  >Male</option>
                        <option value="Female" >Female</option>
                    </select>
                </div>
                <div className="form-item form-dob">
                    <label >DOB : </label>
                    <input className="form-in" type="Date" 
                    value={EditMode.a?((Edit.editData.eDOB)):dob} 
                    onChange={(e)=>EditMode.a?Edit.setEditData({...Edit.editData,eDOB:(e.target.value)}):setDob(e.target.value)} 
                    required/> 
                </div>
                {/* {EditMode.a?<button type="button" onClick={handleEdit}>Edit</button>:<button type="submit" >Add</button>} */}
                <button type="submit" >Add</button>
                <hr/>
                <button type="button" onClick={handleEdit}>Edit</button>
                
            </form>  
            <div className="git-icon">
                <a href={"#top"}><AiFillGithub size={34} /></a>
            </div>
        </div>
    )
}
export default Form;