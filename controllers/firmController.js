// const Firm=require('../models/Firm')

// const Vendor=require('../models/Vendor')
// const multer=require('multer')
// const addFirm=async(req,res)=>{
//     try{
//         const {firmName,area,category,region,offer}=req.body

//     const image=req.file?req.file.filename:undefined

//     const upload=multer({storage:storage})


//     const vendor=await Vendor.findById(req.vendorId)
//      if(!vendor){
//         res.status(404).json({message:"vendor not found"})
//      }
//     const firm=new Firm({
//         firmName,area,category,region,offer,image,vendor:vendor._id
//     })

//     await firm.save()
//     }
//     catch(error){
//         console.error(error)
//         res.status(500).json({message:"error"})
//     }

// }

// module.exports={addFirm:[upload.single('image'),addFirm]}





// const Firm = require('../models/Firm');
// const Vendor = require('../models/Vendor');
// const multer = require('multer');
// const path = require('path');

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// const addFirm = async (req, res) => {
//   try {
//     const { firmName, area, category, region, offer } = req.body;
//     const image = req.file ? req.file.filename : undefined;

//     const vendor = await Vendor.findById(req.vendorId);
//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     const firm = new Firm({
//       firmName, area, category, region, offer, image, vendor: vendor._id
//     });

//     const savedFirm= await firm.save();
//     vendor.firm.push(savedFirm)

//     await vendor.save()
//     res.status(201).json({ message: "Firm added successfully", firm });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error adding firm" });
//   }
// }


// const deleteFirmById=async(req,res)=>{
//   try {
//       const firmid=req.params.firmid
//       const deletedProduct=await Firm.findByIdAndDelete(firmid)
//       if(!deletedProduct){
//           return res.status(404).json({error:"No product found"})
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//   }
// }

// module.exports = {
//   addFirm: [upload.single('image'), addFirm,deleteFirmById]
// };






const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if(vendor.firm.length>0){
      return res.status(400).json({message:"vendor can have only one firm"})
    }

    const firm = new Firm({
      firmName, area, category, region, offer, image, vendor: vendor._id
    });

    const savedFirm = await firm.save();

    const firmid=savedFirm._id

    vendor.firm.push(savedFirm);

    await vendor.save();

    

    res.status(201).json({ message: "Firm added successfully", firmid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding firm" });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmid = req.params.firmid;
    const deletedFirm = await Firm.findByIdAndDelete(firmid);
    if (!deletedFirm) {
      return res.status(404).json({ error: "No firm found" });
    }
    res.status(200).json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addFirm: [upload.single('image'), addFirm],
  deleteFirmById
};
