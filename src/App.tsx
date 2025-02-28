
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from 'react-hot-toast'
import { options } from "./lib/hotToast";
import { useThemeStore } from "./store/useThemeStore";
import Layout from "./components/layout/Layout";
import { Container } from "./components/container/Container";


function App() {
    const {token} = useThemeStore()
  // const { userId, checkAuth , token,  } = useAuthStore();
  // useEffect(() => {
  //   checkAuth() 
  // }, [userId]);


  return (
    <>
      <Container>
        <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={< HomePage />}/>
         <Route path="/signup"
            element ={!token
              ? <SignUpPage/>
              : <Navigate to='/dashboard'/>}/>
        <Route path="/login"
            element ={!token
              ? <LoginPage/>
              : <Navigate to='/dashboard'/>}/>
        <Route path="dashboard"
            element ={ token
              ? <DashboardPage/>
              : <Navigate to='/login'/>}/>
        <Route path="/profile"
            element={ token
              ? <ProfilePage /> 
              : <Navigate to='/login' />}
              />
        <Route path="*" 
            element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Container>

      <Toaster 
       position="top-center" 
      toastOptions={options} />
    </>
  )
}

export default App