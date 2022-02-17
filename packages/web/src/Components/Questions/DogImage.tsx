import React from 'react';
import { useQuery } from 'react-query';
import { getJson } from '@grammarify/data-parser';


type DoggyResponse = { message: string };

export const DogImage = () => {
  const { data } = useQuery<DoggyResponse>('doggy', () => getJson<DoggyResponse>("https://dog.ceo/api/breeds/image/random"));

  return (
    <img src={data?.message} height="300" />
  );
}