import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import RecipesPage from './pages/RecipesPage.jsx'
import { Provider } from 'react-redux'
import {store} from './store.js'
import Recipe from './pages/Recipe.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'
import Signin from './pages/Signin.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import PrivatePage from './pages/PrivatePage.jsx'
import MyRecipes from './pages/MyRecipes.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='' element={<HomePage />}></Route>
        <Route path='about' element={<About/>}></Route>
        <Route path='contact' element={<Contact/>}></Route>
        <Route path='recipes' element={<RecipesPage/>}></Route>
        <Route path='recipe/:id' element={<Recipe/>}></Route>
        <Route path='signin' element={<Signin/>}></Route>
        <Route path='register' element={<RegisterPage />}></Route>
        <Route path='' element={<PrivatePage />}>
        <Route path='create-recipe' element={<CreateRecipe/>}></Route>
        <Route path='my-recipes' element={<MyRecipes/>}></Route>
        <Route path='edit-recipe/:id' element={<CreateRecipe/>}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
)
