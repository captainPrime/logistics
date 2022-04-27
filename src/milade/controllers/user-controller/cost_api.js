module.exports = async(req,res) => {
    try{
        const{distance, time, requestType, size, economy_choice} = req.body
        
        let rideBaseFare = 350
        let bikeBaseFare = 70

        if(requestType === "Bike"){
            if(distance <= 3) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 70})
            else if(distance == 4) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 100})

            else if(distance <= 5 && time <=11) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 100})
            
            else if(distance <= 5 && time <=13) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 150})
            
            else if(distance <= 5 && time <=20) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 170})

            else if(distance == 7 && time <=15) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 190})

            else if(distance == 7 && time <=19) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 200})

            else if(distance == 7 && time <=25) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 210})

            else if(distance == 9 && time <=17) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 220})

            else if(distance == 9 && time <=20) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 230})
           
            else if(distance == 9 && time <=25) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 240})
           
            else if(distance == 10 && time <=21) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 270})
            else if(distance == 10 && time <=30) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 300})
            else if(distance == 12 && time <=25) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 350})
            else if(distance == 12 && time <=35) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 400})
            else if(distance == 13 && time <=24) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 420})
            else if(distance == 13 && time <=45) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 450})
            else if(distance <=25) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 550})

            else if(distance >=26){
				let distances = distance * 12 ;
				let timeAmt = time * 15;
				let sumFare=  bikeBaseFare + distances + timeAmt
				
				return res.status(200).send({
					status: "OK",
					message: "Total cost",                    
					payload: sumFare
				})
			}
        }

        else if(requestType === "Delivery"){
            if(distance <= 3) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 70})
            else if(distance == 4) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 100})

            else if(distance <= 5 && time <=11) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 100})
            
            else if(distance <= 5 && time <=13) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 150})
            
            else if(distance <= 5 && time <=20) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 170})

            else if(distance == 7 && time <=15) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 190})

            else if(distance == 7 && time <=19) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 200})

            else if(distance == 7 && time <=25) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 210})

            else if(distance == 9 && time <=17) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 220})

            else if(distance == 9 && time <=20) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 230})
           
            else if(distance == 9 && time <=25) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 240})
           
            else if(distance == 10 && time <=21) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 270})
            else if(distance == 10 && time <=30) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 300})
            else if(distance == 12 && time <=25) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 350})
            else if(distance == 12 && time <=35) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 400})
            else if(distance == 13 && time <=24) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 420})
            else if(distance == 13 && time <=45) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 450})
            else if(distance <=25) return res.status(200).send({status: 'OK', message: 'Total cost', payload: 550})

            else if(distance >=26){
				let distances = distance * 12 ;
				let timeAmt = time * 15;
				let sumFare=  bikeBaseFare + distances + timeAmt
				
				return res.status(200).send({
					status: "OK",
					message: "Total cost",                    
					payload: sumFare
				})
			}
        }
        else if(requestType==="Ride" && economy_choice=="standard"){
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
        else{
            return res.status(400).send({
                status: "ERROR",
                message: "Request type not specified"
            })
        }
    }
    catch(error){
        return res.status(503).send({
            status: "ERROR",
            payload: error.message
        })
    }
}