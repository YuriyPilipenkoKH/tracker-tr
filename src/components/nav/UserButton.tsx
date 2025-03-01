import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const UserButton = () => {
  const navigate = useNavigate();
  const { authUser} = useAuthStore();
  const userInitial = authUser?.name 
    ? authUser.name.charAt(0).toUpperCase() 
    : ''
  return (
    <>
    <div className='avatar__wrapp'>
      <button
      className='w-12 h-12 rounded-full bg-[var(--accent-color)] font-bold'
      onClick={() => navigate('/profile')}>
        {authUser?.image  ? (
        <img
        src={authUser?.image}
        alt="Profile image"
        className="userimage rounded-full"
      />
        )  : userInitial}

      </button>
    </div>
  </>
  )
}

export default UserButton

//{userInitial}