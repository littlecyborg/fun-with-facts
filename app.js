document.addEventListener('DOMContentLoaded', () => {
    let facts = [];
      let activeCategory = 'all';
  
      // Fetch facts from JSON file
      fetch('facts.json')
          .then(response => response.json())
          .then(data => {
              facts = data;
              setupCategories();
              renderFacts();
          })
          .catch(error => console.error('Error loading facts:', error));
  
      // Setup category filters
      function setupCategories() {
          const categories = ['all', ...new Set(facts.map(fact => fact.category))];
          const categoryFilters = document.getElementById('categoryFilters');
          
          categories.forEach(category => {
              const button = document.createElement('button');
              button.className = `category-btn ${category === 'all' ? 'active' : ''}`;
              button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
              button.addEventListener('click', () => {
                  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                  button.classList.add('active');
                  activeCategory = category;
                  renderFacts();
              });
              categoryFilters.appendChild(button);
          });
      }
  
      // Render facts
      function renderFacts() {
          const container = document.getElementById('factsContainer');
          const searchTerm = document.getElementById('searchInput').value.toLowerCase();
          
          const filteredFacts = facts.filter(fact => {
              const matchesCategory = activeCategory === 'all' || fact.category === activeCategory;
              const matchesSearch = fact.title.toLowerCase().includes(searchTerm) ||
                                  fact.content.toLowerCase().includes(searchTerm);
              return matchesCategory && matchesSearch;
          });
  
          container.innerHTML = filteredFacts.map(fact => `
              <div class="fact-card">
                  <h2>${fact.title}</h2>
                  <p>${fact.content}</p>
                  <span class="category-tag">${fact.category}</span>
              </div>
          `).join('');
      }
  
      // Search functionality
      document.getElementById('searchInput').addEventListener('input', renderFacts);
  });
  