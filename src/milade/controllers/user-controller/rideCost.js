module.exports = async(req,res) => {
    try{
        const{distance, time, requestType,economy_choice} = req.body
        let rideBaseFare = 350
        
        if(requestType==="Ride" && economy_choice=="standard"){
            if(distance <= 4) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 350})

            else if(distance == 5) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 400})

            else if(distance == 6) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 500})
            else if(distance == 7) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 600})
            else if(distance == 8) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 700})
            else if(distance == 9) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 800})
            else if(distance <= 12) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 900})
            else if(distance <= 15) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 1000})
            
            else if(distance >= 16){
                let distances = distance * 15;
                let timeAmt = time * 20;
                let sumFare= rideBaseFare + distances + timeAmt
    
                return res.status(200).send({
                    status: "OK",
                    message: "Total cost",
                    payload: sumFare
                })
            }
        }
        else if(requestType=="Ride" && economy_choice=="comfort2"){
            if(distance <= 4) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 550})

            else if(distance == 5) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 600})
            else if(distance == 6) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 700})
            else if(distance == 7) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 800})
            else if(distance == 8) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 900})
            else if(distance == 9) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 1000})
            else if(distance <= 12) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 1100})
            else if(distance <= 15) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 1200})
            
            else if(distance >= 16){
                let distances = distance * 15;
                let timeAmt = time * 20;
                let sumFare= rideBaseFare + distances + timeAmt + 200
    
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