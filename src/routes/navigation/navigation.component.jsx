import { Fragment, useContext } from 'react';
import {Outlet,Link} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () =>{
    const {currentUser} = useContext(UserContext);

    return (
      <Fragment>
        <div className='navegito'>
            <Link className='logo-container' to='/'>
                <Logo/>
            </Link>
            <div className='nav-links-container'>
            {
                currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                ) : 
                (
                    <Link className='nav-link' to='/authentication'>
                        SIGN IN
                    </Link>
                )
            }

            </div>
        </div>
        <Outlet />
      </Fragment>
    );
} 
export default Navigation;