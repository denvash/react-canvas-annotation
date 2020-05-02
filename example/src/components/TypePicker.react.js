import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import OptionBox from './OptionBox.react'

const TABS = [`RECTANGLE`, `POLYGON`]

const Container = styled.div`
  ${tw`flex py-2 w-full justify-center items-center`}
  ${OptionBox.className} {
    ${tw`mx-2`}
  }
`

const TypePicker = ({ onChange }) => {
  const [tabEnabled, setTabEnabled] = useState(`RECTANGLE`)

  const onClick = useCallback(
    (tab) => () => {
      onChange(tab)
      setTabEnabled(tab)
    },
    [onChange]
  )

  return (
    <Container>
      <h1>Annotation Type</h1>
      {TABS.map((tab) => (
        <OptionBox
          key={tab}
          onClick={onClick(tab)}
          isPressed={tab === tabEnabled}
        >
          {tab}
        </OptionBox>
      ))}
    </Container>
  )
}

export default TypePicker
