import { PopupWindowType } from 'interfaces/enums';

export class Settings {
  public static readonly PRIMARY_COLOR: string = '#F8C182';
  public static readonly SECONDARY_COLOR: string = '#EC77FF';

  public static readonly DARK_THEME_SECOND_COLOR: string = '#282828';
  public static readonly DARK_THEME_THIRD_COLOR: string = '#4c4c4c';
  public static readonly DARK_THEME_FORTH_COLOR: string = '#262c2f';

  public static readonly RESIZE_HANDLE_DIMENSION_PX: number = 8;
  public static readonly RESIZE_HANDLE_HOVER_DIMENSION_PX = 16;

  public static readonly CLOSEABLE_POPUPS: PopupWindowType[] = [
    PopupWindowType.LOAD_IMAGES,
    PopupWindowType.EXPORT_LABELS,
    PopupWindowType.EXIT_PROJECT,
  ];
}
