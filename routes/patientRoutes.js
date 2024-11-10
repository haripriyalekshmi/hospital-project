// const express=require('express');
// const Patient=require('../model/patientModel');
// const router=express.Router();

// //create patient POST method
// router.post('/',async(req,res)=>
// {
//     const patient=new Patient(
//         {
//             name:req.body.name,
//             age:req.body.age,
//             gender:req.body.gender,
//             contact:req.body.contact,
//             treatment:req.body.treatment
//         }
//     );

//     try{
//         const newPatient=await patient.save();
//         res.status(201).json(newPatient);
//     }
//     catch(error)
//     {
//         res.status(400).json({error:error.message});
//     }
    
// });
// module.exports=router
const express = require('express');
const Patient = require('../model/patientModel');
const router = express.Router();

// Create patient POST method
router.post('/', async (req, res) => {
    const patient = new Patient({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        treatment: req.body.treatment
    });

    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        console.error('Error saving patient:', error); 
        res.status(400).json({ error: error.message });
    }
});

router.get('/',async(req,res)=>
{
    try{
        const patients=await Patient.find();
        res.json(patients);
    }
    catch(error)
    {
        res.status(400).json({error:error.message});
    }
})
//update patient
router.put('/:id',async(req,res)=>
{
    try{
        const updatedPatient=await Patient.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updatedPatient);
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
});
//delete patient
router.delete('/:id',async(req,res)=>
{
    try{
        await Patient.findByIdAndDelete(req.params.id,{new:true});
        res.json({message:"patient deleted"});
    }
    catch(error)
    {
        res.status(400).json({error:error.message});
    }
})

module.exports = router;
