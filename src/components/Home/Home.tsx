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
  const [searchType, setSearchType] = useState({
    value: 'ZIP_CODE',
    error: false,
  });
  const [zipCode, setZipCode] = useState({ value: '', error: false });
  const [county, setCounty] = useState({ value: 'BELKNAP', error: false });
  const [rangeDistance, setRangeDistance] = useState({
    value: '20',
    error: false,
  });
  const [doseType, setDoseType] = useState({ value: 'dose-1', error: false });
  const [vaccineType, setVaccineType] = useState({
    value: 'all',
    error: false,
  });
  const [dose1Date, setDose1Date] = useState({
    value: new Date().toISOString().split('T')[0],
    error: false,
  });
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const zipCodeValue = zipCode.value.trim();
      if (searchType.value === 'ZIP_CODE' && !/^\d{5}$/.test(zipCodeValue)) {
        setZipCode({ value: zipCodeValue, error: true });
        return;
      }

      setLoading(true);

      if (searchType.value === 'ZIP_CODE') {
        const { data } = await axios.post('/api/appointment/zip-code', {
          zipCode: zipCode.value.trim(),
          rangeDistance: rangeDistance.value,
          doseType: doseType.value,
          vaccineType: vaccineType.value,
          dose1Date: dose1Date.value,
        });

        setAppointments(data as Appointment[]);
      } else {
        const { data } = await axios.post('/api/appointment/county', {
          county: county.value,
          rangeDistance: rangeDistance.value,
          doseType: doseType.value,
          vaccineType: vaccineType.value,
          dose1Date: dose1Date.value,
        });

        setAppointments(data as Appointment[]);
      }
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
          className={styles.select}
          select
          label="Search Type"
          value={searchType.value}
          onChange={(event) => {
            setSearchType({ value: event.target.value, error: false });
            if (event.target.value === 'COUNTY') {
              setRangeDistance({ value: '5', error: false });
            } else {
              setRangeDistance({ value: '20', error: false });
            }
          }}
          SelectProps={{ native: true }}
          variant="outlined"
        >
          <option value="ZIP_CODE">Zip Code</option>
          <option value="COUNTY">County</option>
        </TextField>
        {searchType.value === 'ZIP_CODE' && (
          <TextField
            autoFocus
            className={styles.textbox}
            label="Zip Code"
            variant="outlined"
            error={zipCode.error}
            value={zipCode.value}
            onChange={(event) =>
              setZipCode({ value: event.target.value, error: false })
            }
          />
        )}
        {searchType.value === 'COUNTY' && (
          <TextField
            className={styles.select}
            select
            label="County"
            value={county.value}
            onChange={(event) =>
              setCounty({ value: event.target.value, error: false })
            }
            SelectProps={{ native: true }}
            variant="outlined"
          >
            <option value="ZIP_CODE">Zip Code</option>
            <option value="COUNTY">County</option>
            <option value="BELKNAP">Belknap</option>
            <option value="CARROLL">Carroll</option>
            <option value="CHESHIRE">Cheshire</option>
            <option value="COOS">Coos</option>
            <option value="GRAFTON">Grafton</option>
            <option value="HILLSBOROUGH">Hillsborough</option>
            <option value="MERRIMACK">Merrimack</option>
            <option value="ROCKINGHAM">Rockingham</option>
            <option value="STRAFFORD">Strafford</option>
            <option value="SULLIVAN">Sullivan</option>
          </TextField>
        )}
        <TextField
          className={styles.select}
          select
          disabled={searchType.value === 'COUNTY'}
          label="Within"
          value={rangeDistance.value}
          onChange={(event) =>
            setRangeDistance({ value: event.target.value, error: false })
          }
          SelectProps={{ native: true }}
          variant="outlined"
        >
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="20">20 miles</option>
          <option value="50">50 miles</option>
          <option value="100">100 miles</option>
        </TextField>
        <TextField
          className={styles.select}
          select
          label="Dose Type"
          value={doseType.value}
          onChange={(event) =>
            setDoseType({ value: event.target.value, error: false })
          }
          SelectProps={{ native: true }}
          variant="outlined"
        >
          <option value="dose-1">Dose 1</option>
          <option value="dose-2">Dose 2</option>
        </TextField>
        <TextField
          className={styles.select}
          select
          label="Vaccine Type"
          value={vaccineType.value}
          onChange={(event) =>
            setVaccineType({ value: event.target.value, error: false })
          }
          SelectProps={{ native: true }}
          variant="outlined"
        >
          <option value="all">All</option>
          <option value="pfizer">Pfizer</option>
          <option value="moderna">Moderna</option>
          {doseType.value === 'dose-1' && (
            <option value="johnson-and-johnson">Johnson & Johnson</option>
          )}
        </TextField>
        {doseType.value === 'dose-2' && (
          <TextField
            label="Dose 1 Date"
            type="date"
            value={dose1Date.value}
            className={styles.datePicker}
            onChange={(event) =>
              setDose1Date({ value: event.target.value, error: false })
            }
            InputLabelProps={{ shrink: true }}
          />
        )}
        {searchType.value === 'COUNTY' && (
          <div className={styles.warn}>
            County data may be delayed up to 5-minutes
          </div>
        )}
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
      {!loading && appointments && <Appointments data={appointments} />}
    </div>
  );
};

export default Home;
