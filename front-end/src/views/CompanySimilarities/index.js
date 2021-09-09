import React, { useState } from 'react';
import Details from './Details';
import Header from './Header';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import Result from '../Result';
import { LinearProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const CompanySimilarities = () => {
  // States
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [similarityFeature, setSimilarityFeature] = useState('profits');
  const { enqueueSnackbar } = useSnackbar();

  const handleShowResult = async () => {
    if (companyName !== '') {
      // make request here
      setLoading(true);
      try {
        const data = { company_name: companyName, similarity_feature: similarityFeature };
        const res = await axios.post('KGNet/getForbes2013SimilarCompanies', data);
        if (res.status === 200) {
          const json_data = res.data;
          console.log(json_data);
          setData(json_data);
        } else throw new Error('Internal error');
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      enqueueSnackbar('Company name is missing', {
        variant: 'error'
      });
    }
  };

  // TODO: May change to execute SPAQL QUERY
  const handleExecute = async () => {
    // make request here
    setLoading(true);
    try {
      const data = { company_name: companyName, similarity_feature: similarityFeature };
      const res = await axios.post('/KGNet/getForbes2013SimilarCompanies', data);
      if (res.status === 200) {
        setData(res.data);
      } else throw new Error('Internal error');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log('Inside index company');
  console.log(isLoading);
  console.log('Type of data response');
  console.log(typeof data);

  return (
    <Page title="KGNET - Companies Similarities">
      <Header />
      <Details
        handleShowResult={handleShowResult}
        similarityFeature={similarityFeature}
        setCompanyName={setCompanyName}
        setSimilarityFeature={setSimilarityFeature}
      />
      {isLoading && <LinearProgress />}
      {data !== undefined && <Result data={data} mode="companies" handleExecute={handleExecute} />}
    </Page>
  );
};

export default CompanySimilarities;
