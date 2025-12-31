import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import RecipesPage from './pages/RecipesPage.jsx'
import { Provider } from 'react-redux'
import {store} from './store.js'
import Recipe from './pages/Recipe.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='' element={<HomePage />}></Route>
        <Route path='recipes' element={<RecipesPage/>}></Route>
        <Route path='recipe/:id' element={<Recipe/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
)
