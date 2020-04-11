import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/styles';

// setting hoc style is to component to make it style more readable
const styles = {
  root: {
    textAlign: 'left',
    margin: '3em',
    fontSize: '1em',
    '& .container-textBox': {
      marginLeft: '2.5em'
    },
    '& .container-dataList': {
      listStyle: 'none'
    },
    '& .container-input': {
      fontSize: '1em'
    }
  }
};

// setting the functional component
const DataQuery = ({ classes }) => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('');

  useEffect(() => {
    let ignore = false;

    // fetching the data from the api using axios data fetching library
    async function fetchData() {
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      if (!ignore) setData(result.data);
    }

    fetchData();

    // cleaning the call each time UI renders and listens the query when user make a search
    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <div className={classes.root}>
      <div className={`container-textBox`}>
        <input
          value={query}
          className={`container-input`}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <ul className={`container-dataList`}>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withStyles(styles)(DataQuery);
