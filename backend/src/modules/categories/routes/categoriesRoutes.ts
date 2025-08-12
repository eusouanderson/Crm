import {
  createCategoryHandler,
  deleteCategoryHandler,
  findAllCategoriesHandler,
  findCategoryByIdHandler,
  updateCategoryHandler,
} from '@/modules/categories/controllers/categoriesControllers';
import { Hono } from 'hono';

export const categoriesRoutes = new Hono();

categoriesRoutes.post('/create', createCategoryHandler);
categoriesRoutes.put('/update/:id', updateCategoryHandler);
categoriesRoutes.get('/find/:id', findCategoryByIdHandler);
categoriesRoutes.get('/list', findAllCategoriesHandler);
categoriesRoutes.delete('/delete/:id', deleteCategoryHandler);
