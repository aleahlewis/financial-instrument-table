import { render, screen, fireEvent} from '@testing-library/react';
import FinancialInstrumentTable from './FinancialInstrumentTable';
import  {TInstrument}  from "../FinancialInstrumentTable/types/Instrument";

const testData: TInstrument[] = [
  {
    "ticker": "ALPHA",
    "price": 3150.67,
    "assetClass": "Credit"
  },
  {
    "ticker": "BETA",
    "price": 3791.37,
    "assetClass": "Equities"
  },
  {
    "ticker": "GAMMA",
    "price": 2299.1,
    "assetClass": "Equities"
  },
  {
    "ticker": "DELTA",
    "price": 3132.66,
    "assetClass": "Equities"
  },
  {
    "ticker": "EPSILON",
    "price": 1168.46,
    "assetClass": "Credit"
  },
  {
    "ticker": "ZETA",
    "price": 2716.78,
    "assetClass": "Credit"
  },
  {
    "ticker": "ETA",
    "price": -3089.2,
    "assetClass": "Macro"
  },
  {
    "ticker": "THETA",
    "price": 1075.44,
    "assetClass": "Macro"
  },
  {
    "ticker": "IOTA",
    "price": 1096.64,
    "assetClass": "Macro"
  },
  {
    "ticker": "KAPPA",
    "price": 2321.17,
    "assetClass": "Credit"
  },
  {
    "ticker": "LAMBDA",
    "price": 1472.2,
    "assetClass": "Credit"
  },
  {
    "ticker": "MU",
    "price": 2136.64,
    "assetClass": "Macro"
  },
  {
    "ticker": "NU",
    "price": 2744.89,
    "assetClass": "Macro"
  },
  {
    "ticker": "OMIKRON",
    "price": 2735.1,
    "assetClass": "Equities"
  },
  {
    "ticker": "SIGMA",
    "price": 1854.19,
    "assetClass": "Equities"
  },
  {
    "ticker": "TAU",
    "price": 2082.71,
    "assetClass": "Macro"
  },
  {
    "ticker": "OMEGA",
    "price": 2306.35,
    "assetClass": "Equities"
  },
  {
    "ticker": "PSI",
    "price": 2997.78,
    "assetClass": "Credit"
  }
]

  test('should render the table header', () => {
    render(<FinancialInstrumentTable data={testData}/>);
    const priceElement = screen.getByText('Price')
    const tickerElement = screen.getByText('Ticker')
    const assetClassElement = screen.getByText('Asset Class')

    expect(priceElement).toBeInTheDocument();
    expect(tickerElement).toBeInTheDocument();
    expect(assetClassElement).toBeInTheDocument();
  });

  test('should have more than 2 rows', () => {
    render(<FinancialInstrumentTable data={testData}/>);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(2);
  });

  test('should sort by ticker when ticker in table header is clicked', () => {
    render(<FinancialInstrumentTable data={testData}/>);
    const tickerHeader = screen.getByText('Ticker');
    fireEvent.click(tickerHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('ALPHA');
    expect(rows[2]).toHaveTextContent('BETA');
  });

  test('should sort by price when price in table header is clicked', () => {
    render(<FinancialInstrumentTable data={testData}/>);
    const tickerHeader = screen.getByText('Price');
    fireEvent.click(tickerHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('3791.37');
    expect(rows[2]).toHaveTextContent('3150.67');
  });

  test('should sort by Asset Class when Asset Class in table header is clicked', () => {
    render(<FinancialInstrumentTable data={testData}/>);
    const tickerHeader = screen.getByText('Asset Class');
    fireEvent.click(tickerHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Equities');
    expect(rows[rows.length - 1]).toHaveTextContent('Credit');
  });

  test('should render negative prices with price-red class', () => {
  
    render(<FinancialInstrumentTable data={testData}/>);

    const negativePriceRegex = /-\d+(\.\d+)?/;
    const negativePriceElement = screen.getByText(negativePriceRegex);
    expect(negativePriceElement).toHaveClass('price-red');
  });