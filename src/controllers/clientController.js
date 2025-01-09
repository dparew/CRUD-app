import * as clientService from "../services/clientServices.js"
export const getClients= async(req,res)=>{
    try{
        const clients= await clientService.getClients();
        res.status(200).json(clients);
    }catch(err){
        console.error('Error fetching clients',err);
        res.status(500).json({message:'Internal Server error'});
    }
}
export const createClient = async(req,res)=>{
    try{
        const clientData= req.body;
        const newClient= await clientService.createClient(clientData);
        res.status(200).json(newClient);
    }catch(err){
        console.error('Error adding clients',err);
        
        res.status(500).json({message:'Internal Server error'});
    }
}
export const updateClient = async(req,res)=>{
    try{
        const clientId= req.params.id;
        const clientData= req.body;
        const updatedClient= await clientService.updateClient(clientData,clientId);
        if(!updatedClient){
           return res.status(404).json({message:'client not found'}) ;
        }
        res.status(200).json(updatedClient);
    }catch(err){
        console.error('Error updating clients',err);
        
        res.status(500).json({message:'Internal Server error'});
    }
}
export const deleteClient = async(req,res)=>{
    try{
        const clientId= req.params.id;
        const deleted= await clientService.deleteClient(clientId);
        if(!deleted){
            return res.status(404).json({message:'client not found'});

        }
        res.status(200).json();
    }catch(err){
        console.error('Error deleting clients',err);
        
        res.status(500).json({message:'Internal Server error'});
    }
}
export const searchClients= async(req,res)=>{
    try{
        const searchTerm= req.query.q;//get the search term for the query parameter
        const clients = await clientService.searchClients(searchTerm);
        res.status(200).json(clients);
    }catch(err){
        console.error('Error searching clients:',err);
        res.status(500).json({message:'Internal server error'});
    }

}