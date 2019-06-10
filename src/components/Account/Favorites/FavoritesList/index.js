import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import FavoriteItem from './FavoriteItem'

class FavoritesList extends Component {
  constructor (props) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onRemoveFavorite = this.onRemoveFavorite.bind(this)

    this.state = {
      isDragging: false,
    }
  }

  onDragStart = () => {
    this.setState({
      isDragging: true,
    })
  }

  onDragEnd = (result) => {
    this.setState({
      isDragging: false,
    })

    const { destination, source, draggableId } = result
    // Cancelled drag and drop event, dragged outside the list, or didn't move anywhere
    if (!destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    if (destination.droppableId === 'remove') {
      this.onRemoveFavorite(this.props.kind, draggableId)
    } else {
      // Create a new array to update the state with the new item order
      const newList = JSON.parse(JSON.stringify(this.props.items))
      const listItem = this.props.items.find((item) => item.key === draggableId)
      newList.splice(source.index, 1)
      newList.splice(destination.index, 0, listItem)

      this.props.updateList(newList)
    }
  }

  onRemoveFavorite = (kind, itemId) => {
    const itemIndex = this.props.items.findIndex((item) => item.key === itemId)
    if (itemIndex >= 0) {
      const newList = JSON.parse(JSON.stringify(this.props.items))
      newList.splice(itemIndex, 1)

      this.props.updateList(newList)
    }
  }

  render () {
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <Droppable droppableId={this.props.kind}>
          { (provided) => (
            // React beautiful DND expects a function; this lets us specify our own DOM elements
            <div className='favorite-list' {...provided.droppableProps} ref={provided.innerRef}>
              { this.props.items.map((obj, index) =>
                <FavoriteItem
                  key={obj.key}
                  kind={this.props.kind}
                  id={obj.key}
                  url={obj.url}
                  title={obj.title}
                  index={index}
                  dragDisabled={this.props.disabled}
                  onRemoveFavorite={this.onRemoveFavorite}
                />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {
          // User's didn't get it. :( I still think this is a good idea if we could refine the UI to be a tad more intuitive.
          // { this.props.items.length > 0 && (
          //   <Droppable droppableId='remove'>
          //     { (provided, snapshot) => {
          //       const draggingClass = (this.state.isDragging ? 'dragging' : '')
          //       const draggedOverClass = (snapshot.isDraggingOver ? 'draggedOver' : '')
          //       return (
          //         <div
          //           className={`dnd-remove-area ${draggingClass} ${draggedOverClass}`}
          //           ref={provided.innerRef}
          //           {...provided.droppableProps}
          //         >
          //           <span>Drag item and drop here to remove.</span>
          //           {provided.placeholder}
          //         </div>
          //       )
          //     }}
          //   </Droppable>
          // )}
        }
      </DragDropContext>
    )
  }
}

FavoritesList.propTypes = {
  kind: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  updateList: PropTypes.func,
  disabled: PropTypes.bool,
}

export default FavoritesList
