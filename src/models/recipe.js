export class Recipe {
    constructor(id, name, ingredients, instructions, categories, preparationTime) {
        this.id = id;
        this.name = name;
        this.instructions = instructions;
        this.categories = categories; // מערך של קטגוריות
        this.preparationTime = preparationTime; // זמן הכנה בדקות
        this.ingredients = ingredients; // מערך של מרכיבים
    }
}


export const RecipeCategory = Object.freeze({
    EASY: 'קל',
    MEDIUM: 'בינוני',
    HARD: 'קשה',
    VEGAN: 'טבעוני',
    VEGETARIAN: 'צמחוני',
    GLUTEN_FREE: 'ללא גלוטן',
    SUGAR_FREE: 'ללא סוכר',
    LOW_CARB: 'דל פחמימות',
    MEAT: 'בשרי',
    DAIRY: 'חלבי',
    PARVE: 'פרווה',
  });
  
