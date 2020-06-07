## recip-ez

MERN stack application allowing users to browse for recipes and save them to their own collection. State management is handled via Redux.

Recipe information is obtained via the Spoonacular API (https://spoonacular.com/food-api).

The application is also connected to a MongoDB database, in order to store user accounts and to allow users to save their own recipes. Only the basic information is saved in the database - just the Spoonacular recipe ID and title - then a call is made to Spoonacular when the user views their saved recipes in order for the 'full' recipe information to be saved.

Each recipe ingredient also contains links to search entries on Tesco, Morrisons and Asda so that users can purchase them if required.

The 'browse recipes' area only returns 10 random recipes at a time, largely due to daily restrictions on the number of API calls to Spoonacular on their free tier. Ideally this would return a much larger number of recipes - currently users will need to refresh the page in order to load more recipes.

The app is hosted on Heroku and can be accessed here: **https://ksells-recip-ez.herokuapp.com/**

![Showcase1](/showcase-1.png?raw=true "Showcase1")
![Showcase2](/showcase-2.png?raw=true "Showcase2")
![Showcase3](/showcase-3.png?raw=true "Showcase3")

Known issue - due to how the loading state is set, if a user has no saved recipes, the 'My Recipes' page constantly shows the loading icon. The application behaves normally once the user saves their first recipe.
