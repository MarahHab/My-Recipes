class Render {
    display(recipes) {

        $(".menu").empty();                   

        const source = $("#recipe-template").html();
        const template = Handlebars.compile(source);
        let html = template(recipes);
        $(".menu").append(html);

        
        if (!recipes || !recipes.recipes || recipes.recipes.length === 0) {
            $(".menu").append('<h2 id="err-msg">Invalid ingredient or no recipes found❗</h2>');
            
          } 
        
        if (recipes.unvegetarianFree) {
            $(".recipe-container").each(function () {
                $(this).append('<img id="vegetarian-icon" src="assets/vegetarian.jpg" alt="Vegetarian Icon">');
            });
        }

        if (recipes.glutenFree) {
            $(".recipe-container").each(function () {
                $(this).append('<img id="glutenFree-icon" src="assets/glutenFree.jpg" alt="Gluten-Free Icon">');
            });
        }

        if (recipes.dairyFree) {
            $(".recipe-container").each(function () {
                $(this).append('<img id="dairyFree-icon" src="assets/dairyFree.jpg" alt="Dairy-Free Icon">');
            });
        }

        $(".recipe-container").each(function (index) {
            const chefName = recipes.recipes[index].chef;
            $(this).append(`<br><p id=chef-name>Chef: ${chefName}</p>`);
          });
        
        $(".recipe-container").each(function (index) {
        const time = recipes.recipes[index].time;
        $(this).append(`<br><p>⌚ ${time}min</p>`);
        });
        
          
        
    }
}
