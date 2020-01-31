import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/styles';

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

function DataQuery({ classes }) {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('react');

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      if (!ignore) setData(result.data);
    }

    fetchData();
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
}

export default withStyles(styles)(DataQuery);
