import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recipes';

const getStoredRecipes = async () => {
    try {
        const recipes = await AsyncStorage.getItem(STORAGE_KEY);
        return recipes ? JSON.parse(recipes) : [];
    } catch (error) {
        console.error('Error reading recipes:', error);
        return [];
    }
};

const saveRecipes = async (recipes) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (error) {
        console.error('Error saving recipes:', error);
    }
};

export const getRecipes = async () => {
    return await getStoredRecipes();
};

export const getRecipeById = async (id) => {
    const recipes = await getStoredRecipes();
    return recipes.find(recipe => recipe.id === id);
};

export const addRecipe = async (recipe) => {
    const recipes = await getStoredRecipes();
    recipes.push(recipe);
    await saveRecipes(recipes);
};

export const updateRecipe = async (updatedRecipe) => {
    const recipes = await getStoredRecipes();
    const updatedRecipes = recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    await saveRecipes(updatedRecipes);
};

export const deleteRecipe = async (id) => {
    const recipes = await getStoredRecipes();
    const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
    await saveRecipes(filteredRecipes);
};

export const getRecipesByCategory = async (category) => {
    const recipes = await getStoredRecipes();
    return recipes.filter(recipe => recipe.categories.includes(category));
};

export const getRecipesByPreparationTime = async (maxTime) => {
    const recipes = await getStoredRecipes();
    return recipes.filter(recipe => recipe.preparationTime <= maxTime);
};
