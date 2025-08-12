import { db } from '@/database/db';
import { categories } from '@/database/schema/categories';
import { Categories, NewCategories } from '@/modules/categories/@types/categoriesTypes';
import { eq } from 'drizzle-orm';

export async function findCategoryById(id: number): Promise<Categories | undefined> {
  const [category] = await db.select().from(categories).where(eq(categories.id, id));
  return category as Categories | undefined;
}

export async function findAllCategories(): Promise<Categories[]> {
  const categoriesList = await db.select().from(categories);
  return categoriesList as Categories[];
}

export async function insertCategory(data: NewCategories): Promise<Categories> {
  const [created] = await db.insert(categories).values(data).returning();
  return created as Categories;
}

export async function updateCategory(
  id: number,
  data: Partial<NewCategories>
): Promise<Categories | undefined> {
  const [updated] = await db.update(categories).set(data).where(eq(categories.id, id)).returning();
  return updated as Categories | undefined;
}

export async function deleteCategory(id: number): Promise<boolean> {
  const result = await db.delete(categories).where(eq(categories.id, id));
  return result.rowCount !== 0;
}
