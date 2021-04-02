import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import cx from 'classnames';
import { Appointments } from 'components';
import { useState } from 'react';
import { Appointment } from 'types';
import styles from './styles.module.scss';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [zipCode, setZipCode] = useState({ value: '', error: false });
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const zipCodeValue = zipCode.value.trim();
      if (!/^\d{5}$/.test(zipCodeValue)) {
        setZipCode({ value: zipCodeValue, error: true });
        return;
      }

      setLoading(true);

      const { data } = await axios.post('/api/appointment', {
        zipCode: zipCodeValue,
      });

      setAppointments(data as Appointment[]);
    } catch (error) {
      console.error(error);
      setZipCode({ ...zipCode, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx(styles.root, 'fill')}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          autoFocus
          label="Zip Code"
          variant="outlined"
          error={zipCode.error}
          value={zipCode.value}
          onChange={(event) =>
            setZipCode({ value: event.target.value, error: false })
          }
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          size="large"
        >
          {loading ? <CircularProgress /> : 'Submit'}
        </Button>
      </form>
      <div className={styles.appointmentsLink}>
        <a
          href="https://vini.nh.gov/providers/s/vms-serviceappointment/VMS_ServiceAppointment__c/Default"
          target="_blank"
          rel="noreferrer"
        >
          View Your Appointments
        </a>
      </div>
      {appointments && <Appointments data={appointments} />}
    </div>
  );
};

export default Home;
