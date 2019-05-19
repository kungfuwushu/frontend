import React, { FunctionComponent } from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const OrderableList:FunctionComponent<{
    items: any[];
    renderItem: (item: any, index: number) => {};
    onReorder: (items: any[], startIndex: number, endIndex: number) => {};
    className?: string;
}> = ({ items, renderItem, onReorder, className }) => {
    const handleSortEnd = ({source, destination}: any) => {
        if (!destination) {
          return;
        }
        
        const reordered = Array.from(items);
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);

        onReorder(
            reordered,
            source.index,
            destination.index
        );
    }
    
	return (
        <DragDropContext onDragEnd={handleSortEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={className}
                >
                    {items.map((item, index) => (
                    <Draggable key={index} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${snapshot.isDragging ? "dragged" : "draggable"}`}
                        >
                            {renderItem(item, index)}
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
	);
}

export default OrderableList;