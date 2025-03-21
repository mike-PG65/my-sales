import Register from './components/Register.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Login from './components/Login.tsx'
import Sidebar from './components/home.tsx'
import {Userlist} from './components/Userslist.tsx'
import {UpdateUserPage} from './components/updateuser.tsx'
import { AddProductForm } from './components/products.tsx'
// import {Updateproduct} from './components/products.tsx'


function App() {
  // const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Sidebar />} />
          <Route path="/users" element={<Userlist />}/>
          <Route path="/updateuser/:id" element={<UpdateUserPage/>} />
          <Route path="/Adduser" element={<UpdateUserPage/>} />
          <Route path="/Addproduct" element={<AddProductForm/>} />
       </Routes>
      </BrowserRouter>
      
  )
}

export default App
