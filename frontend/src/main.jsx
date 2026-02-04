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
import Bookmark from './pages/Bookmark.jsx'
import MyProfile from './pages/MyProfile.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import AdminHome from './pages/Admin/AdminHome.jsx'
import AdminLayout from './Layouts/AdminLayout.jsx'
import AdminRecipe from './pages/Admin/AdminRecipe.jsx'
import AdminUser from './pages/Admin/AdminUser.jsx'
import AdminCategory from './pages/Admin/AdminCategory.jsx'
import AdminRecipeID from './pages/Admin/AdminRecipeID.jsx'
import Notification from './pages/Notification.jsx'
import AddCategory from './pages/Admin/AddCategory.jsx'
import AdminSettings from './pages/Admin/AdminSettings.jsx'


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

        <Route path='' element={<PrivatePage />}>  {/*protected route */}
        <Route path='create-recipe' element={<CreateRecipe/>}></Route>
        <Route path='notification' element={<Notification/>}></Route>
        <Route path='my-recipes' element={<MyRecipes/>}></Route>
        <Route path='edit-recipe/:id' element={<CreateRecipe/>}></Route>
        <Route path='bookmark' element={<Bookmark/>}></Route>
        <Route path='/profile' element={<MyProfile/>}></Route>
        </Route>
      </Route>
      <Route path='/admin' element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
        <Route path='' element={<AdminHome />}></Route>
        <Route path='recipes' element={<AdminRecipe />}></Route>
        <Route path='recipes/recipe/:id' element={<AdminRecipeID />}></Route>
        <Route path='users' element={<AdminUser />}></Route>
        <Route path='category' element={<AdminCategory />}></Route>
        <Route path='addCategory' element={<AddCategory/>}></Route>
        <Route path="editCategory/:id" element={<AddCategory />}></Route>
        <Route path='setting' element={<AdminSettings/>}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
)
