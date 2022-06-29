if (localStorage['dinner'] == undefined) {
  ingredientStorage = 'dinner'
  console.log(ingredientStorage)
} else {
  ingredientStorage = localStorage['dinner']
}

const button = document.querySelector('button')
const ingredientInput = document.querySelector('input')
const imageThumb = document.querySelectorAll('.thumbnail')
const thumbTitle = document.querySelectorAll('.thumbnail-header')
const search = document.querySelector('.search')
let recipeSummary = document.querySelector('.recipe-summary')
let recipeImages = document.querySelector('.recipe-images')


//OLD SEARCH
const getRecipe = async () => {
  let ingredient = ingredientStorage
  let findRecipe = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=218e6a8e&app_key=900ce9d6818c4e1417a4bc410a2829b0`)
  const recipeResultsImages = () => {
    let searchResults = findRecipe.data.hits
    let resultsList = []
    for (let i = 0; i < searchResults.length; i++) {
      let recipeNames = findRecipe.data.hits[i].recipe.label
      let recipeLinks = findRecipe.data.hits[i].recipe.url
      // let recipeIngredients = findRecipe.data.hits[i].recipe.url



      resultsList.push(recipeNames)
      thumbTitle[i].innerText = resultsList[i]
      thumbTitle[i].href = recipeLinks






    }
  }
  recipeResultsImages()
}
getRecipe()

//NEW SEARCH
const getNewRecipe = async () => {
  let ingredient = ingredientInput.value
  let findRecipe = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=218e6a8e&app_key=900ce9d6818c4e1417a4bc410a2829b0`)
  localStorage.clear()
  //THIS MAKES THE DATA GLOBAL BETWEEN PAGES!!
  localStorage['dinner'] = ingredient
  const recipeResultsImages = () => {
    let searchResults = findRecipe.data.hits
    let resultsList = []
    for (let i = 0; i < searchResults.length; i++) {
      let recipeThumb = findRecipe.data.hits[i].recipe.image
      let recipeNames = findRecipe.data.hits[i].recipe.label
      let recipeLinks = findRecipe.data.hits[i].recipe.url
      resultsList.push(recipeNames)
      thumbTitle[i].innerText = resultsList[i]
      thumbTitle[i].href = recipeLinks
      // Alernate for placing an image instead... imageThumb[i].innerHTML = `<img src=${recipeThumb} alt = "recipe"/>`
      imageThumb[i].style.backgroundImage = `url(${recipeThumb})`
    }
  }
  recipeResultsImages()
}

button.addEventListener('click', getNewRecipe)