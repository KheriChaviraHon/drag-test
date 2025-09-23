import { Component } from "react";

import './draggableList.css';
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
            ],
            draggedItemIdx: 0,
            draggedOverItemIdx: 0
        }

        this.handleSort = this.handleSort.bind(this);
    }

    getIndex(id) {
        return this.state.list.findIndex((item) => item.id === id);
    }

    handleSort () {
        const { list, draggedItemIdx, draggedOverItemIdx } = this.state;
        const listClone = [...list];

        listClone.splice(draggedOverItemIdx, 0, listClone.splice(draggedItemIdx, 1)[0]);

        this.setState({ list: listClone});
    }

    render() {
        const { list } = this.state;

        return (
            <div className="draggableList">
                {list.map((item) => (
                    <DraggableItem
                        onDragStart={() => this.setState({ draggedItemIdx: this.getIndex(item.id) })}
                        onDragEnter={() => this.setState({ draggedOverItemIdx: this.getIndex(item.id)})}
                        onDragEnd={this.handleSort}
                        onDragOver={(e) => e.preventDefault()}
                        item={item}
                    />
                ))}
                <p>{`draggedItemIdx: ${this.state.draggedItemIdx}`}</p>
                <p>{`draggedOverItemIdx: ${this.state.draggedOverItemIdx}`}</p>
            </div>
        );
    }
}

export default DraggableList;