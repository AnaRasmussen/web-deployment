// source .venv/bin/activate
// python3 server/server.py

console.log("connected");

let recipeReviewWrapper = document.querySelector("#recipes-container");

let inputRecipeName = document.querySelector("#input-recipe-name");
let inputRecipeImage = document.querySelector("#input-recipe-image");
let inputRecipeRecipe = document.querySelector("#input-recipe-recipe");
let inputRecipeIngredients = document.querySelector("#input-recipe-ingredients");
let inputRecipeRating = document.querySelector("#input-recipe-rating");
let inputRecipeTime = document.querySelector("#input-recipe-time");

let editId = null;

let modal = document.getElementById('modal');

const apiUrl = window.location.protocol == 'file:'
    ? 'http://localhost:8080' // Local API server during development
    : ''; // Production API

function closeModal() {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

function openModal() {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function saveReview() {
    console.log("save button clicked");

    let data = "name=" + encodeURIComponent(inputRecipeName.value);
    data += "&image=" + encodeURIComponent(inputRecipeImage.value);
    data += "&recipe=" + encodeURIComponent(inputRecipeRecipe.value);
    data += "&ingredients=" + encodeURIComponent(inputRecipeIngredients.value);
    data += "&rating=" + encodeURIComponent(inputRecipeRating.value);
    data += "&time=" + encodeURIComponent(inputRecipeTime.value);
    console.log("data", data);

    let method = "POST";
    let url = apiUrl;
    if (editId) {
        method = "PUT";
        url = apiUrl + "/recipes/" + editId;
    }
    fetch(url, {
        method: method,
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        console.log("Recipe saved or updated!", response);
        recipeReviewWrapper.textContent = "";
        loadRecipesFromServer();
        clearForm();
        closeModal();
    });
}

function deleteRecipe(id) {
    if (confirm("Are you sure you want to delete this recipe?")) {
        fetch(apiUrl + `/recipes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function(response) {
            if (response.status === 204) {
                console.log(`Recipe with ID ${id} deleted successfully`);
                recipeReviewWrapper.textContent = "";
                loadRecipesFromServer();
            } else {
                console.log(`Failed to delete recipe with ID ${id}`);
            }
        });
    }
}

function addRecipeReview(id, name, image, recipe, ingredients, rating, time) {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');

    const starRating = document.createElement('p');
    starRating.innerHTML = "<strong>Rating:</strong> " + getStarRating(rating);

    recipeDiv.innerHTML = `
        <h3>${name}</h3>
        <img src="${image}" alt="${name}" class="recipe-image"/>
        <p><strong>Ingredients:</strong> ${ingredients}</p>
        <p><strong>Recipe:</strong> ${recipe}</p>
        <p><strong>Time:</strong> ${time} minutes</p>
        <hr>
    `;

    recipeDiv.appendChild(starRating);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    buttonContainer.appendChild(editButton);

    editButton.onclick = function () {
        console.log("Editing recipe with ID:", id);
        editId = id;
        inputRecipeName.value = name;
        inputRecipeImage.value = image;
        inputRecipeRecipe.value = recipe;
        inputRecipeIngredients.value = ingredients;
        inputRecipeRating.value = rating;
        inputRecipeTime.value = time;
        openModal();
    };

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    buttonContainer.appendChild(deleteButton);

    deleteButton.onclick = function () {
        console.log("Deleting recipe with ID:", id);
        deleteRecipe(id);
    };

    recipeDiv.appendChild(buttonContainer);

    recipeReviewWrapper.appendChild(recipeDiv);
}

function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<ion-icon name="star"></ion-icon>';
        } else {
            stars += '<ion-icon name="star-outline"></ion-icon>';
        }
    }
    return stars;
}

function loadRecipesFromServer() {
    fetch(apiUrl + "/recipes")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        data.forEach(recipe => {
            addRecipeReview(recipe.id, recipe.name, recipe.image, recipe.recipe, recipe.ingredients, recipe.rating, recipe.time);
        });
    });
}

function addNewRecipe(event) {
    event.preventDefault();
    saveReview();
}

function clearForm() {
    inputRecipeName.value = "";
    inputRecipeImage.value = "";
    inputRecipeRecipe.value = "";
    inputRecipeIngredients.value = "";
    inputRecipeRating.value = "";
    inputRecipeTime.value = "";
    editId = null;
}

// When the page first loads, do this...
window.onload = () => {
    const showFormButton = document.getElementById('show-recipe-form');
    const closeButton = document.querySelector('.close-button');
    const recipeForm = document.getElementById('recipe-form');

    showFormButton.addEventListener('click', () => {
        console.log("Add Recipe button clicked");
        clearForm();
        openModal();
    });

    closeButton.addEventListener('click', () => {
        closeModal();
        clearForm();
    });

    recipeForm.addEventListener('submit', addNewRecipe);

    loadRecipesFromServer();
};