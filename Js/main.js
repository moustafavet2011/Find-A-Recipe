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
    if (data.hits.length==0 || searchQuery=="" || searchQuery== null){
        document.querySelector(".error-message").style.display = "block";
        searchResultsDiv.innerHTML="";
    }
    else{

    generateHTML(data.hits);
    document.querySelector(".error-message").style.display = "none";
    console.log(data.hits);
}

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
            <div class="details">
            <p class="ingredients">${result.recipe.ingredients.map(ing =>{
                return `${ing.text} <br/>`;
            })}</p>
            <span class="close-span" id="close-span">X</span>
        </div>
        <div class="recipe-box-2">
            <p class="calories">Calories : ${Math.round(result.recipe.calories)} Cal</p>
            <a class="visit-site" href="${result.recipe.url}" target="_blank">Visit Site</a>
        </div>

    </div>
    </div>


        `

    });
    searchResultsDiv.innerHTML = generatedHTML;

    let viewIngredients = document.querySelectorAll(".item .recipe-box-1 .view-recipe");
    let ingredientsBox = document.querySelectorAll(".item .details");
    let closeSpan = document.querySelectorAll(".details .close-span");

    for(let i = 0; i < viewIngredients.length; i++){
        viewIngredients[i].onclick= function(){
        if(viewIngredients[i].classList.contains("show")){

        }else{

            for(let j = 0 ; j< ingredientsBox.length; j++){
                if(ingredientsBox[j].classList.contains("show")){

                }else{
                    ingredientsBox[i].classList.add("show");


                    for(let m =0; m < closeSpan.length; m++){
                        closeSpan[m].addEventListener("click", ()=>{
                            ingredientsBox[i].classList.remove("show");
                        });
                        }

                }
            }
        }
    }
    }


}

