import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import cx from 'classnames';
import { useWindowDimensions } from 'hooks';
import qs from 'qs';
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
  doseType: string;
  vaccineType: string;
  dose1Date: string;
};

const Appointments = ({ data, doseType, vaccineType, dose1Date }: Props) => {
  const { width } = useWindowDimensions();

  if (!data || data.length === 0) {
    return <Wrapper>No available appointments found</Wrapper>;
  }

  const LocationLink = ({ item }: { item: Appointment }) => (
    <a
      target="_blank"
      rel="noreferrer"
      href={`/location?${qs.stringify({
        ...item,
        doseType,
        vaccineType,
        dose1Date,
      })}`}
    >
      {item.name}
    </a>
  );

  if (width < 600) {
    return (
      <Wrapper className={styles.mobile}>
        {data.map((item) => (
          <div className={styles.entry} key={JSON.stringify(item)}>
            <strong>{item.date}</strong>
            <br />
            <LocationLink item={item} />
            <br />
            {item.city}
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
              <TableCell>Next Available Appointment</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={JSON.stringify(item)}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>
                  <LocationLink item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default Appointments;
