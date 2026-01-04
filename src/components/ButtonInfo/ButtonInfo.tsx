import type { ButtonInfoProps } from "./ButtonInfo.props";
import styles from './ButtonInfo.module.css';
import cn from 'classnames';

const ButtonInfo = ({color, className, ...props}: ButtonInfoProps) => {
    return(
        <button className={cn(className, styles['button'])} {...props}>
            <svg width="5" height="18" viewBox="0 0 5 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.4" cy="2.4" r="2.4" fill={color}/>
                <circle cx="2.4" cy="9.4" r="2.4" fill={color}/>
                <circle cx="2.4" cy="16.4" r="2.4" fill={color}/>
            </svg>
        </button>
    )
};
export default ButtonInfo;