import styles from './Button2.module.css'

type TButtonProps = {
    fullName: string;
    position:  string;
    leftIcon?: React.ReactNode
    smallIcon?: React.ReactNode
    rightIcon?:React.ReactNode
}

const Button2 = ({fullName, position, leftIcon,smallIcon, rightIcon, } : TButtonProps) => {
  return (
    <button className={`${styles.button}`}>
        {leftIcon}
        <div className={styles.buttonText}>
          <p>{fullName}</p>
          <span>{smallIcon} {position}</span>
        </div>
        {rightIcon}
    </button>
  )
}

export default Button2;