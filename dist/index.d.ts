/// <reference types="react" />
import { LabelType } from 'interfaces/enums/LabelType';
import { LabelsData } from 'store/labels/types';
interface IProps {
    annotationType: LabelType;
    className?: string;
    imageFile: File;
    labelsData: LabelsData;
    onLabelsDataChange?: (labelsData: LabelsData) => void;
    zoom?: number;
    isImageDrag?: boolean;
}
declare const ReactCanvasAnnotation: (props: IProps) => JSX.Element;
export default ReactCanvasAnnotation;
