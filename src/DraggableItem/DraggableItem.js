import React, { forwardRef } from "react";
import './draggableItem.css';

const DraggableItem = forwardRef((props, ref) => {
    const {
        item,
        onDragEnter,
        onDragOver,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        renderDragHandle,
        dragging,
        transform
    } = props;

    return (
        <div
            ref={ref}
            className={`draggableItem ${dragging ? 'dragging' : ''}`}
            style={dragging ? {transform: `translate(${transform.x}px,${transform.y}px)`} : {}}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
           {renderDragHandle()}
            <p>{item.name}</p>
        </div>
    );
});

export default DraggableItem;