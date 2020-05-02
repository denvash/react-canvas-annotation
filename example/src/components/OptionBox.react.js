import React from 'react'
import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import tw from 'twin.macro'

const NOOP = () => {}

const OptionBox = ({
  className,
  children,
  onClick = NOOP,
  isPressed = false,
  disabled = false
}) => (
  <Container
    className={className}
    onClick={onClick}
    isPressed={isPressed}
    disabled={disabled}
  >
    {children}
  </Container>
)

const Container = styled.button`
  ${tw`transition-colors ease-in-out duration-500`}
  ${tw`cursor-pointer border-gray-500 border p-2 hocus:bg-pink-800`}
  ${tw`shadow rounded-sm`}
  ${ifProp(`isPressed`, tw`bg-pink-900`)}
  ${ifProp(`disabled`, tw`cursor-not-allowed opacity-25`)}
`

OptionBox.className = Container

export default OptionBox
