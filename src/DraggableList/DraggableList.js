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
            draggedOverItemIdx: 0,
            dragging: false,
            touchPosition: {x: 0, y: 0},
            elementPosition: {x: 0, y: 0}
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

        this.setState({touchPosition: {x: x, y: y}});

        const matchingIndexes = targetRefs.reduce((matches, ref, index) => {
            if (!ref) return matches;
            const rect = ref.getBoundingClientRect();
            if (
                x >= rect.left &&
                x <= rect.right &&
                y >= rect.top &&
                y <= rect.bottom
            ) {
                matches.push(index);
            }
            return matches;
        }, []);

        const index = matchingIndexes.find((index) => 
            index !== this.state.draggedItemIdx
        );

        this.setState({ draggedOverItemIdx: index !== -1 ? index : null });
    }

    handleTouchStart = (e, item) => {
        const elementRef = this.targetRefs[this.getIndex(item.id)];
        const rect = elementRef.getBoundingClientRect();
        
        this.setState({ 
            draggedItemIdx: this.getIndex(item.id),
            dragging: true,
            elementPosition: {x: rect.x, y: rect.y}
        });
    }

    handleTouchEnd = () => {
        const { draggedItemIdx, draggedOverItemIdx } = this.state;
        if( draggedOverItemIdx != null && draggedItemIdx != null) {
            this.handleSort();
        }
        this.setState({dragging: false});
    }

    renderDragHandle = (item) => {
        return (
            <img 
                className="dragIcon" 
                src={icon} 
                draggable
                onDragStart={(e) => this.handleDragStart(e, item, this.targetRefs)}
                onDragEnd={this.handleSort}
                onTouchStart={(e) => {this.handleTouchStart(e, item)}}
                onTouchMove={(e) => this.handleTouchMove(e, this.targetRefs)}
                onTouchEnd={() => this.handleTouchEnd()}
                alt="drag handle"
            />
        );
    }

    renderDraggableItem = (item) => {
        const { touchPosition, elementPosition } = this.state;

        const dragging = this.state.dragging && this.state.draggedItemIdx === this.getIndex(item.id);
        const transform = {
            x: touchPosition.x - elementPosition.x - 15,
            y: touchPosition.y - elementPosition.y - 20
        }

        return (
            <DraggableItem
                item={item}
                ref={el => this.targetRefs[this.getIndex(item.id)] = el}
                onDragEnter={() => this.setState({ draggedOverItemIdx: this.getIndex(item.id)})}
                renderDragHandle={() => this.renderDragHandle(item)}
                dragging={dragging}
                transform={transform}
            />
        );
    }

    render() {
        const { list } = this.state;

        return (
            <div className="draggableList">
                {list.map((item) => this.renderDraggableItem(item))}
                <p>{`draggedItemIdx: ${this.state.draggedItemIdx}`}</p>
                <p>{`draggedOverItemIdx: ${this.state.draggedOverItemIdx}`}</p>
            </div>
        );
    }
}

export default DraggableList;