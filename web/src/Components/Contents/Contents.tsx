import React from 'react';
import { useQuery } from 'react-query';
import { fetchContents } from '../../api';
import { ContentsResponse } from '../../types';


export const Contents: React.VFC = () => {
  const { data } = useQuery<ContentsResponse>('contents', fetchContents);

  return (
    <div>
      <ul>
        {data?.map(item => (
          <li key={item.key}>
            <h4>{item.title}</h4>
            <h5>{item.description}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
}