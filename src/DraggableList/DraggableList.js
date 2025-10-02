import React, { Component } from "react";

import './draggableList.css';

import icon from '../assets/icon.svg';
import DraggableItem from "../DraggableItem/DraggableItem";

class DraggableList extends Component {
    constructor() {
        super();

        this.state = {
            list: [
                {id: 'a', name: 'Anderson Paak'},
                {id: 'b', name: 'Billie Eilish'},
                {id: 'c', name: 'Childish Gambino'},
                {id: 'd', name: 'Damiano David'},
                {id: 'e', name: 'Elton John'},
                {id: 'f', name: 'Frank Sinatra'}
            ],
            draggedItemIdx: 0,
            draggedOverItemIdx: 0
        }
        this.targetRefs = [];

        this.handleSort = this.handleSort.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    getIndex (id) {
        return this.state.list.findIndex((item) => item.id === id);
    }

    handleSort () {
        const { list, draggedItemIdx, draggedOverItemIdx } = this.state;
        const listClone = [...list];

        listClone.splice(draggedOverItemIdx, 0, listClone.splice(draggedItemIdx, 1)[0]);

        this.setState({ list: listClone});
    }

    handleDragStart (e, item, targetRefs) {
        const elementRef = targetRefs[this.getIndex(item.id)];
        const rect = elementRef.getBoundingClientRect();

        e.dataTransfer.setDragImage(elementRef, 20,  rect.height / 2);
        this.setState({ draggedItemIdx: this.getIndex(item.id) })
    }

    handleTouchMove = (e, targetRefs) => {
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        const index = targetRefs.findIndex((ref) => {
            if (!ref) return false;
            const rect = ref.getBoundingClientRect();
            return (
                x >= rect.left &&
                x <= rect.right &&
                y >= rect.top &&
                y <= rect.bottom
            );
        });

        this.setState({ draggedOverItemIdx: index !== -1 ? index : null });
    }

    handleTouchEnd = () => {
        const { draggedOverItemIdx } = this.state;
        if( draggedOverItemIdx != null) {
            this.handleSort();
        }
    }

    renderDragHandle = (item) => {
        return (
            <img 
                className="dragIcon" 
                src={icon} 
                draggable
                onDragStart={(e) => this.handleDragStart(e, item, this.targetRefs)}
                onDragEnd={this.handleSort}
                onTouchStart={() => this.setState({ draggedItemIdx: this.getIndex(item.id) })}
                onTouchMove={(e) => this.handleTouchMove(e, this.targetRefs)}
                onTouchEnd={() => this.handleTouchEnd()}
                alt="drag handle"
            />
        );
    }

    render() {
        const { list } = this.state;

        return (
            <div className="draggableList">
                {list.map((item) => (
                    <DraggableItem
                        ref={el => this.targetRefs[this.getIndex(item.id)] = el}
                        onDragEnter={() => this.setState({ draggedOverItemIdx: this.getIndex(item.id)})}
                        item={item}
                        renderDragHandle={() => this.renderDragHandle(item)}
                    />
                ))}
                <p>{`draggedItemIdx: ${this.state.draggedItemIdx}`}</p>
                <p>{`draggedOverItemIdx: ${this.state.draggedOverItemIdx}`}</p>
            </div>
        );
    }
}

export default DraggableList;