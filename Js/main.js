//call the vars
const container = document.querySelector(".container");
const searchForm = document.querySelector("form");
const searchResultsDiv = document.querySelector(".results");



let searchQuery = "";

const APP_ID = "f32bc960";
const APP_Key = "e031c35a3a0b0bc6390d6e12d006204f";



searchForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    
    fetchAPI();

});

async function fetchAPI() {
    const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&to=20`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    
    generateHTML(data.hits);
    console.log(data);


}

function generateHTML(results) {
    let generatedHTML = "";
    results.map(result =>{
        generatedHTML +=

        `

        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="recipe-box-1">
            <h1 class="title">${result.recipe.label}</h1>
            <span class="view-recipe">Ingredients</span>
        </div>
        <div class="recipe-box-2">
            <p class="calories">Calories : ${Math.round(result.recipe.calories)} Cal</p>
            <a class="visit-site" href="${result.recipe.url}" target="_blank">Visit Site</a>
        </div>
        <div class="details">
        <p class="ingredients">${result.recipe.ingredientLines}</p>
        <span>X</span>
    </div>
    </div>



        `
        //console.log(generatedHTML);

    });
    searchResultsDiv.innerHTML = generatedHTML;

    // let viewIngredients = document.querySelectorAll(".item .recipe-box-1 .view-recipe");
    // let ingredientsBox = document.querySelector(".item .details");



    // viewIngredients.forEach(viewIngredient => {
        
    //     viewIngredient.onclick = function(){
    //         ingredientsBox.classList.add("show");
    //     }
    // });
}

// let viewRecipes = document.querySelector(".recipe-box-1 .view-recipe");
// let showIngredients = document.querySelector(".item .details");
// let closeIngredients = document.querySelector(".details span");

// viewRecipes.addEventListener("click", function() {
//     //showIngredients.classList.add("show");
//     console.log("hello");
// })