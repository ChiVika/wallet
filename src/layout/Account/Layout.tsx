import { NavLink } from 'react-router-dom';
import Headling from '../../components/Headling/Headling';
import styles from './Layout.module.css';
import cn from 'classnames';

function Layout(){
    return(
        <>
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <Headling className={styles['headling']}>Мои счета</Headling>
                <NavLink to='/' className={({isActive}) => cn(styles['account'],{
                    [styles['active']]: isActive
                })}>2202 **** **** 1708</NavLink>
                <NavLink to='/1' className={({isActive}) => cn(styles['account'],{
                    [styles['active']]: isActive
                })}>2202 **** **** 1708</NavLink>
            </div>
            <div className={styles['body']}>
            оставшийся контент
            </div>
        </div>
        </>
        
    )

}
export default Layout;