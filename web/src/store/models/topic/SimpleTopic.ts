//not used rn
export class SimpleTopic {
  public id: string = '';
  public name: string = '';
  public sectionName: string = '';
  public locationName: string = '';
  public sectionId: string = '';
  public locationId: string = '';

  constructor(params?: Partial<SimpleTopic>) {
    if (!!params) {
      this.id = params.id || this.id;
      this.name = params.name || this.name;
      this.sectionName = params.sectionName || this.sectionName;
      this.locationName = params.locationName || this.locationName;
      this.sectionId = params.sectionId || this.sectionId;
      this.locationId = params.locationId || this.locationId;
    }
  }
}
