import List from '@material-ui/core/List';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { AppContext } from '../../context/AppContext';
import { Language, Section, Title, Topic } from '../../store/models';
import { DroppableMenuWrapper } from '../ElementMenu/DroppableMenuWrapper';
import { drawerCollapsedWidth } from './LiiingoDrawer';
import { PageAdd } from './PageAdd';
import { PageMenu } from './PageMenu';
import { SectionAdd } from './SectionAdd';
import { SectionMenu } from './SectionMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      paddingLeft: drawerCollapsedWidth,
    },
  })
);

export type AppMenuProps = {
  language: Language;
  locationId: string;
  selectedSection: Section;
  sections: Section[];
  sectionOrder: string[];
  topics: Topic[];
  addTopic: (payload: { sectionId: string; topicOrder: string[]; pageName?: string }) => void;
  addSection: (name: string) => void;
  selectSection: (sectionId: string) => void;
  deleteSection: (sectionId: string) => void;
  saveSection: (section: Partial<Section>) => void;
  reorderSection: (payload: { oldIndex: number; newIndex: number }) => void;
  reorderTopic: (payload: { oldIndex: number; oldSectionId: string; newIndex: number; newSectionId: string }) => void;
  deleteTopic: (topicId: string) => void;
  renameTopic: (payload: { topicId: string; name: Title }) => void;
  checkQrStatus: (topicId: string) => void;
  currentTopicId?: string;
  topicOrder: { sectionId: string[] };
  topicLoading: boolean;
};

export const AppMenu = (props: AppMenuProps) => {
  const {
    language,
    locationId,
    currentTopicId,
    selectedSection,
    sections,
    sectionOrder,
    topics,
    addTopic,
    addSection,
    selectSection,
    deleteSection,
    saveSection,
    reorderSection,
    reorderTopic,
    deleteTopic,
    renameTopic,
    checkQrStatus,
    topicOrder,
    topicLoading,
  } = {
    ...props,
  };
  const classes = useStyles();
  const [showAddSection, setShowAddSection] = useState(true);
  const [showAddPage, setShowAddPage] = useState(false);
  const [sectionDropDisabled, setSectionDropDisabled] = useState(true);
  const [topicDropDisabled, setTopicDropDisabled] = useState(true);
  const [expand, setExpand] = useState(true);
  const { identity } = useContext(AppContext);
  const pageLimit = identity?.restrictions?.pageLimit;

  const addPage = async (pageName: string) => {
    await addTopic({ sectionId: selectedSection.id, topicOrder: selectedSection.topicOrder, pageName });
    let newIndex = selectedSection.topicOrder.indexOf(currentTopicId);
    let oldIndex = selectedSection.topicOrder.length;

    if (newIndex + 1 !== oldIndex)
      reorderTopic({
        oldIndex: oldIndex,
        oldSectionId: selectedSection.id,
        newIndex: newIndex + 1,
        newSectionId: selectedSection.id,
      });
  };

  const moveElement = (e) => {
    if (e.destination) {
      const draggableId = e.draggableId;
      if (sections.map((section) => section.id).includes(draggableId)) {
        if (e.source.index !== e.destination.index) {
          reorderSection({ oldIndex: e.source.index, newIndex: e.destination.index });
        }
      } else if (topics.map((topic) => topic.id).includes(draggableId)) {
        reorderTopic({
          oldIndex: e.source.index,
          oldSectionId: e.source.droppableId,
          newIndex: e.destination.index,
          newSectionId: e.destination.droppableId,
        });
      }
    }
    setShowAddSection(true);
    setSectionDropDisabled(true);
    setTopicDropDisabled(true);
  };

  const handleDragStart = (e) => {
    setShowAddSection(false);
    const draggableId = e.draggableId;
    if (sections.map((section) => section.id).includes(draggableId)) {
      setSectionDropDisabled(false);
    } else if (topics.map((topic) => topic.id).includes(draggableId)) {
      setTopicDropDisabled(false);
    }
  };

  return (
    <DragDropContext onDragEnd={moveElement} onDragStart={handleDragStart}>
      <DroppableMenuWrapper id={locationId} dropDisabled={sectionDropDisabled} disableGutters placeholder>
        <List className={classes.list}>
          <PageAdd
            pageLimit={pageLimit}
            length={topics.length}
            addPage={() => {
              setExpand(true);
              setTimeout(() => setShowAddPage(true), 1); //need to give section a chance to render
            }}
          />
          {sectionOrder.map((sectionId, index) => {
            if (sections.find((section) => section.id === sectionId)) {
              return (
                <SectionMenu
                  key={sectionId}
                  activeLanguageCode={language}
                  id={sectionId}
                  index={index}
                  expand={expand && sectionId === selectedSection?.id}
                  last={sections.length - 1}
                  name={
                    sections
                      .find((section) => section.id === sectionId)
                      ?.name.find((sectionName) => sectionName.language === language)?.name || 'Loading...' //hoping this will only be shown briefly, if at all. Otherwise we have a deeper problem
                  }
                  selectSection={() => selectSection(sectionId)}
                  deleteSection={() => deleteSection(sectionId)}
                  reorderSection={reorderSection}
                  saveSection={saveSection}
                >
                  <PageMenu
                    language={language}
                    dropDisabled={topicDropDisabled}
                    locationId={locationId}
                    sectionId={sectionId}
                    currentTopicId={currentTopicId}
                    disableDelete={topics.length === 1}
                    deleteTopic={deleteTopic}
                    renameTopic={renameTopic}
                    reorderTopic={reorderTopic}
                    checkQrStatus={checkQrStatus}
                    topics={topics.filter((topic) => topic.sectionId === sectionId)}
                    topicOrder={topicOrder[sectionId]}
                    showAddPage={showAddPage && selectedSection.id === sectionId}
                    setShowAddPage={setShowAddPage}
                    addTopic={addPage}
                    topicLoading={topicLoading}
                  />
                </SectionMenu>
              );
            } else {
              return null;
            }
          })}
          {showAddSection && pageLimit !== topics.length && (
            <SectionAdd addSection={addSection} pageCount={topics.length} />
          )}
        </List>
      </DroppableMenuWrapper>
    </DragDropContext>
  );
};
