import mealRecommendations from './mealRecommendations.json';

const INSTRUCTIONS = 'Pre-heat the oven to 180C/350F/Gas 4.'
+ 'Grease an 18cm/7in round cake tin, line the base with greaseproof paper and grease'
+ 'the paper Cream the butter and sugar together in a bowl until pale and fluffy.'
+ 'Beat in the eggs, one at a time, beating the mixture well between each one and'
+ 'adding a tablespoon of the flour with the last egg to prevent the mixture curdling.'
+ 'Sift the flour and gently fold in, with enough milk to give a mixture that falls'
+ 'slowly from the spoon. Fold in the lemon zest. Spoon...';

export const mealRecipeMock = {
  idMeal: '52900',
  strMeal: 'Madeira Cake',
  strDrinkAlternate: null,
  strCategory: 'Dessert',
  strArea: 'British',
  strInstructions: INSTRUCTIONS,
  strMealThumb: 'https://www.themealdb.com/images/media/meals/urtqut1511723591.jpg',
  strTags: 'Cake,Light,Baking,Desert',
  strYoutube: 'https://www.youtube.com/watch?v=-YDh4WEmK_E',
  strIngredient1: 'Butter',
  strIngredient2: 'Caster Sugar',
  strIngredient3: 'Eggs',
  strIngredient4: 'Self-raising Flour',
  strIngredient5: 'Milk',
  strIngredient6: 'Lemon',
  strIngredient7: 'Mixed Peel',
  strIngredient8: '',
  strIngredient9: '',
  strIngredient10: '',
  strIngredient11: '',
  strIngredient12: '',
  strIngredient13: '',
  strIngredient14: '',
  strIngredient15: '',
  strIngredient16: '',
  strIngredient17: '',
  strIngredient18: '',
  strIngredient19: '',
  strIngredient20: '',
  strMeasure1: '175g',
  strMeasure2: '175g',
  strMeasure3: '3',
  strMeasure4: '250g',
  strMeasure5: '3 tbs',
  strMeasure6: 'Zest of 1',
  strMeasure7: 'To Glaze',
  strMeasure8: '',
  strMeasure9: '',
  strMeasure10: '',
  strMeasure11: '',
  strMeasure12: '',
  strMeasure13: '',
  strMeasure14: '',
  strMeasure15: '',
  strMeasure16: '',
  strMeasure17: '',
  strMeasure18: '',
  strMeasure19: '',
  strMeasure20: '',
  strSource: 'https://www.bbc.co.uk/food/recipes/madeiracake_73878',
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

export const mealIngredientsMock = ['Butter - 175g', 'Caster Sugar - 175g',
  'Eggs - 3', 'Self-raising Flour - 250g', 'Milk - 3 tbs',
  'Lemon - Zest of 1', 'Mixed Peel - To Glaze'];

export const mealRecommendationsMock = mealRecommendations.drinks;
