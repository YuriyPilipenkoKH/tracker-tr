import { Suspense } from 'react'
import { MainFooter, MainHeader } from './Layout.styled'
import { Outlet } from 'react-router-dom'

import { useModalStore } from '../../store/useModalStore'
import MainModal from '../modals/MainModal'



const Layout = () => {
const {modalIsOpen} = useModalStore()

    return (
    <>
      <MainHeader  className="main-header" >
        {/* <Navbar/> */}header
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