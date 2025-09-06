import cn from 'classnames';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.module';


function Button({children, className, ...props}: ButtonProps){
    return(
        <>
            <button className={cn(styles['button'], styles['accent'], className)} {...props}>{children}</button>
        </>
    )
}

export default Button;