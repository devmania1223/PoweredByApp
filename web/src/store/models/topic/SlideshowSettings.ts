interface SlideshowSettingsConstructorParams {
  defaultSeconds: number;
  contentSeconds: { [key: string]: number };
}

export class SlideshowSettings {
  public defaultSeconds: number = 10;
  public contentSeconds: { [key: string]: number } = {};

  constructor(params?: Partial<SlideshowSettingsConstructorParams>) {
    if (!!params) {
      this.defaultSeconds =
        typeof params.defaultSeconds === 'number' && params.defaultSeconds >= 1
          ? params.defaultSeconds
          : this.defaultSeconds;
      this.contentSeconds = !!params.contentSeconds ? params.contentSeconds : this.contentSeconds;
    }
  }
}
