export class CreateRecipeDto {
  title: string;
  category: string;
  recipeImageUrl: string;
  ingredients: string[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
}
