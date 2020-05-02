import { LabelType } from 'interfaces/enums/LabelType'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'
import { LabelsData } from 'store/labels/types'
import CanvasAnnotation from './components/CanvasAnnotation'

interface IProps {
  annotationType: LabelType
  className?: string
  imageFile: File
  labelsData: LabelsData
  onLabelsDataChange?: (labelsData: LabelsData) => void
  zoom?: number
  isImageDrag?: boolean
}

const ReactCanvasAnnotation = (props: IProps) => (
  <Provider store={store}>
    <CanvasAnnotation {...props} />
  </Provider>
)

export default ReactCanvasAnnotation
