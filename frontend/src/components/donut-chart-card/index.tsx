import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { buildDonutChartConfig } from './helpers';
import SalesAmount from '../sales-amount';

type Props = {
  labels?: string[];
  series?: number[];
  sum?: number;
};

function DonutChartCard({ sum = 0, labels = [], series = [] }: Props) {

  return (
    <>
      <div className="donut-chart-card-container base-card">
        <SalesAmount sum={sum} />
        <div className="donut-chart-graphic">
          <ReactApexChart
            options={buildDonutChartConfig(labels)}
            type="donut"
            width="350"
            height="350"
            series={series}
          />
        </div>
      </div>
    </>
  )
}

export default DonutChartCard;
