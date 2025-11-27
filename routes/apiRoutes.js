import express from 'express';
import auth from '../middleware/auth.js';
import rolePermission from '../middleware/rolePermission.js';
import userController from '../controllers/userController.js';
import adminController from '../controllers/adminController.js';
import productController from '../controllers/productController.js';
import categoryController from '../controllers/categoryController.js';

let verif = auth.verifyToken;

const apiRoutes = express.Router();
apiRoutes.use(auth.verifyToken);

//Users Admin only
apiRoutes.get("/dashboard", 
  rolePermission(["Admin", "view_dashboard"]), 
  adminController.index
);

//Users CRUD admin
apiRoutes.route('/user')
.get(
  userController.index
)
.post(
  userController.store
);
apiRoutes.route('/user/:id')
.put(
  userController.update
)
.delete(
  userController.destroy
);
// Products CRUD
apiRoutes.route('/product')
.get(
  productController.index
)
.post(
  productController.store
);
apiRoutes.route('/product/:id')
.put(
  productController.update
)
.delete(
  productController.destroy
);

// Category CRUD

export default apiRoutes;