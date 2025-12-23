import { Outlet } from 'react-router'
import Header from './components/Header'
import './App.css'
import Footer from './components/Footer'


function App() {
  return (
    <>
     <Header />
     <main className='my-3'>
      <Outlet/>
     </main>
     <Footer />
    </>
  )
}

export default App



//For toastify

// import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css";

      // <ToastContainer/>
  

