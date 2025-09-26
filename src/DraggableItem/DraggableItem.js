import React, { forwardRef } from "react";
import icon from '../assets/icon.svg';
import './draggableItem.css';

const DraggableItem = forwardRef((props, ref) => {
    const { onDragStart, onDragEnter, onDragEnd, onDragOver, item, onTouchStart, onTouchMove, onTouchEnd } = props;

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
            <img 
                className="dragIcon" 
                src={icon} 
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                alt="drag handle"
            />
            <p>{item.name}</p>
        </div>
    );
});

export default DraggableItem;