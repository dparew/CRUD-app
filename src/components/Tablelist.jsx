import axios from 'axios';
import {useState,useEffect} from 'react';



export default function Tablelist({handleOpen,searchTerm}) {
  const [tableData, setTableData]=useState([]);
  const [error, setError]= useState(null);
  useEffect(()=>{
    const fetchData= async ()=>{
      try{
        const response= await axios.get('http://localhost:3001/api/clients');
        setTableData(response.data);//set fetched data
      }catch(err){
        setError(err.message);
      }
      
      
    };
    fetchData();
  },[]);

  //filter the table data based on the search term
  const filteredData= tableData.filter(client=>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())||
    client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDelete= async(id)=>{
    const confirmDelete= window.confirm("are you sure you want to delete this client?")
    if(confirmDelete){
      try{
        await axios.delete(`http://localhost:3001/api/clients/${id}`);//api call to delete
        setTableData((prevData)=>prevData.filter(client=>client.id!==id));

      }catch(err){
        setError(err.message);

      }
    }
  }
    
  return (
    <>
      {error && <div className ="alert alert-error">{error}</div>}
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>email</th>
              <th>Job</th>
              <th>rate</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody className="hover">
            {/* row 1 */}
            {filteredData.map((client) => (
                 <tr key={client.id}>
                 <th>{client.id}</th>
                 <td>{client.name}</td>
                 <td>{client.email}</td>
                 <td>{client.job}</td>
                 <td>{client.rate}</td>
                 <td>
                    <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary`:`btn outline-primary`}`}>
                    {client.isactive ?'Active':'Inactive'}
                    </button>
                 </td>
                 <td>
                    <button onClick={()=>handleOpen('edit',client)} className=" btn btn-secondary ">Update</button>
                 </td>
                 <td>
                    <button  className="btn btn-accent" onClick={()=>handleDelete(client.id)}>Delete</button>
                 </td>

                 </tr>
            ))}
               


        
            
            
          </tbody>
        </table>
      </div>
    </>
  );
}
