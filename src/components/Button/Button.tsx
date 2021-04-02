import cx from 'classnames';
import { Link } from 'wouter';
import styles from './styles.module.scss';

type PrimaryButtonProps = {
  appearance?: 'primary' | 'secondary';
  children?: React.ReactNode;
  className?: string;
  to?: string;
};

const PrimaryButton = ({
  appearance,
  children,
  className,
  to,
}: PrimaryButtonProps) => {
  const button = (
    <button
      className={cx(styles.button, className, {
        [styles.primary]: !appearance || appearance === 'primary',
        [styles.secondary]: appearance === 'secondary',
      })}
    >
      {children}
    </button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
};

export default PrimaryButton;
