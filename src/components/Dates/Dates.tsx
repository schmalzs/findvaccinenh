import cx from 'classnames';
import { ReactNode } from 'react';
import styles from './styles.module.scss';

const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cx(styles.root, className)}>{children}</div>;

type Props = {
  dates?: string[];
};

const Dates = ({ dates }: Props) => {
  if (!dates || dates.length === 0) {
    return <Wrapper>No available dates found</Wrapper>;
  }

  return (
    <Wrapper className={styles.mobile}>
      {dates.map((date) => (
        <div className={styles.entry} key={date}>
          {date}
        </div>
      ))}
    </Wrapper>
  );
};

export default Dates;
