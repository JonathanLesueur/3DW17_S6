import { Application } from '../declarations';
import products from './products/products.service';
import ingredients from './ingredients/ingredients.service';
import recipes from './recipes/recipes.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(products);
  app.configure(ingredients);
  app.configure(recipes);
}
