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

import { AppLayout } from '../AppLayout';

import { fetchContents } from '@grammarify/data-parser';
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
  const [search, setSearch] = React.useState('');
  const { data } = useQuery<ContentsResponse>('contents', fetchContents);

  const items = React.useMemo(() => {
    const term = search.toLowerCase();
    return data?.filter(i => i.title.toLowerCase().includes(term))
  }, [search, data])

  return (
    <AppLayout
      title="Grammarify"
      onSearch={setSearch}
    >
      <List>
        {items?.map((item, index) => (
          <ListItemLink key={item.key} alignItems="flex-start" to={`/quiz/${item.key}`}>
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
    </AppLayout>
  );
}