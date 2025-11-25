import express from 'express';
import auth from '../middleware/auth.js';
import rolePermission from '../middleware/rolePermission.js';
import userController from '../controllers/userController.js';
import productController from '../controllers/productController.js';
import categoryController from '../controllers/categoryController.js';

let verif = auth.verifyToken;

const apiRoutes = express.Router();
apiRoutes.use(auth);

//Users Admin only
apiRoutes.get("/dashboard", 
  rolePermission(["Admin", "view_dashboard"]), 
  adminController.index
);

//Users CRUD admin
apiRoutes.get("/user", 
  rolePermission(["Admin", "manage_user"]),
  userController.index
);
apiRoutes.post("/user", 
  rolePermission(["Admin", "manage_user"]),
  userController.store
);
apiRoutes.put("/user/:id", 
  rolePermission(["Admin", "manage_user"]),
  userController.update
);
apiRoutes.delete("/user/:id", 
  rolePermission(["Admin", "manage_user"]),
  userController.destroy
);

export default apiRoutes;