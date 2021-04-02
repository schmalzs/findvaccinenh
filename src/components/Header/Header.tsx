import { Link as RouterLink } from 'wouter';
import styles from './styles.module.scss';

const Header = () => (
  <header className={styles.header}>
    <nav>
      <RouterLink to="/">
        <h1>Find Vaccine NH</h1>
      </RouterLink>
    </nav>
  </header>
);

export default Header;
