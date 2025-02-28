import { Suspense } from 'react'
import { MainFooter, MainHeader } from './Layout.styled'
import { Outlet } from 'react-router-dom'
import { useModalStore } from '../../store/useModalStore'
import MainModal from '../modals/MainModal'
import Navbar from '../nav/Navbar'



const Layout = () => {
const {modalIsOpen} = useModalStore()

    return (
    <>
      <MainHeader  className="main-header" >
        <Navbar/>
      </MainHeader>
        <Suspense >
            <Outlet />
        </Suspense>
        <MainFooter >
          {'Expense Tracker'} 
        </MainFooter>
      {modalIsOpen && <MainModal/>}
      </>
    )}

export default Layout