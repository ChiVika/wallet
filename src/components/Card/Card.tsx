
import styles from './Card.module.css';
import type { CardProps } from './Card.props';
import cn from 'classnames';
function Card({className,  balance, card, children}: CardProps){
    const mask = (card: string) => {
        const lastNumber = card.slice(-4);
        return `**${lastNumber}`;
    }

    return(
        <>
            <div className={cn(styles['card'], className)} >
                <div className={styles['header']}>
                    <div className={styles['balance']}>{balance} р</div>
                    {children}
                </div>
                <div className={styles['footer']}>
                    <div className={styles['card_number']}>{mask(card)}</div>
                </div>
            </div>
        </>
    )
}

export default Card;