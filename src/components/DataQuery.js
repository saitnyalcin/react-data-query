import axios from 'axios';
import React, { useEffect, useState } from 'react';

function DataQuery() {
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
    <div style={{ textAlign: 'left', margin: '3em' }}>
      <div style={{ marginLeft: '2.5em' }}>
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </div>
      <ul style={{ listStyle: 'none' }}>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataQuery;
