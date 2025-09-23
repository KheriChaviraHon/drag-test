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

        const temp = listClone[draggedItemIdx];
        listClone[draggedItemIdx] = listClone[draggedOverItemIdx];
        listClone[draggedOverItemIdx] = temp;

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
                <p>{`draggedItemIdxx: ${this.state.draggedItemIdx}`}</p>
                <p>{`draggedOverItemIdxx: ${this.state.draggedOverItemIdx}`}</p>
            </div>
        );
    }
}

export default DraggableList;