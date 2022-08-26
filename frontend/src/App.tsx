import './App.css';
import { useCallback, useState } from 'react';
import Filter from './components/filter';
import Header from './components/header';
import { buildSalesByStoreChart } from './helpers';
import { Gender, LabelsAndSeries, Sales } from './types';
import DonutChartCard from './components/donut-chart-card';

function App() {

  const [sales, setSales] = useState<Sales>();
  const [labelsAndSeries, setLabelsAndSeries] = useState<LabelsAndSeries>()

  const formatLabels = (gender: Gender) => {
    const textGender = {
      FEMALE: 'Feminino',
      MALE: 'Masculino',
      OTHER: 'Outros'
    }
    return textGender[gender];
  }

  const onSubmitSales = useCallback((data: Sales) => {
    setSales(data);
    const newSales = buildSalesByStoreChart(data.salesByGender);
    const formatedText = newSales.labels;
    const textLabel = formatedText.map(e => formatLabels(e));

    setLabelsAndSeries({ labels: textLabel, series: newSales.series });
  }, [])

  return (
    <>
      <Header />
      <main className="main-container">
        <Filter onSubmitSales={onSubmitSales} />
        {(labelsAndSeries && sales?.salesSummary) && (
          <DonutChartCard sum={sales.salesSummary.sum} labels={labelsAndSeries.labels} series={labelsAndSeries.series} />
        )}
      </main>
    </>
  );
}

export default App;
