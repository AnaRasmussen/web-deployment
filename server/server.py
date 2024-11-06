from flask import Flask, request
from recipes import RecipeDB

app = Flask(__name__)

@app.route("/recipes/<int:recipe_id>", methods=["OPTIONS"])
def handle_cors_options(recipe_id):
    return "", 204, {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "PUT, DELETE",
        "Access-Control-Allow-Headers" : "Content-Type"
    }

@app.route("/recipes", methods=["GET"])
def retrieve_recipes():
    db = RecipeDB("recipes_db.db")
    return db.getAllRecipes(), 200, {
        "Access-Control-Allow-Origin" : "*"
    }

@app.route("/recipes/<int:recipe_id>", methods=["GET"])
def retrieve_recipe(recipe_id):
    db = RecipeDB("recipes_db.db")
    if db.getRecipe(recipe_id):
        return db.getRecipe(recipe_id), 200, {
            "Access-Control-Allow-Origin" : "*"
        }
    else:
        return f"Recipe with {recipe_id} not found", 404, {"Access-Control-Allow-Origin" : "*"}

@app.route("/recipes", methods=["POST"])
def create_recipe():
    print("POST request received!")
    db = RecipeDB("recipes_db.db")
    print("The request data is: ", request.form)
    
    name = request.form["name"]
    image = request.form["image"]
    recipe = request.form["recipe"]
    ingredients = request.form["ingredients"]
    rating = request.form["rating"]
    time = request.form["time"]
    db.createRecipe(name, image, recipe, ingredients, rating, time)
    
    return "Created", 201, {"Access-Control-Allow-Origin" : "*"}

@app.route("/recipes/<int:recipe_id>", methods=["PUT"])
def update_recipe(recipe_id):
    print("Update coaster with ID ", recipe_id)
    db = RecipeDB("recipes_db.db")
    recipe = db.getRecipe(recipe_id)
    if recipe:
        name = request.form["name"]
        image = request.form["image"]
        recipe = request.form["recipe"]
        ingredients = request.form["ingredients"]
        rating = request.form["rating"]
        time = request.form["time"]
        db.updateRecipe(recipe_id, name, image, recipe, ingredients, rating, time)
        return "Update", 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"Recipe with {recipe_id} not found", 404, {"Access-Control-Allow-Origin" : "*"}
    
@app.route("/recipes/<int:recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    db = RecipeDB("recipes_db.db")
    if db.getRecipe(recipe_id):
        db.deleteRecipe(recipe_id)
        return "Deleted", 204, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"Recipe with {recipe_id} not found", 404, {"Access-Control-Allow-Origin" : "*"}

def run():
    app.run(port=8080, host='0.0.0.0')

if __name__ == "__main__":
    run()