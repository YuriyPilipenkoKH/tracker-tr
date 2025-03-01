import { useAuthStore } from "../../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboardCustomize, MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import UserButton from "./UserButton";
import { cn } from "../../lib/cn";
import ThemeChanger from "../button/ThemeChanger";
import Logo from "./Logo";
import { DeskWrap, MobileWrap,  } from "./Nav.styled";
import { FlatButton } from "../button/Button";
import { StyledFlatLink } from "../button/Button.styled";


const Navbar = () => {

  const { logOut , token } = useAuthStore();
  const location = useLocation()
  const path = location.pathname

  return (
    <header
      className="w-full transition-all ease-in-out  duration-800" >
    <div className="h-16  mx-auto ">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-start gap-2 lg:gap-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all">
            <div className="flex items-center  rounded-lg size-9 bg-primary/10">
            <Logo/>
            </div>
          </Link>
          <StyledFlatLink to='/dashboard' 
           className={cn('btn btn-ghost ',
            (path === '/login' || path === '/signup')  && 'hidden')}
          >
            <DeskWrap 
            className="text-lg font-bold " >
             {token 
             ? (path === '/' ) 
              ? 'Dashboard' 
              : (path === '/profile' ) 
                ? 'Dashboard'
                : (path === '/dashboard' ) && 'Tracker' 
             : (path === '/login' ) 
             ? ''
            : 'Login' }
            </DeskWrap>
            <MobileWrap className="gap-8 MobileWrap ">
            {token 
             ? (path === '/' ) 
              ? <MdOutlineDashboardCustomize size={25}/>
              : (path === '/profile' ) 
                ? <MdOutlineDashboardCustomize size={25}/>
                : (path === '/dashboard' ) && <FaSackDollar size={25}/>
            : (path === '/login' ) 
             ? ''
             : <MdOutlineLogin size={25}/> }
            </MobileWrap>
          </StyledFlatLink>
        </div>
        <div className="flex items-center gap-2 max-sm:gap-1">

       < ThemeChanger/>

          {token && (
            <div className="flex gap-2 items-center max-sm:gap-1 ">
            <UserButton/>

              <FlatButton
              type="button"
              className="flex justify-center px-2 btn btn-ghost" 
              onClick={logOut}
              >
                <MdOutlineLogout size={25}/>
                <span className="hidden sm:inline"></span>
              </FlatButton>
            </div>
          )}
        </div>
    </div>
    </div>
  </header>
);
};


export default Navbar