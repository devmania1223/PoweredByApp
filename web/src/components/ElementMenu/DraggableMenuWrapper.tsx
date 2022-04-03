import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function draggableStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    transitionDuration: `0.00000001s`, //according to the docs, this cannot be 0 but near 0 https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md
  };
}

export type DraggableMenuWrapperProps = {
  index: number;
  id: string;
  showSnapshot?: boolean;
};

const defaultProps = {
  showSnapshot: true,
};

export const DraggableMenuWrapper: React.FC<DraggableMenuWrapperProps> = (props) => {
  const { children, id, index, showSnapshot } = { ...defaultProps, ...props };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={draggableStyle(provided.draggableProps.style, snapshot)}
          >
            {children}
          </div>
          {showSnapshot && snapshot.isDragging && children}
        </>
      )}
    </Draggable>
  );
};
