import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import RecipePage from './pages/RecipePage.jsx'
import { Provider } from 'react-redux'
import {store} from './store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='' element={<HomePage />}></Route>
        <Route path='recipes' element={<RecipePage/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
)
