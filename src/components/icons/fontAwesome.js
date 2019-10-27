import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledIconFontAwesome = styled(FontAwesome)`
  color: ${props =>
    props.color ? props.color : props.theme.font.defaultIconColor};
`

const IconFontAwesome = ({name = 'home', size = 22, color}) => {
  return <StyledIconFontAwesome name={name} size={size} color={color} />
}

IconFontAwesome.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  isSelected: PropTypes.bool,
}

export default IconFontAwesome
