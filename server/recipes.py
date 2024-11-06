import sqlite3

def dict_factory(cursor, row):
 fields = []
 # Extract column names from cursor description
 for column in cursor.description:
    fields.append(column[0])

 # Create a dictionary where keys are column names and values are row values
 result_dict = {}
 for i in range(len(fields)):
    result_dict[fields[i]] = row[i]

 return result_dict

class RecipeDB:
    def __init__(self, filename):
        # Connect to DB file
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        # use the connection instance to perform db operations
        # create a cursor instance for the connection
        self.cursor = self.connection.cursor()

    def getAllRecipes(self):
        # now that we have an access point we can fetch all or one
        # ONLY applicables use of fetch is following a SELECT query
        self.cursor.execute("SELECT * FROM recipes")

        #fetches all the recipes
        recipes = self.cursor.fetchall()
        return recipes
    
    def getRecipe(self, recipe_id):
        data = [recipe_id]
        self.cursor.execute("SELECT * FROM recipes WHERE id = ?", data)
        recipe = self.cursor.fetchone()
        return recipe
    
    def createRecipe(self, name, image, recipe, ingredients, rating, time):
        data = [name, image, recipe, ingredients, rating, time]
        #add a new recipe to our db
        self.cursor.execute("INSERT INTO recipes(name,image,recipe,ingredients,rating,time)VALUES(?,?,?,?,?,?)", data)
        # save the insert
        self.connection.commit()

    def updateRecipe(self, recipe_id, name, image, recipe, ingredients, rating, time):
       data = [name, image, recipe, ingredients, rating, time, recipe_id]
       self.cursor.execute("UPDATE recipes SET name = ?, image = ?, recipe = ?, ingredients = ?, rating = ?, time = ? WHERE id = ?", data)
       self.connection.commit()

    def deleteRecipe(self, recipe_id):
        data = [recipe_id]
        self.cursor.execute("DELETE FROM recipes WHERE id = ?", data)
        self.connection.commit()