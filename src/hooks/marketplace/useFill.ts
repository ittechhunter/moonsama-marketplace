import { request } from 'graphql-request';
import { parseFill } from '../../utils/subgraph';
import { SUBGRAPH_URL } from '../../constants';
import { QUERY_FILL } from '../../subgraph/fillQueries';
import { useState, useCallback, useEffect } from 'react';
import { Fill } from './types';

export const useFill = (transactionHash: string) => {
  const [fill, setFill] = useState<Fill | undefined>();

  const fetchFill = useCallback(async () => {
    const result = await request(SUBGRAPH_URL, QUERY_FILL, { transactionHash });
    console.debug('YOLO getFill', result);

    if (!result) {
      setFill(undefined);
      return;
    }

    const rawfill = result?.fill;
    const f = parseFill(rawfill);

    console.debug('YOLO getFill', { fill: f });
    setFill(f);
  }, []);

  useEffect(() => {
    fetchFill();
  }, [fill]);

  return fill;
};
