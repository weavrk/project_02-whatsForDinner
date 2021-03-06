const button = document.querySelector('button')
const ingredientInput = document.querySelector('input')
const imageThumb = document.querySelectorAll('.thumbnail')
const thumbTitle = document.querySelectorAll('.thumbnail-header')
const search = document.querySelector('.search')
let recipeSummary = document.querySelector('.recipe-summary')
let recipeImages = document.querySelector('.recipe-images')

localStorage.clear()

//pulls the images based on the search
const getRecipe = async () => {
  let ingredient = ingredientInput.value
  let findRecipe = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=218e6a8e&app_key=900ce9d6818c4e1417a4bc410a2829b0`)
  console.log(findRecipe)
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

button.addEventListener('click', getRecipe)




//DON'T NEED ANYMORE, BUT USEFUL TO KEEP-adds a link. removes old anchor with same class if present.
// const recipeInfoLink = () => {
//   let recipeInfoAnchor = document.createElement("a");
//   let secondSearch = document.querySelector('.recipe-overview')
//   if (secondSearch !== null) {
//     secondSearch.remove()
//     recipeInfoLink()
//   } else {
//     recipeInfoAnchor.href = "recipe_info.html";
//     recipeInfoAnchor.innerText = "recipe overview";
//     search.appendChild(recipeInfoAnchor).classList.add("recipe-overview");
//   }
// }


