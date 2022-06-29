
const button = document.querySelector('button')
const ingredientInput = document.querySelector('input')
const imageThumb = document.querySelectorAll('.thumbnail')
const thumbTitle = document.querySelectorAll('.thumbnail-header')
const search = document.querySelector('.search')


const recipeInfoLink = () => {
  let recipeInfoAnchor = document.createElement("a");
  let secondSearch = document.querySelector('.recipe-overview')
  if (secondSearch !== null) {
    secondSearch.remove()
    recipeInfoLink()
  } else {
    recipeInfoAnchor.href = "recipe_info.html";
    recipeInfoAnchor.innerText = "recipe overview";
    search.appendChild(recipeInfoAnchor).classList.add("recipe-overview");
  }
  // recipeInfoAnchor.addEventListener('click', recipeOverview)
}

const getRecipe = async () => {
  recipeInfoLink()
  let ingredient = ingredientInput.value
  ingredientResults.push(ingredient)
  let findRecipe = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=218e6a8e&app_key=900ce9d6818c4e1417a4bc410a2829b0`)
  console.log(findRecipe)
  let searchResults = findRecipe.data.hits
  let resultsList = []
  for (let i = 0; i < searchResults.length; i++) {
    let recipeThumb = findRecipe.data.hits[i].recipe.image
    let recipeNames = findRecipe.data.hits[i].recipe.label
    let recipeLinks = findRecipe.data.hits[i].recipe.url
    resultsList.push(recipeNames)
    thumbTitle[i].innerText = resultsList[i]
    thumbTitle[i].href = recipeLinks
    // Alernate if you want to place an image instead... imageThumb[i].innerHTML = `<img src=${recipeThumb} alt = "recipe"/>`
    imageThumb[i].style.backgroundImage = `url(${recipeThumb})`
  }
}
button.addEventListener('click', getRecipe)


//label
//total time
//ingredients
