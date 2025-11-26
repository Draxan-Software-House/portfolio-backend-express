import Product from '../models/Product.js';

const resp = (res, code, message) => res.status(code).json({ message });

const productController = {
  async index(req, res) {
    try {
      const page = req.query.page || 0;
      const prod = await Product.query().page(page,10);
      const rs = {
        status:201,
        message: "Products retrieved successfully"
      }
      return resp(res,201,rs);
    } catch (error) {
      const rs = {
        status: 500,
        message: "Error occured",
        error: error.message
      }
      return resp(res,500,rs);
    }
  },
  async store(req, res) {
    try {
      
    } catch (error) {
      
    }
  },
  async update(req,res){
    try {
      
    } catch (error) {
      
    }
  },
  async destroy(req,res){
    try {
      
    } catch (error) {
      
    }
  },
}

export default productController;