import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fetchContents } from '../../api';
import { ContentsResponse } from '../../types';


export const ListItemLink = (props: any) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any>(function(itemProps, ref) {
        return <Link ref={ref} to={props.to} {...itemProps} />;
      }),
    [props.to],
  );

  return (
      <ListItem button component={renderLink} {...props} />
  );
}


export const Contents: React.VFC = () => {
  const { data } = useQuery<ContentsResponse>('contents', fetchContents);

  return (
    <List>
      {data?.map((item, index) => (
        <ListItemLink key={item.key} alignItems="flex-start" to={`/${item.key}`}>
          <ListItemAvatar>
            <Avatar>{index}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.title}
            secondary={item.description}
          />
        </ListItemLink>
      ))}
    </List>
  );
}