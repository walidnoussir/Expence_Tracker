import Transaction from '../models/Transaction.js'



export const getTransactionById=async (req,res,next)=>{
    try{
         console.log("ID reçu:", req.params.id);
        const transaction=await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).json({message:"transaction non trouvé "})

        }
        res.json(transaction)

    }catch(err){
        console.error(err);
        next(err)

    }
}