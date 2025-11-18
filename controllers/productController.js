import Product from '../models/Product';

const resp = (res, code, message) => res.status(code).json({ message });

const productController = {
  async index(req, res) {
    try {
      
      return resp()
    } catch (error) {
      
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