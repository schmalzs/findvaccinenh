import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import cx from 'classnames';
import { useWindowDimensions } from 'hooks';
import { ReactNode } from 'react';
import { Appointment } from 'types';
import styles from './styles.module.scss';

const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cx(styles.root, className)}>{children}</div>;

type Props = {
  data?: Appointment[];
};

const Appointments = ({ data }: Props) => {
  const { width } = useWindowDimensions();

  if (!data || data.length === 0) {
    return <Wrapper>No available appointments found</Wrapper>;
  }

  if (width < 600) {
    return (
      <Wrapper className={styles.mobile}>
        {data.map((item) => (
          <div className={styles.entry} key={JSON.stringify(item)}>
            <strong>{item.date}</strong>
            <br />
            {item.city} - {item.name}
          </div>
        ))}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={JSON.stringify(item)}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default Appointments;
