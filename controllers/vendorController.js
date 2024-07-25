// const Vendor=require('../models/Vendor')
// const jwt=require('jsonwebtoken')
// const dotEnv=require('dotenv')
// const bcrypt=require('bcryptjs')
// dotEnv.config()
// const secretKey=process.env.WhatIsYourName

// const vendorRegister=async(req,res)=>{
//     const {username,email,password}=req.body 

//     try{
//         const vendorEmail=await Vendor.findOne({email})
//         if(vendorEmail){
//             return res.status(400).json("Email already taken")
//         }
//         const hashedPassword=await bcrypt.hash(password,10)

//         const newVendor=new Vendor({
//             username,
//             email,
//             password: hashedPassword
//         })
//         await newVendor.save();
//         res.status(201).json({message:"Vendor registered successfully"})
//         console.log("registered")
//     } catch(error){
//         console.log(error)
//         res.status(500).json({error:"Internal server error"})
//     }
// }


// const vendorLogin=async(req,res)=>{
//     const {email,password}=req.body
    

//     try{
//         const vendor=await Vendor.findOne({email})
//         if(!vendor || !(await bcrypt.compare(password,vendor.password))){
//             return res.status(401).json({error:"Invalid username or password"})
//         }

//         const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})

//         res.status(200).json({success:"Login successfull",token})
//         console.log(email,"this is token",token)
//     } catch(error){
//         console.log(error)
//         res.status(500).json({error:"Internal server error"})
//     }
// }


// const getAllVendors=async(req,res)=>{
//     try{
//         const vendor=await Vendor.find().populate('firm');
//         res.json({vendor})
//     } catch(error){
//         console.log(error)
//         res.status(500).json({error:"Internal server error"})
//     }
// }


// const getVendorById=async(req,res)=>{
//     const vendorId=req.params.apple
//     try {
//         const vendor=await Vendor.findById(vendorId).populate('fi rm')
//         if(!vendor){
//             return res.status(404).json({error:"Vendor not found"})
//         }
//         const vendorFirmId=vendor.firm[0]._id
//         res.status(200).json({vendor,vendorFirmId})
//         console.log(vendorFirmId)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error:"Internal server error"})
//     }
// }




// module.exports= {vendorRegister,vendorLogin,getAllVendors,getVendorById}

















const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const bcrypt = require('bcryptjs');
dotEnv.config();
const secretKey = process.env.WhatIsYourName;

const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(201).json({ message: "Vendor registered successfully" });
        console.log("registered");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });
        
        const vendorId=vendor._id

        res.status(200).json({ success: "Login successful", token,vendorId });
        console.log(email, "this is token", token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllVendors = async (req, res) => {
    try {
        const vendor = await Vendor.find().populate('firm');
        res.json({ vendor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getVendorById = async (req, res) => {
    const vendorId = req.params.apple;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        const vendorFirmId = vendor.firm[0]?._id; // Optional chaining to avoid errors if firm is undefined
        res.status(200).json({vendorId, vendorFirmId });
        console.log(vendorFirmId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };
