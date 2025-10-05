E-Commerce Dashboard – Documentation 

📌 Objective 

Build a basic e-commerce web application where users can browse products, view detailed product information, and add items to the cart. 

 

Login Credentials: 

Username: admin 

Password: 123456 

 

📂 Project Structure 

/src 
  /components 
    ├── AddToCart.tsx        # Card UI for products on Home page 
    ├── Header.tsx             # App header with navigation/cart summary 
    ├── Login.tsx
    ├── ProductCard.tsx           # Footer with total cart value & items count 
    ├── ProductDetails.tsx
    ├── Profile.tsx
    ├── SearchBar.tsx
  /pages 
    ├── Home.tsx            # Product listing page 
    ├── ProductList.tsx     # Product details page              

  /context 
    ├── CartContext.ts       # React Context + MobX for cart state 
    ├── AuthContext.ts
  /services 
    ├── productService.js         # API layer using 'got' to fetch products/categories 
  App.js                      # Main router setup (React Router) 
  index.js                    # ReactDOM render entrypoint 
 

 

 

🚀 Features 

️⃣ Home Page (Product Listing) 

Displays a grid of products (title, price, thumbnail). 

Each product links to its Product Detail Page (/product/:id/details). 

No filters/sorting locally. 

When categories/filters are selected, new API calls are triggered. 

Filters are not persisted in URL; refreshing/back button reverts to default. 

2️⃣ Product Detail Page 

Uses dynamic routing (React Router): /product/:id/details. 

Do not fetch per-id dynamically from API; preload the data. 

Shows title, description, price, and "Add to MyCart" button. 

3️⃣ Cart Functionality 

Users can add items to cart from Product Detail Page. 

No remove functionality. 

Footer displays: 

Total cart value 

Total number of items 

4️⃣ Navigation 

Basic navigation between Home Page and Product Detail Page. 

Link back to Home Page from Product Detail Page. 

Cart summary is shown in footer (not a separate Cart page). 

 

⚙️ Technical Requirements 

Feature 

Implementation 

Framework 

React JS (CRA) 

Components 

Class Components only 

Routing 

React Router (no useSearchParams) 

State Management 

React Context API + MobX for cart 

Data Fetching 

API calls via got to https://fakestoreapi.com/ 
Refetch on filters applied – no local filtering 

Styling 

Inline styling for responsiveness (use %, flex, @media) 

Testing 

E2E tests using Cypress or Playwright 

 

🛠️ Setup Instructions 

Install dependencies 

npm install react-router-dom mobx mobx-react got cypress 
 

Run the app 

npm start 
 

Run E2E tests 

Cypress: npx cypress open 

Playwright: npx playwright test 

 

🛒 State Management – CartContext + MobX 

// /context/CartContext.js 
import React, { createContext } from 'react'; 
import { makeAutoObservable } from 'mobx'; 
 
class CartStore { 
  items = []; 
  constructor() { makeAutoObservable(this); } 
 
  addItem(product) { this.items.push(product); } 
 
  get totalItems() { return this.items.length; } 
  get totalPrice() { return this.items.reduce((sum, p) => sum + p.price, 0); } 
} 
 
export const CartContext = createContext(new CartStore()); 
 

Wrap your <App /> with CartContext.Provider. 

 

🌐 API Layer (using got) 

// /api/productApi.js 
import got from 'got'; 
 
export const fetchProducts = async (category) => { 
  const url = category  
    ? `https://fakestoreapi.com/products/category/${category}`  
    : 'https://fakestoreapi.com/products'; 
  const { body } = await got(url, { responseType: 'json' }); 
  return body; 
}; 
 
export const fetchCategories = async () => { 
  const { body } = await got('https://fakestoreapi.com/products/categories', { responseType: 'json' }); 
  return body; 
}; 
 

 

📝 Testing 

Write Cypress tests for: 

Loading Home Page & product grid 

Clicking a product opens Product Detail Page 

Adding product to cart updates footer totals 

Example Cypress spec: 

describe('E-commerce flow', () => { 
  it('loads home and adds a product to cart', () => { 
    cy.visit('/'); 
    cy.get('.product-card').first().click(); 
    cy.contains('Add to MyCart').click(); 
    cy.get('footer').contains('Total Items: 1'); 
  }); 
}); 
 

 

💾 Bonus (Optional Enhancements) 

Persist cart state in sessionStorage or localStorage. 

Add CSS animations when navigating pages or adding to cart. 

Improve accessibility by using semantic HTML elements (<main>, <header>, <footer>). 

 

📌 Summary Table 

Page 

Purpose 

Home 

Browse products grid 

Product Detail 

View detailed info & add to cart 

Footer 

Shows cart summary (total price + items) 

 