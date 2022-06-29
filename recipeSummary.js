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

const summaryTime = document.querySelectorAll('.summary-time')
const summaryIngredients = document.querySelectorAll('.summary-ingredients')



//OLD SEARCH
const getRecipe = async () => {
  let ingredient = ingredientStorage
  let findRecipe = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=218e6a8e&app_key=900ce9d6818c4e1417a4bc410a2829b0`)
  const recipeResultsImages = () => {
    let searchResults = findRecipe.data.hits
    let resultsList = []
    for (let i = 0; i < searchResults.length; i++) {
      const addRecipeList = () => {
        let recipeNames = findRecipe.data.hits[i].recipe.label
        let recipeLinks = findRecipe.data.hits[i].recipe.url
        resultsList.push(recipeNames)
        thumbTitle[i].innerText = resultsList[i]
        thumbTitle[i].href = recipeLinks
      }
      addRecipeList()

      const addTime = () => {
        let recipeTime = findRecipe.data.hits[i].recipe.totalTime
        let recipeTimeTag = document.createElement("a")
        recipeTimeTag.innerText = recipeTime
        summaryTime[i].appendChild(recipeTimeTag).classList.add("summary-info")
      }
      addTime()

      const addIngredients = () => {
        let recipeIngredients = findRecipe.data.hits[i].recipe.ingredients

        const runIngredientsLoop = () => {
          let ingredientsShell = []
          //iterate through the food's list and put in array
          for (let i = 0; i < recipeIngredients.length; i++) {
            let individualIngredients = recipeIngredients[i].food
            ingredientsShell.push(individualIngredients)
          }
          console.log(ingredientsShell)



          //for all array items create a list item
          for (let i = 0; i < ingredientsShell.length; i++) {
            let recipeIngredientsTag = document.createElement("li")
            recipeIngredientsTag.innerText = ingredientsShell[i]

            //include in that loop appending to the nth child to keep the loop from exiting
            let selectedRecipe = summaryIngredients[0]
            selectedRecipe.appendChild(recipeIngredientsTag).classList.add("summary-info")
          }





          //select next child






          let selectedRecipe = summaryIngredients[i]


          // summaryIngredients[i].appendChild(recipeIngredientsTag).classList.add("summary-info")








        }
        runIngredientsLoop()
      }
      addIngredients()
    }
  }
  recipeResultsImages()
}
getRecipe()





// const addIngredients = () => {
//   let recipeIngredients = findRecipe.data.hits[i].recipe.ingredients
//   console.log(recipeIngredients)

//   const runIngredientsLoop = () => {
//     let ingredientsShell = []
//     for (let i = 0; i < recipeIngredients.length; i++) {
//       let recipeIngredientsTag = document.createElement("li")
//       let individualIngredients = recipeIngredients[i].food
//       //returning an array of each recipe's food list
//       recipeIngredientsTag.innerText = individualIngredients
//       //adds the inner text to the list item


//       summaryIngredients[i].appendChild(recipeIngredientsTag).classList.add("summary-info")
//       console.log(individualIngredients)
//     }
//   }
//   runIngredientsLoop()
// }
// addIngredients()









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