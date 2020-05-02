import { IconPaths } from 'components/Icons'
import Icon from 'components/Icons/Icon'
import useCanvasListeners from 'hooks/useCanvasListeners'
import useCanvasZoom from 'hooks/useCanvasZoom'
import ClassName from 'interfaces/ClassName'
import { CursorType } from 'interfaces/enums/CursorType'
import { LabelType } from 'interfaces/enums/LabelType'
import { isEqual } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { useDispatch, useSelector } from 'react-redux'
import { EditorModel } from 'staticModels/EditorModel'
import { AppState } from 'store'
import { updateImageDragModeStatus } from 'store/general/actionCreators'
import {
  addImageData,
  updateActiveLabelId,
  updateActiveLabelType
} from 'store/labels/actionCreators'
import { AnnotationData, LabelsData } from 'store/labels/types'
import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import 'tailwindcss/dist/base.css'
import tw from 'twin.macro'

interface IProps {
  annotationType: LabelType
  className?: string
  imageFile: File
  labelsData: LabelsData
  onRectChange?: (labelsData: LabelsData) => void
  zoom?: number
  isImageDrag?: boolean
}

const selector = (state: AppState) => ({
  customCursorStyle: state.general.customCursorStyle,
  imageDragMode: state.general.imageDragMode
})

const onContextMenu = (event: React.MouseEvent<HTMLCanvasElement>) =>
  event.preventDefault()

const CanvasAnnotation: React.FC<IProps> & ClassName = ({
  annotationType,
  className,
  imageFile,
  labelsData,
  onRectChange: onLabelsDataChange = () => {},
  zoom = 1,
  isImageDrag = false
}) => {
  const imageData: AnnotationData = useMemo(
    () => ({
      fileData: imageFile,
      loadStatus: false,
      ...labelsData
    }),
    [imageFile, labelsData]
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addImageData([imageData]))
  }, [dispatch, imageData, imageFile])

  useEffect(() => {
    dispatch(updateImageDragModeStatus(isImageDrag))
  }, [dispatch, isImageDrag])

  useEffect(() => {
    dispatch(updateActiveLabelType(annotationType))
    dispatch(updateActiveLabelId(null))
  }, [dispatch, annotationType])

  useCanvasZoom(zoom)

  const { customCursorStyle } = useSelector(selector, isEqual)

  useCanvasListeners({
    imageData,
    annotationType,
    imageDragMode: isImageDrag,
    onLabelsDataChange
  })

  return (
    <Container className={className}>
      <EditorWrapper>
        {imageData && (
          <Editor ref={(ref) => (EditorModel.editor = ref)} draggable={false}>
            <Scrollbars
              ref={(ref) => (EditorModel.viewPortScrollbars = ref)}
              renderTrackHorizontal={(props) => <NoCursorTrack {...props} />}
              renderTrackVertical={(props) => <NoCursorTrack {...props} />}
              draggable={false}
            >
              <Canvas
                ref={(ref) => (EditorModel.canvas = ref)}
                draggable={false}
                onContextMenu={onContextMenu}
              />
            </Scrollbars>
            <MouseIndicator
              ref={(ref) => (EditorModel.mousePositionIndicator = ref)}
              draggable={false}
            />
            <Cursor
              isGrabbing={customCursorStyle === CursorType.GRABBING}
              isTransform={customCursorStyle !== CursorType.DEFAULT}
              ref={(ref) => (EditorModel.cursor = ref)}
              draggable={false}
            >
              <Icon d={IconPaths[customCursorStyle]} />
            </Cursor>
          </Editor>
        )}
      </EditorWrapper>
    </Container>
  )
}

const EditorWrapper = tw.div`flex flex-col w-full h-full self-stretch`
const Container = tw.div`h-full w-full self-stretch flex flex-col`

const Canvas = styled.canvas`
  ${tw`absolute cursor-none`}
`

const MouseIndicator = styled.div`
  ${tw`select-none pointer-events-none`}
  ${tw`absolute text-white opacity-75 p-1`}
  ${tw`bg-gray-700 z-50`}
`

interface ICursor {
  readonly isTransform: boolean
  readonly isGrabbing: boolean
}

const Cursor = styled.div<ICursor>`
  ${tw`absolute w-2 h-2 text-white fill-current`}
  ${tw`pointer-events-none z-40`}
  ${tw`border-white bg-white rounded-full`}
  ${tw`transition-transform ease-in-out duration-200`}
  ${ifProp(`isTransform`, tw`border bg-transparent transform scale-350`)}
  ${ifProp(`isGrabbing`, tw`scale-250`)}
`

const Editor = styled.div`
  ${tw`flex-grow relative`}
`

const NoCursorTrack = styled.div`
  ${tw`pointer-events-none`}
  cursor: none;
`

CanvasAnnotation.className = Container
export default CanvasAnnotation
