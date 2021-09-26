import React,{useState,useContext} from 'react';
import './App.css';
import Form from "./components/Form"
import Table from "./components/Table"


const Reset = React.createContext();
const Edit = React.createContext();
const EditMode = React.createContext();

export function useReset(){
  return useContext(Reset)
}
export function useEdit(){
  return useContext(Edit)
}
export function useEditMode(){
  return useContext(EditMode)
}
function App() {
const [reset,SetReset] = useState(0);
const [edit,setEdit] = useState({ Name:"",
                                  Gender:"",
                                  eDOB:'',
                                  s_id:""
                                });
const [editName,setEditName] = useState('');
const [editGender,setEditGender] = useState('');
const [editDob,setEditDob] = useState();
const [editMode,setEditMode] = useState(false);

const toggle = (e)=>{
  SetReset(!reset)
}
const toggle2 = (e)=>{
  setEditMode(!e)
}

  return (
    <div className="App">
    <EditMode.Provider value={{a:editMode,b:toggle2}}>
     <Reset.Provider value={{a:reset,b:toggle}}>
       <Edit.Provider value={{editData:edit,setEditData:setEdit,
                              Name:editName,setName:setEditName,
                              Gender:editGender,setGender:setEditGender,
                              DOB:editDob,setDOB:setEditDob
                              }}>
        <Form/>
        <Table/>
       </Edit.Provider>
     </Reset.Provider>
    </EditMode.Provider>
    </div>
  );
}

export default App;
