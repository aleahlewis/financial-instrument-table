import { useState } from 'react';
import styles from './FinancialInstrumentTableStyle.module.css'
import { TInstrument } from './types/Instrument';

const SORT_BY_TICKER = 'ticker';
const SORT_BY_ASSET_CLASS = 'assetClass';
const SORT_BY_PRICE = 'price';

const ASSET_CLASS_ORDER: Record<string, number> = {
    Equities: 0,
    Macro: 1,
    Credit: 2,
  };

  type Props = {
    data:TInstrument[]
  }

const FinancialInstrumentTable = ({data}:Props) => {

    const [sort, setSort] = useState<string>(SORT_BY_ASSET_CLASS);

    const handleSort = (key: string) => {
        setSort(key);
    };
    
    const getPriceStyle = (price: number): string => {
        return price >= 0? 'price-blue' : 'price-red'
    }

    return (
        <table className={styles.table} >
        <thead>
          <tr>
            <th onClick={() => handleSort(SORT_BY_TICKER)}>Ticker</th>
            <th onClick={() => handleSort(SORT_BY_PRICE)}>Price</th>
            <th onClick={() => handleSort(SORT_BY_ASSET_CLASS)}>Asset Class</th>
          </tr>
        </thead>
        <tbody>
          {data
            .sort((a, b) => {
                switch (sort) {
                    case SORT_BY_ASSET_CLASS:
                      return ASSET_CLASS_ORDER[a.assetClass] - ASSET_CLASS_ORDER[b.assetClass];
                    case SORT_BY_PRICE:
                      return b[sort] - a[sort];
                    case SORT_BY_TICKER:
                      return a[sort].localeCompare(b[sort]);
                    default:
                      return 0;
                  }
              })
            .map((instrument) => (
              <tr key={instrument.ticker} className={styles[instrument.assetClass]}>
                <td>{instrument.ticker}</td>
                <td className={styles[getPriceStyle(instrument.price)]}>{instrument.price}</td>
                <td>{instrument.assetClass}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
};

export default FinancialInstrumentTable;