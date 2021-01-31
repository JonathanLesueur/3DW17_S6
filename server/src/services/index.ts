import { Application } from '../declarations';
import ingredients from './ingredients/ingredients.service';
import recipes from './recipes/recipes.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(ingredients);
  app.configure(recipes);
}
