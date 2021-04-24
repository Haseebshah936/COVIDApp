import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function index(props) {
    const [data, setData] = useState();
    useEffect(() => {
        fetch("https://api.covid19api.com/summary")
        .then((response) => response.json())
        .then((json) => setData(json.Global))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      });
    return (
            data 
    );
}

export default index;