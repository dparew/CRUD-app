import {useState,useEffect} from "react"
export default function Modalform({ isOpen, onClose, mode, OnSubmit,clientData}) {
  const [rate, setRate]= useState("");
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [job, setJob]= useState("");
  const [status, setStatus]= useState(false);
  //handle the change of status
  const handleStatusChange=(e)=>{
    setStatus(e.target.value==="Active");
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
       const clientData= {name,email,job,rate:Number(rate),isactive:status}
       await OnSubmit(clientData)
       onClose();
    }catch(err){
      console.error('error adding the client',err);
    }
    onClose();
  }
  useEffect(()=>{
    if(mode==='edit'&&clientData){
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.isActive);
    }else{
      //reset fields while adding a new client
      setName('');
      setEmail('');
      setJob('');
      setRate('');
      setStatus(false);
    }
  },[mode,clientData]);
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Client" : "Client Details"}
          </h3>
          <form method="dialog" onSubmit ={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input type="text" className="grow" value={name} onChange={(e)=>setName(e.target.value)} />
            </label>
            <label className="input input-bordered  my-4 flex items-center gap-2">
              email
              <input type="text" className="grow" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </label>
            <label className="input input-bordered  my-4 flex items-center gap-2">
              job
              <input type="text" className="grow" value={job} onChange={(e)=>setJob(e.target.value)} />
            </label>
            <div className="flex mb-4 justify-between">
              <label className="input input-bordered mr-4 my-4 flex items-center gap-2">
                rate
                <input type="number" className="grow" value={rate} onChange={(e)=>setRate(e.target.value)} />
              </label>
              <select value ={status?'Active':'Inactive'} className="select select-bordered mt-4 w-full max-w-xs" onChange={handleStatusChange}>
                
                <option>Inactive</option>
                <option>Active</option>
              </select>
            </div>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <button className="btn btn-success">
              {mode === "edit" ? "Save Changes" : "Add client"}
            </button>
          </form>
          
          <p className="py-4"></p>
        </div>
      </dialog>
    </>
  );
}
