import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import cx from 'classnames';
import { Dates } from 'components';
import qs from 'qs';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const Location = () => {
  const [queryParams] = useState(
    qs.parse(window.location.search.split('?')[1])
  );
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState<string[] | null>(null);

  useEffect(() => {
    const loadDates = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post('/api/appointment/location', {
          locationId: queryParams.id,
          doseType: queryParams.doseType,
          vaccineType: queryParams.vaccineType,
          dose1Date: queryParams.dose1Date,
        });

        setDates(data as string[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDates();
  }, [queryParams]);

  return (
    <div className={cx(styles.root, 'fill')}>
      <h3>{queryParams.name}</h3>
      {loading && <CircularProgress />}
      {!loading && dates && <Dates dates={dates} />}
    </div>
  );
};

export default Location;
