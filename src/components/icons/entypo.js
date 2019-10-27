import React from 'react'
import IconEntypo from 'react-native-vector-icons/Entypo'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledIconEntypo = styled(IconEntypo)`
  color: ${props =>
    props.color ? props.color : props.theme.font.defaultIconColor};
`

const Entypo = ({name = 'home', size = 22, color}) => {
  return <StyledIconEntypo name={name} size={size} color={color} />
}

Entypo.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  isSelected: PropTypes.bool,
}

export default Entypo
