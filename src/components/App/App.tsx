import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Footer, Header, Router } from 'components';
import styles from './styles.module.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#f4f4f4',
    },
    secondary: {
      light: '#84c887',
      main: '#66bb6a',
      dark: '#47824a',
      contrastText: '#2a2d34',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <Header />
        <main className="fill">
          <Router />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
