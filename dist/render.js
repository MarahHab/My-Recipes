class Render {
    display(recipes) {
        $(".menu").empty();
        

        const source = $("#recipe-template").html();
        const template = Handlebars.compile(source);
        let html = template(recipes);
        $(".menu").append(html);
    
        
        if (recipes.unvegetarianFree) {
            $(".recipe-container").each(function (index) {
                $(this).append('<img id="vegetarian-icon" src="assets/vegetarian.jpg" alt="Vegetarian Icon">');
            });
        }

        if (recipes.glutenFree) {
            $(".recipe-container").each(function (index) {
                $(this).append('<img id="glutenFree-icon" src="assets/glutenFree.jpg" alt="Gluten-Free Icon">');
            });
        }

        if (recipes.dairyFree) {
            $(".recipe-container").each(function (index) {
                $(this).append('<img id="dairyFree-icon" src="assets/dairyFree.jpg" alt="Dairy-Free Icon">');
            });
        }


       

        
    }
}
