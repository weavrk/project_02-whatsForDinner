
const button = document.querySelector('button')
const ingredientInput = document.querySelector('input')
const imageDiv = document.querySelector('div')


const getRecipe = async () => {
  let ingredient = ingredientInput.value
  let findRecipe = await axios.get(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=218e6a8e&app_key=900ce9d6818c4e1417a4bc410a2829b0`
  )
  console.log(findRecipe)
}

button.addEventListener('click', getRecipe)




// let recipePic = response.hits.recipe.images.SMALL
// imageDiv.innerHTML = `<img src=${recipePic} alt = "recipe"/>`