import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class ItemDisplayer extends Component {
  static propTypes = {
    contentContainerStyle: PropTypes.object,
    data: PropTypes.array.isRequired,
    horizontal: PropTypes.bool,
    ListEmptyComponent: PropTypes.node,
    numColumns: PropTypes.number,
    onEndReached: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
  }

  render() {
    const {
      contentContainerStyle,
      data,
      horizontal = false,
      ListEmptyComponent,
      numColumns,
      onEndReached,
      renderItem,
    } = this.props
    return (
      <ItemsDisplayer
        contentContainerStyle={contentContainerStyle}
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={horizontal}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={ListEmptyComponent}
        numColumns={numColumns}
        onEndReached={onEndReached}
        renderItem={({item}) => renderItem(item)}></ItemsDisplayer>
    )
  }
}

const ItemsDisplayer = styled.FlatList`
  flex-grow: ${props => (props.horizontal ? '0' : '1')};
`
