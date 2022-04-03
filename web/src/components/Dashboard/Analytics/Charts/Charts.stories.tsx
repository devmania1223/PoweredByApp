import Box from '@material-ui/core/Box';
import React from 'react';
import { colors } from '../../../../theme/palette';
import { GraphTooltip, GraphTooltipProps } from './GraphTooltip';
import { LineGraph, LineGraphProps } from './LineGraph';
import { MostViewed, MostViewedProps } from './MostViewed';

const CenteredBox: React.FC = (props) => {
  const { children } = { ...props };
  return (
    <Box
      style={{
        display: 'flex',
        width: '100%',
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default {
  component: LineGraph,
  title: 'Charts',
  excludeStories: [],
  decorators: [
    (Story: React.FunctionComponent) => (
      <CenteredBox>
        <Story />
      </CenteredBox>
    ),
  ],
};

const lineSampleData = [
  {
    key: 'Test 1',
    value: 1,
    display: 'Test 1 Display',
  },
  {
    key: 'Test 2',
    value: 2,
    display: 'Test 2 Display',
  },
  {
    key: 'Test 3',
    value: 3,
    display: 'Test 3 Display',
  },
  {
    key: 'Test 4',
    value: 4,
    display: 'Test 4 Display',
  },
  {
    key: 'Test 5',
    value: 5,
    display: 'Test 5 Display',
  },
  {
    key: 'Test 6',
    value: 6,
    display: 'Test 6 Display',
  },
  {
    key: 'Test 7',
    value: 7,
    display: 'Test 7 Display',
  },
  {
    key: 'Test 8',
    value: 8,
    display: 'Test 8 Display',
  },
  {
    key: 'Test 9',
    value: 9,
    display: 'Test 9 Display',
  },
  {
    key: 'Test 10',
    value: 10,
    display: 'Test 10 Display',
  },
  {
    key: 'Test 11',
    value: 8,
    display: 'Test 11 Display',
  },
  {
    key: 'Test 12',
    value: 7,
    display: 'Test 12 Display',
  },
  {
    key: 'Test 13',
    value: 11,
    display: 'Test 13 Display',
  },
  {
    key: 'Test 14',
    value: 12,
    display: 'Test 14 Display',
  },
  {
    key: 'Test 15',
    value: 13,
    display: 'Test 15 Display',
  },
  {
    key: 'Test 16',
    value: 14,
    display: 'Test 16 Display',
  },
  {
    key: 'Test 17',
    value: 15,
    display: 'Test 17 Display',
  },
  {
    key: 'Test 18',
    value: 12,
    display: 'Test 18 Display',
  },
  {
    key: 'Test 19',
    value: 13,
    display: 'Test 19 Display',
  },
  {
    key: 'Test 20',
    value: 16,
    display: 'Test 20 Display',
  },
];

const mostViewedData = [
  {
    label: {
      name: 'Test 1',
      language: 'en',
    },
    value: 25,
    change: 50,
  },
  {
    label: {
      name: 'Test 2',
      language: 'en',
    },
    value: 20,
    change: -10,
  },
  {
    label: {
      name: 'Test 3',
      language: 'en',
    },
    value: 14,
  },
  {
    label: {
      name: 'Test 4',
      language: 'en',
    },
    value: 9,
    change: 28,
  },
  {
    label: {
      name: 'Test 5',
      language: 'en',
    },
    value: 2,
    change: -18,
  },
];

const LineGraphTemplate = (args: LineGraphProps) => <LineGraph {...args} />;
export const Line = LineGraphTemplate.bind({});
Line.args = {
  color: colors.greenDark,
  name: 'Story Graph',
  data: lineSampleData,
  width: 624,
  height: 222,
};

const TooltipTemplate = (args: GraphTooltipProps) => <GraphTooltip {...args} />;
export const Tooltip = TooltipTemplate.bind({});
Tooltip.args = {
  title: 'Jul 5, 2021',
  value: '64',
  change: -13,
};

const MostViewedTemplate = (args: MostViewedProps) => <MostViewed {...args} />;
export const Views = MostViewedTemplate.bind({});
Views.args = {
  data: mostViewedData,
};
