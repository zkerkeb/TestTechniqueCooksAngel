import React from 'react'
import IconIonIcons from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledIonIcons = styled(IconIonIcons)`
  color: ${props =>
    props.color ? props.color : props.theme.font.defaultIconColor};
`

const IonIcons = ({name = 'home', size = 22, color}) => {
  return <StyledIonIcons name={name} size={size} color={color} />
}

IonIcons.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  isSelected: PropTypes.bool,
}

export default IonIcons
