import User from '../models/User.js';

const resp = (res, code, message) => res.status(code).json({ message });

const userController = {
  async index(req, res) {
    try {
      const user = await User.query().select(['name','email']);
      const rs = {
        status: 201,
        data : user
      };
      return resp(res,201,rs);
    } catch (error) {
      const rs = {
        status: 500,
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

export default userController;