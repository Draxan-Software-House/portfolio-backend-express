import User from '../models/User.js';

const resp = (res, code, message) => res.status(code).json({ message });

const adminController = {
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

export default adminController;