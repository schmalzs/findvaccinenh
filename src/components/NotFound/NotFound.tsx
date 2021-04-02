import cx from 'classnames';
import { Button } from 'components';
import styles from './styles.module.scss';

const NotFound = () => {
  return (
    <div className={cx(styles.notFound, 'fill')}>
      <h1>Uh oh - page not found!</h1>
      <Button to="/">Home</Button>
    </div>
  );
};

export default NotFound;
