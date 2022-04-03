import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { UserTraffic } from '../../../../store/models';
import { colors } from '../../../../theme/palette';
import { GraphTooltip } from './GraphTooltip';

export type LineGraphProps = {
  color: string;
  name: string;
  data: UserTraffic[];
  height?: number;
  width?: number;
};

const defaultProps = {
  width: 312,
  height: 111,
};

export const LineGraph = (props: LineGraphProps) => {
  const { color, name, data, width, height } = { ...defaultProps, ...props };

  const preparedData = data.map((obj) => [obj.key, obj.value]);

  const chartConfig: Highcharts.Options = {
    title: {
      text: null,
    },
    legend: {
      enabled: false,
    },
    chart: {
      height,
      width,
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        step: Math.floor(preparedData.length / 5),
        style: {
          color: colors.grayLight,
          fontSize: '9px',
        },
      },
    },
    yAxis: [
      {
        tickInterval: 5,
        title: {
          text: null,
        },
      },
    ],
    series: [
      {
        type: preparedData.length > 1 ? 'area' : 'column',
        data: preparedData,
        name: name,
        opacity: 0.5,
        color: color,
      },
    ],
    credits: {
      enabled: false, //removing watermark
    },
    tooltip: {
      useHTML: true,
      backgroundColor: colors.grayDark,
      borderWidth: 0,
      borderRadius: 4,
      padding: 0,
      formatter() {
        const display = data.find((obj) => obj.key === this.key.toString()).display;
        const value = this.y;
        const index = data.map((obj) => obj.key).indexOf(this.key.toString());
        const change = index
          ? Math.round(((data[index].value - data[index - 1].value) / data[index - 1].value) * 100)
          : null;
        return renderToString(<GraphTooltip title={display} value={value} change={change} />);
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={chartConfig} />;
};
