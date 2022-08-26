import { ApexOptions } from 'apexcharts';

export const buildDonutChartConfig = (labels: string[]) => {
  return {
    labels,
    noData: {
      text: 'Sem resultados',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#FFF',
        fontSize: '18px',
        fontFamily: 'Roboto, sans-serif',
      },
    },
    colors: ['#FF7A00', '#7234F5', '#FF0000'],
    grid: {
      padding: {
        bottom: 25
      }
    },
    legend: {
      show: true,
      floating: false,
      position: 'bottom',
      width: 130,
      horizontalAlign: 'left',
      labels: {
        colors: ['var(--tertiary-color)']
      },
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px',
      itemMargin: {
        vertical: 8
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        size: 400,
        expandOnClick: false,
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: false,
              showAlways: true,
              fontSize: '24px',
              color: '#ABB1C0',
              fontFamily: 'Roboto, sans-serif',
              formatter: function () {
                return '';
              }
            }
          }
        }
      }
    },
    chart: {
      sparkline: {
        enabled: true
      },
      height: '400px',
    }
  } as ApexOptions;
};
