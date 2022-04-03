import React, { useEffect, useState } from 'react';
import { PageViewsType, Topic } from '../../../../store/models';
import { colors } from '../../../../theme/palette';
import { ChartContent } from './ChartContent';
import { Empty } from './Empty';
import { LineGraph } from './LineGraph';

export type PageViewsProps = {
  data: PageViewsType[];
  topics: Topic[];
};

export const PageViews = (props: PageViewsProps) => {
  const { data, topics } = { ...props };
  const [selected, setSelected] = useState('');
  const [views, setViews] = useState([]);

  const pageNames = topics.map((topic) => topic.name.find((lang) => lang.language === 'en').name || topic.name[0].name);
  const pageNameLookup = topics.reduce((obj, { name, id }) => {
    obj[name.find((lang) => lang.language === 'en').name || name[0].name] = id;
    return obj;
  }, {});

  useEffect(() => {
    if (Object.keys(pageNameLookup).length > 0) {
      setViews(data.find((obj) => obj.exhibitId === pageNameLookup[selected])?.views);
    }
  }, [selected, data, pageNameLookup]);

  useEffect(() => {
    const temp = topics.map(
      (topic) => topic.name.find((lang) => lang.language === 'en').name || topic.name[0]?.name
    )[0];
    if (temp !== undefined) setSelected(temp);
  }, [topics]);

  return (
    <ChartContent name="PAGE VIEWS" options={pageNames} selected={selected} setSelected={setSelected}>
      {views ? (
        <LineGraph data={views} name="Views" color={colors.tealAccent} />
      ) : (
        <Empty message={`No page data for ${selected}.`} />
      )}
    </ChartContent>
  );
};
