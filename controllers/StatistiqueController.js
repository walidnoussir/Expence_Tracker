import Transaction from "../models/Transaction";



export const getMonthStats=async(req,res,next)=>{
    try{
        const {month,year}=req.query;
        // ghadi n7ado start et end dyal mois

        const startDate=new Date(year,month - 1, 1)
        const endDate=new Date(year, month, 0,23,59,59);

        const transactions=await Transaction.find({
            date: {$gte: startDate , $lte: endDate}
        })

        const totalIncome=Transaction.filter(tr=>tr.type ==="income").reduce((sum,tr)=>sum+ tr.amount,0)

        const totalExpense=Transaction.filter(tr=>tr.type==="expense").reduce((sum,tr)=>sum +tr.amount,0)

        const balance=totalIncome - totalExpense

        res.json({month,year,totalIncome,totalExpense,balance})
    }catch(err){
        console.error(err)
        next(err)
    }
}