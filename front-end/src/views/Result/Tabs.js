import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, SvgIcon, Typography, Grid, makeStyles } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TabDetailCompany from './TabDetailCompany';
import TabDetailDog from './TabDetailDog';
import QueryTab from './TabQuery';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  shapImage: {
    width: '100%',
    height: '100%'
  }
}));

export default function MyTabs({ mode, result, query, queryKeywords, shapOriginalImage, shapDescription }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [UserQuery, setUserQuery] = useState(query);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnClick = () => {
    history.push('/result?mode=dogSimilarity');
  };

  /**
   *
   * @param {*} mode mode of the use case
   * @param {*} result the response from the API
   * @returns the detail of each card
   */
  const returnTabDetail = (mode, result) => {
    if (mode === 'companies') {
      return result.map((company, idx) => <TabDetailCompany key={idx} companyDetail={company} />);
    }
    if (mode === 'dogInfo' || mode === 'dogSimilarity') {
      return result.map((dog, idx) => <TabDetailDog mode={mode} key={idx} dogDetail={dog} />);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Overall" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
          <Tab label="Query" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box>
          <Typography variant="h5" color="textPrimary">
            Here is how we identify the results
          </Typography>
          <Box m={3}>
            <img src={`${shapOriginalImage}`} alt="shap explanation" className={classes.shapImage} />
            <Box display="flex" justifyContent="center">
              <Typography variant="caption" color="textSecondary">
                {shapDescription}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" color="textPrimary">
            {`We found ${result.length} result(s).`}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {`The top three are: `}
          </Typography>
          <ol>
            {result !== undefined
              ? result.map((dog, idx) => {
                  if (idx < 3) return <li>{dog.breed_class}</li>;
                })
              : null}
          </ol>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {returnTabDetail(mode, result)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box>
          <Box>
            <QueryTab
              userQuery={query}
              setUserQuery={setUserQuery}
              queryKeywords={queryKeywords}
              setIsChanged={setIsChanged}
            />
          </Box>
          <Box my={2} justifyContent="center">
            <Grid container direction="column" xs={12} alignItems="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnClick}
                startIcon={
                  <SvgIcon>
                    <PlayCircleOutlineIcon />
                  </SvgIcon>
                }
              >
                Execute
              </Button>
              {isChanged ? (
                <Typography variant="caption" color="textSecondary">
                  Seems like the query has been changed, let's execute it!
                </Typography>
              ) : null}
            </Grid>
          </Box>
        </Box>
      </TabPanel>
    </div>
  );
}
