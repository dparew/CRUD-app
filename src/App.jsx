import {useState} from 'react'
import './App.css'
import Navbar from './components/navbar'
import Tablelist from './components/Tablelist'
import axios from 'axios'






import Modalform from './components/Modalform'
import daisyui from 'daisyui'

function App() {
  const[isOpen, setIsOpen]= useState(false);
  const[modalMode, setmodalMode]= useState("add");
  const[searchTerm, setSearchTerm]= useState('');
  const[clientData,setClientData]=useState(null);
  const handleOpen= (mode,client)=>{
    setClientData(client);
    setmodalMode(mode);

    setIsOpen(true);
  }
  const handleSubmit=async(newClientData)=>{

    if(modalMode==="add"){
      try{
        const response = await axios.post('http://localhost:3001/api/clients',newClientData);
        console.log('client added:',response.data);//log the response
        //optionally,update your state here to reflect the newly added client

      }catch(err){
        console.error('Error adding client',err);
      }
      console.log("modal mode add");
    }
    else{
      console.log("modal mode edit");
      console.log('updating client with Id:',clientData.id);//log the id being updated
      try{
        const response= await axios.put(`http://localhost:3001/api/clients/${clientData.id}`,newClientData);
        console.log('client updated',response.data);

      }catch(err){
        console.error('error updating client',err);
      }


    }
  }
  
 

  return(
    <>
      <Navbar onOpen={()=>handleOpen("add")}onSearch= {setSearchTerm} />
      <Tablelist handleOpen={handleOpen} searchTerm={searchTerm}/>
      <Modalform  isOpen={isOpen} OnSubmit={handleSubmit} onClose={()=>setIsOpen(false)}
      mode ={modalMode} clientData={clientData}/>

        
        
    </>
  )
}

export default App
