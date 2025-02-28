
import { useThemeStore } from '../../store/useThemeStore'
import {  LuLightbulb, LuMoonStar } from "react-icons/lu";
import { FlatButton } from './Button';


const ThemeChanger = () => {
  const {theme, toggleTheme} = useThemeStore()
  return (
    <FlatButton
      className="btn btn-ghost text-[var(--text-color)]"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <LuMoonStar size={25}/> : <LuLightbulb  size={25}/>}
    </FlatButton>
  )
}

export default ThemeChanger