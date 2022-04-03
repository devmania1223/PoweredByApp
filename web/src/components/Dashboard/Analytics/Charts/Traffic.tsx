import React, { useEffect, useState } from 'react';
import { UserTraffic } from '../../../../store/models';
import { colors } from '../../../../theme/palette';
import { ChartContent } from './ChartContent';
import { Empty } from './Empty';
import { LineGraph } from './LineGraph';

export type TrafficProps = {
  userTraffic: UserTraffic[];
  newTraffic: UserTraffic[];
  returningTraffic: UserTraffic[];
};

export const Traffic = (props: TrafficProps) => {
  const { userTraffic, newTraffic, returningTraffic } = { ...props };

  const options = ['All', 'New', 'Returning'];
  const [selected, setSelected] = useState(options[0]);
  const [data, setData] = useState(userTraffic);

  useEffect(() => {
    switch (selected) {
      case 'All':
        setData(userTraffic);
        break;
      case 'New':
        setData(newTraffic);
        break;
      case 'Returning':
        setData(returningTraffic);
        break;
    }
  }, [selected, userTraffic, newTraffic, returningTraffic, setData]);

  return (
    <ChartContent name="TRAFFIC" options={options} selected={selected} setSelected={setSelected}>
      {data.length > 0 ? <LineGraph data={data} name="Users" color={colors.hotPurpleAccent} /> : <Empty />}
    </ChartContent>
  );
};
