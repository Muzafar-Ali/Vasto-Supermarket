import { Router } from 'express';
import userRoutes from './user.route.js';

const v1Routes = Router();

v1Routes.use('/user', userRoutes);

export default v1Routes
