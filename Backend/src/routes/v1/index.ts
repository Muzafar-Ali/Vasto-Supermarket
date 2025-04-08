import { Router } from 'express';
import userRoutes from './user.routes.js';
import categoryRoutes from './category.routes.js';
import subCategoryRoutes from './subCategory.routes.js';
import productRoutes from './product.routes.js';
import cartRoutes from './cart.routes.js';
import orderRoutes from './order.routes.js';

const v1Routes = Router();

v1Routes.use('/user', userRoutes);
v1Routes.use('/category', categoryRoutes);
v1Routes.use('/sub-category', subCategoryRoutes);
v1Routes.use('/product', productRoutes);
v1Routes.use('/cart', cartRoutes);
v1Routes.use('/order', orderRoutes);

export default v1Routes
