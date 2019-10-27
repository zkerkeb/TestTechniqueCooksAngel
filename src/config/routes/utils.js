import React from 'react'
import styled from 'styled-components'
import icons from '../../components/icons'

const Button = styled.TouchableOpacity`
  align-items: center;
  height: 60px;
  justify-content: center;
  padding: 12px;
  width: 60px;
  border-radius: 30px;
  background-color: #ffffff13;
`

const Ionicons = icons('Ionicons')

const headerOptions = (navigation, color) => ({
  headerLeft: (
    <Button onPress={() => navigation.popToTop()}>
      <Ionicons
        size={30}
        color={color ? color : 'white'}
        name="ios-arrow-back"
      />
    </Button>
  ),
  headerTransparent: true,
})

export {headerOptions}
