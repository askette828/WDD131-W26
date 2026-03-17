// Get DOM elements
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const recipeContainer = document.querySelector('.recipe-container');

// Initialize with default recipe
let currentRecipes = [recipes[1]]; // Escalope de Poulet a la Creme

// Function to render recipes
function renderRecipes(recipesToRender) {
    recipeContainer.innerHTML = '';
    
    if (recipesToRender.length === 0) {
        recipeContainer.innerHTML = '<p class="no-results">No recipes found. Try a different search.</p>';
        return;
    }
    
    recipesToRender.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeContainer.appendChild(recipeCard);
    });
}

// Function to create a recipe card element
function createRecipeCard(recipe) {
    const article = document.createElement('article');
    article.className = 'recipe-card';
    
    // Create rating stars
    const stars = generateStars(recipe.rating);
    
    // Create tags HTML
    const tagsHTML = recipe.tags.map(tag => `<span class="recipe-category">${tag}</span>`).join('');
    
    article.innerHTML = `
        <div class="recipe-image">
            <img src="${recipe.image}" alt="${recipe.name}">
        </div>
        <div class="recipe-content">
            <div class="recipe-tags">
                ${tagsHTML}
            </div>
            <h2>${recipe.name}</h2>
            <span class="rating" role="img" aria-label="Rating: ${Math.floor(recipe.rating)} out of 5 stars">
                ${stars}
            </span>
            <p class="recipe-description">${recipe.description}</p>
        </div>
    `;
    
    return article;
}

// Function to generate star rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<span aria-hidden="true" class="icon-star">⭐</span>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<span aria-hidden="true" class="icon-star">⭐</span>';
        } else {
            stars += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
        }
    }
    
    return stars;
}

// Function to search recipes
function searchRecipes(query) {
    if (query.trim() === '') {
        currentRecipes = [recipes[1]]; // Reset to default
    } else {
        const lowerQuery = query.toLowerCase();
        currentRecipes = recipes.filter(recipe => {
            // Search in name, description, tags, and author
            const searchIn = [
                recipe.name,
                recipe.description,
                recipe.author,
                ...recipe.tags,
                recipe.recipeIngredient.join(' '),
                recipe.recipeInstructions.join(' ')
            ].join(' ').toLowerCase();
            
            return searchIn.includes(lowerQuery);
        });
    }
    
    renderRecipes(currentRecipes);
}

// Event listeners
searchBtn.addEventListener('click', () => {
    searchRecipes(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipes(searchInput.value);
    }
});

// Initial render
renderRecipes(currentRecipes);
