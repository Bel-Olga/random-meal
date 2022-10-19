const getMealBtn = document.getElementById('get_meal');
const mealContainer = document.getElementById('meal');
const openText = document.getElementById('open-text');

getMealBtn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        })
        .catch(e => {
        console.warn(e);
        });
});

function createMeal(meal) {
    const ingredients = []; 
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        }
    }


    mealContainer.innerHTML = `
    <div class="row">
        <h3>${meal.strMeal}</h3>
    </div>
    
    <div class="row">
        <div class="columns seven">
            <img src='${meal.strMealThumb}' alt="${meal.strMeal}">
                ${
                    meal.strCategory
                        ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
                        : ''
                    }
                ${
                    meal.strArea
                        ? `<p><strong>Area:</strong> ${meal.strArea}</p>`
                        : ''
                    }
                ${
                    meal.strTags
                        ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>`
                        : ''
                    }
        </div>
    
        <div class="columns five">
            <h5>Ingredients</h5>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
    </div>       
    <div class="row">
        <p class="recipe">${meal.strInstructions}</p>
    </div>
    <div class="row">
        <h5>Video Recipe</h5>
        <div class="video-wrapper">
            <iframe src='https://www.youtube.com/embed/${meal.strYoutube.split("=").pop()}' title="Video recipe"></iframe>
        </div>
    </div>
    `
openText.innerHTML = `
<h5> Do you want another meal? </h5>
`

}
