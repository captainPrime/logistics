const Driver = require('../../models/driverschema');
const {Logger} = require('../../utils/index');


module.exports = async(req,res) => {
    try{
        const{id} = req.params
        const driver = await Driver.findOne({_id: id})
        const{vehicle_type,vehicle_license_image, vehicle_brand, vehicle_model, vehicle_year, vehicle_license_plate,
        vehicle_color,
        } = req.body

        if(!driver) return res.status(404).send({
            status: "ERROR",
            message: 'Driver not found'
        })
        else{
            await driver.updateOne({
                vehicle_license_image: vehicle_license_image || driver.vehicle_license_image,
                vehicle_type: vehicle_type || driver.vehicle_type,
                vehicle_brand: vehicle_brand || driver.vehicle_brand,
                vehicle_model: vehicle_model || driver.vehicle_model,
                vehicle_year: vehicle_year || driver.vehicle_year,
                vehicle_license_plate: vehicle_license_plate || driver.vehicle_license_plate,
                vehicle_color: vehicle_color || driver.vehicle_color,
            })
            return res.status(200).send({
                status: "OK",
                message: "Driver vehicle details updated successfully"
            })
        }
    }
    catch(error){
        return res.status(500).send({
            status: "ERROR",
            payload: error.message
        })
    }
}