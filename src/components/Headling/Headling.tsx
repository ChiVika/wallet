import styles from './Headling.module.css';
import cn from 'classnames';
import type { HeadlingProps } from './Headling.props';

function Headling({className, children, ...props}: HeadlingProps){
    return(
        <>
            <h1 className={cn(className, styles['h1'])} {...props}>{children}</h1>
        </>
    )

}
export default Headling;