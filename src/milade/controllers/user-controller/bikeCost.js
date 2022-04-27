module.exports = async(req,res) => {
    try{
        const{distance, time, requestType} = req.body
        let bikeBaseFare = 70
        if(requestType === "Bike"){
            if(distance <= 5) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 100})
            
            else if(distance <= 12){
                let distances = distance * 8;
                let timeAmt = time * 10;
                let sumFare=  bikeBaseFare + distances + timeAmt
    
                return res.status(200).send({
                    status: "OK",
                    message: "Total cost",
                    payload: sumFare
                })
            }
            else if(distance >=13){
                let distances = distance * 10 ;
                let timeAmt = time * 15;
                let sumFare=  bikeBaseFare + distances + timeAmt
    
                return res.status(200).send({
                    status: "OK",
                    message: "Total cost",
                    payload: sumFare
                })
            }
        }
    }
    catch(error){
        return res.status(500).send({
            status: 'ERROR',
            payload: error.message
        })
    }
}