import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const getRecipesByIngredients = async (ingredients) => {
  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        apiKey: API_KEY,
        ingredients: ingredients.join(','),
        number: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipeInformation = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe information:', error);
    throw error;
  }
};