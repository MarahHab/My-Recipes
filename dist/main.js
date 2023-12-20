const renderer = new Render();

function searchRecipes() {
    const ingredient = $('#input-context').val();
    const dairyFree = $('#diaryFree').is(":checked");
    const glutenFree = $('#glutenFree').is(":checked");
    const vegetarian = $('#unvegetarianFree').is(":checked");

    $.getJSON(`/recipes/${ingredient}?dairyFree=${dairyFree}&glutenFree=${glutenFree}&unvegetarianFree=${vegetarian}`).then((recipes) => {
 
        recipes.unvegetarianFree = vegetarian;
        recipes.glutenFree = glutenFree
        recipes.dairyFree = dairyFree
        renderer.display(recipes);
    });


}