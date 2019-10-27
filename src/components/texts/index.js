import styled from 'styled-components'
const CommonText = styled.Text`
  font-family: 'Helvetica Neue';
  color: ${props =>
    props.color ? props.color : props.theme.font.commonTextColor};
  font-size: ${props => (props.size ? props.size : 22)};
  font-weight: ${props => (props.weight ? props.weight : 'normal')};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')}
  line-height:  ${props => (props.size ? props.size + 2 : 24)};
  text-decoration:${props =>
    props.textDecoration ? props.textDecoration : 'none'};
  text-transform: ${props =>
    props.textTransform ? props.textTransform : 'none'};
  letter-spacing: ${props => (props.letterSpacing ? props.letterSpacing : 0)};
`

CommonText.defaultProps = CommonText.defaultProps || {}
CommonText.defaultProps.allowFontScaling = false

export {CommonText}
