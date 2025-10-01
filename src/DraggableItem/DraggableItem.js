import React, { forwardRef } from "react";
import './draggableItem.css';

const DraggableItem = forwardRef((props, ref) => {
    const {onDragEnter, onDragOver, item, onTouchStart, onTouchMove, onTouchEnd, renderDragHandle } = props;

    return (
        <div
            ref={ref}
            className="draggableItem"
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