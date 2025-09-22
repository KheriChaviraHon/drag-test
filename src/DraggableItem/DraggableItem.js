import { Component } from "react";
import icon from '../assets/icon.svg';
import './draggableItem.css';

class DraggableItem extends Component {
    render() {
        const { onDragStart, onDragEnter, onDragEnd, onDragOver, item} = this.props;

        return (
            <div
                className="draggableItem"
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
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
    }
}

export default DraggableItem;