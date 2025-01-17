// const Product=require('../models/Product')
// const multer=require('multer');
// const Vendor = require('../models/Vendor');
// const Firm = require('../models/Firm');

// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
//     }
//   });
  
//   const upload = multer({ storage: storage });


//   const addProduct=async(req,res)=>{
//         try {
//             const {productName,price,category,bestseller,description}=req.body
//             const image =req.file?filename:undefined
//             const firmid=req.params.firmid

//             const firm=await Firm.findById(firmid)
//             if(!firm){
//                 return res.status(404).json({error:"No firm found"})
//             }

//             const product=new Product({
//                 productName,price,category,bestseller,description,image,firm: firm._id
//             })
            
//             const savedProduct=await product.save()
//             firm.products.push(savedProduct)
//             await firm.save()
//             res.status(200).json(savedProduct)
//         } catch (error) {
//             console.error(error)
//             res.status(500).json({error:"Internal server error"})
//         }
//   }

//   const getProductByFirm=async(req,res)=>{
//     try {
//         const firmid=req.params.firmid
//         const firm=await Firm.findById(firmid)
//         if(!firm){
//             return res.status(404).json({error:"no Firm found"})
//         }
//         const products=await Product.find({firm:frimid})
//         res.status(200).json(products)
//     } catch (error) {
//         console.error(error)
//             res.status(500).json({error:"Internal server error"})
//     }
//   }


//   module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm}















const Product = require('../models/Product');
const multer = require('multer');
const path = require('path'); // Ensure the path module is required
const Vendor = require('../models/Vendor');
const Firm = require('../models/Firm');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined; // Correctly handle the filename
    const firmid = req.params.firmid;

    const firm = await Firm.findById(firmid);
    if (!firm) {
      return res.status(404).json({ error: "No firm found" });
    }

    const product = new Product({
      productName,
      price,
      category,
      bestseller,
      description,
      image,
      firm: firm._id
    });

    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductByFirm = async (req, res) => {
  try {
    const firmid = req.params.firmid;
    const firm = await Firm.findById(firmid);
    if (!firm) {
      return res.status(404).json({ error: "No Firm found" });
    }
    const restaurantName=firm.firmName;
    const products = await Product.find({ firm: firmid }); // Fix typo here
    res.status(200).json({restaurantName,products});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const deleteProductById=async(req,res)=>{
//     try {
//         const productId=req.params.productId
//         const deletedProduct=await Product.findByIdAndDelete(productId)
//         if(!deletedProduct){
//             return res.status(404).json({error:"No product found"})
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }


const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "No product found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById };








module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm ,deleteProductById};
