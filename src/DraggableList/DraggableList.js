import { Component } from "react";

import './draggableList.css';
import DraggableItem from "../DraggableItem/DraggableItem";

class DraggableList extends Component {
    constructor() {
        super();

        this.state = {
            list: [
                {id: 0, name: 'Anderson Paak'},
                {id: 1, name: 'Billie Eilish'},
                {id: 2, name: 'Childish Gambino'},
                {id: 3, name: 'Damiano David'},
            ],
            draggedItemId: 0,
            draggedOverItemId: 0
        }

        this.handleSort = this.handleSort.bind(this);
    }

    handleSort () {
        const { list, draggedItemId, draggedOverItemId } = this.state;

        const listClone = [...list];
        const temp = listClone[draggedItemId];
        listClone[draggedItemId] = listClone[draggedOverItemId];
        listClone[draggedOverItemId] = temp;

        this.setState({ list: listClone});
    }

    render() {
        const { list } = this.state;

        return (
            <div className="draggableList">
                {list.map((item) => (
                    <DraggableItem
                        onDragStart={() => this.setState({ draggedItemId: item.id })}
                        onDragEnter={() => this.setState({ draggedOverItemId: item.id})}
                        onDragEnd={this.handleSort}
                        onDragOver={(e) => e.preventDefault()}
                        item={item}
                    />
                ))}
                <p>{`draggedItemId: ${this.state.draggedItemId}`}</p>
                <p>{`draggedOverItemId: ${this.state.draggedOverItemId}`}</p>
            </div>
        );
    }
}

export default DraggableList;