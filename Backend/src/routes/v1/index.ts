import { Router } from 'express';
import userRoutes from './user.route.js';
import categoryRoutes from './category.route.js';
import subCategoryRoutes from './subCategory.route.js';

const v1Routes = Router();

v1Routes.use('/user', userRoutes);
v1Routes.use('/category', categoryRoutes);
v1Routes.use('/sub-category', subCategoryRoutes);

export default v1Routes
