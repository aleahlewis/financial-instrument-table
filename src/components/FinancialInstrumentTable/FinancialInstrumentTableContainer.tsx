import { useEffect, useState } from 'react';
import FinancialInstrumentTable from './FinancialInstrumentTable';
import { TInstrument } from './types/Instrument';

const FinancialInstrumentTableContainer = () => {

    const [fetchedData, setFetchedData]=useState<TInstrument[]>([]);
    
    // Fetch data
    useEffect(()=>{
      const getData = async () => {
        try {
            const response = await fetch('data/sample-financial-instruments-data.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const json = await response.json();
            setFetchedData(json);

        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    getData();
    },[])

    return (
       <FinancialInstrumentTable data={fetchedData}/>
    );
};

export default FinancialInstrumentTableContainer;