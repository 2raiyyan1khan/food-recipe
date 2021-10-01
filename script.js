const appKey = "c4fc4494e57a24c89b7f91b061f68f34";
const appId = "68118e34";
const main = document.querySelector("main");
const form = document.querySelector("form");
const searchInput = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value !== "") {
    getRecipe(searchInput.value);
  } else {
    alert("Please enter recipe to search!");
  }
  searchInput.value = "";
});

async function getRecipe(searchInput) {
  let items = await fetchRecipe(searchInput);
  let { hits } = items;
  ui(hits);
}
async function fetchRecipe(searchInput) {
  let recipe = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${appId}&app_key=${appKey}`
  )
    .then((res) => res.json())
    .catch((err) => alert(err.message));
  return recipe;
}

function ui(items) {
  console.log(items);
  items.map((item) => {
    console.log("i", item.recipe.label);
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
         <img src=${item.recipe.image} alt=${item.recipe.label} />
         <div class="body">
           <h4>
            <a href=${item.recipe.url} target="_blank">
            ${item.recipe.label} </a>
          </h4>
           <div>
             <p>Diet Label : <span>${item.recipe.dietLabels}</span></p>
             <p>Health Label : 
             <span>${item.recipe.healthLabels.splice(0, 4)}</span>
             </p>
             <p>Calories : <span>${item.recipe.calories.toFixed(4)}</span></p>
           </div>
           <span class="cuisineType text-small">${
             item.recipe.cuisineType
           }</span>
         </div>
    `;
    main.appendChild(div);
  });
}
