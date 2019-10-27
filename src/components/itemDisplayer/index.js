import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class ItemDisplayer extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    onEndReached: PropTypes.func.isRequired,
    horizontal: PropTypes.bool,
    contentContainerStyle: PropTypes.object,
    ListEmptyComponent: PropTypes.node,
    numColumns: PropTypes.number,
  }

  render() {
    const {
      contentContainerStyle,
      data,
      horizontal = false,
      ListEmptyComponent,
      onEndReached,
      renderItem,
      numColumns,
    } = this.props
    return (
      <ItemsDisplayer
        contentContainerStyle={contentContainerStyle}
        data={data}
        numColumns={numColumns}
        horizontal={horizontal}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={onEndReached}
        renderItem={({item}) => renderItem(item)}></ItemsDisplayer>
    )
  }
}

const ItemsDisplayer = styled.FlatList`
  flex-grow: ${props => (props.horizontal ? '0' : '1')};
`
