import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index.js"
import { Outlet } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      console.log(userData);
      if (userData) dispatch(login({ userData }));
      else dispatch(logout())
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-700">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) :
  (
    <div id="bufferingDiv" class="hidden flex-col gap-3 items-center absolute z-50 w-screen h-screen justify-center bg-[#000000bd] ">
      <div id="showMessage" class="text-white text-2xl text-center font-bold"> Please wiat </div>
      <dotlottie-player class="" src="https://lottie.host/27feff6c-53ae-48c7-9539-9a37724286be/8okSjWIQl7.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
    </div>
  )
}

export default App
