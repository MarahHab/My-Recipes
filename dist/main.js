const renderer = new Render();

function searchRecipes() {
    const ingredient = $('#input-context').val();
    const dairy = $('#diaryFree').is(":checked");
    const gluten = $('#glutenFree').is(":checked");

    $.getJSON(`/recipes/${ingredient}?dairyFree=${dairy}&glutenFree=${gluten}`).then((recipes) => {
        renderer.display(recipes);

        $(".recipe-container img").on("click", function () {
            const index = $(this).closest(".recipe-container").index();
            const recipe = recipes.ingredient[index];

            const firstIngredient = recipe.ingredients[0];
            alert(`First Ingredient: ${firstIngredient}`);

        });
    });
}
