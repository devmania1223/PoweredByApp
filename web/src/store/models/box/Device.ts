export class Device {
  public uuid: string = '';
  public model: string = '';
  public manufacturer: string = '';
  public platform: string = '';
  public serial: string = '';
  public wirelessMacAddress: string = '';
  public lanMacAddress: string = '';

  constructor(params?: Partial<Device>) {
    if (!!params) {
      this.uuid = params.uuid || this.uuid;
      this.model = params.model || this.model;
      this.manufacturer = params.manufacturer || this.manufacturer;
      this.platform = params.platform || this.platform;
      this.serial = params.serial || this.serial;
      this.wirelessMacAddress = params.wirelessMacAddress || this.wirelessMacAddress;
      this.lanMacAddress = params.lanMacAddress || this.lanMacAddress;
    }
  }
}
