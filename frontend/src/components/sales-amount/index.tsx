import './styles.css';
import { formatPrice } from '../../util/formatters';

type Props = {
  sum: number;
}

function SalesAmount({ sum }: Props) {
  return (
    <>
      <div className='sales-amount-container'>
        <h2 className='sales-amount-value'>{formatPrice(sum)}</h2>
        <span className='sales-amount-description'>Total de vendas</span>
      </div>
    </>
  )
}

export default SalesAmount