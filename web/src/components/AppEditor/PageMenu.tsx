import List from '@material-ui/core/List';
import React from 'react';
import { Language, Title, Topic } from '../../store/models';
import { DroppableMenuWrapper } from '../ElementMenu/DroppableMenuWrapper';
import { PageMenuItem } from './PageMenuItem';
import { PageMenuItemAdd } from './PageMenuItemAdd';

export type PageMenuOption = {
  topicId: string;
  displayName: string;
};

export type PageMenuProps = {
  language: Language;
  locationId: string;
  sectionId: string;
  topics: Topic[];
  topicOrder: string[];
  disableDelete: boolean;
  currentTopicId?: string;
  dropDisabled?: boolean;
  showAddPage: boolean;
  topicLoading: boolean;
  setShowAddPage: (show: boolean) => void;
  deleteTopic: (topicId: string) => void;
  renameTopic: (payload: { topicId: string; name: Title }) => void;
  reorderTopic: (payload: { oldIndex: number; oldSectionId: string; newIndex: number; newSectionId: string }) => void;
  addTopic: (pageName: string) => void;
  checkQrStatus: (topicId: string) => void;
};

const defaultProps = {
  dropDisabled: false,
  showAddPage: false,
};

export const PageMenu = (props: PageMenuProps) => {
  const {
    language,
    locationId,
    sectionId,
    currentTopicId,
    topics,
    topicOrder,
    disableDelete,
    dropDisabled,
    showAddPage,
    topicLoading,
    setShowAddPage,
    deleteTopic,
    renameTopic,
    reorderTopic,
    addTopic,
    checkQrStatus,
  } = {
    ...defaultProps,
    ...props,
  };

  return (
    <DroppableMenuWrapper id={sectionId} dropDisabled={dropDisabled}>
      <List>
        {topicOrder.map((topicId, index) => {
          if (topics.find((topic) => topic.id === topicId)) {
            let topic = topics.find((topic) => topic.id === topicId);
            return (
              <>
                <PageMenuItem
                  key={index}
                  locationId={locationId}
                  status={topic.status}
                  enableSharing={topic.enableSharing}
                  topicId={topicId}
                  topicLink={topic.branchLinkUrl}
                  index={index}
                  last={topicOrder.length - 1}
                  selected={topicId === currentTopicId}
                  displayName={
                    topic.name.find((topicName) => topicName.language === language)?.name || 'Missing translation'
                  }
                  qrZip={topic.qrZip}
                  disableDelete={disableDelete}
                  deleteTopic={deleteTopic}
                  renameTopic={renameTopic}
                  moveUp={() =>
                    reorderTopic({
                      oldIndex: index,
                      oldSectionId: sectionId,
                      newIndex: index - 1,
                      newSectionId: sectionId,
                    })
                  }
                  moveDown={() =>
                    reorderTopic({
                      oldIndex: index,
                      oldSectionId: sectionId,
                      newIndex: index + 1,
                      newSectionId: sectionId,
                    })
                  }
                  checkQrStatus={() => checkQrStatus(topicId)}
                />

                {topicId === currentTopicId ? (
                  <PageMenuItemAdd
                    visible={showAddPage}
                    loading={topicLoading}
                    setVisible={setShowAddPage}
                    addTopic={addTopic}
                    key={`add-${index}`}
                  />
                ) : (
                  <></>
                )}
              </>
            );
          } else {
            return null;
          }
        })}
        {currentTopicId === null || topics.length === 0 ? (
          <PageMenuItemAdd
            visible={showAddPage}
            loading={topicLoading}
            setVisible={setShowAddPage}
            addTopic={addTopic}
            key={`add-zero`}
          />
        ) : (
          <></>
        )}
      </List>
    </DroppableMenuWrapper>
  );
};
