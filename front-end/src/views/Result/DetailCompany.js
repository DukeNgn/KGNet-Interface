import React from 'react';
import '@fontsource/roboto';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import MyTabs from './Tabs';

const DetailCompany = ({ companyName, criteria, result }) => {
  return (
    <Box my={5} ml={2}>
      <Typography variant="body1" color="textPrimary">
        {`Similar companies to ${companyName} in term of ${criteria} are `}
        {result.map((e, idx) => {
          return `${e.name}` + (idx === result.length ? ', ' : '.');
        })}
      </Typography>
      <Box my={3} />
      <MyTabs mode="companies" result={result} />
    </Box>
  );
};

export default DetailCompany;
