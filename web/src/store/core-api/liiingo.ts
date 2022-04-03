import { Liiingo, ImpersonatedOrg } from '@liiingo/core-api-client-typescript';
class LiiingoHelper {
  liiingo: Liiingo;
  impersonatedOrg: ImpersonatedOrg;

  async setup(orgId: string) {
    this.liiingo = await this.liiingoCreate();
    this.impersonatedOrg = await new ImpersonatedOrg({
      liiingoClient: this.liiingo,
    })
      .withOrgId(orgId)
      .impersonate();
  }

  async callWithToken(method: Function, args: any) {
    return await this.impersonatedOrg.callWithToken(method, args);
  }

  private async liiingoCreate() {
    let liiingo: Liiingo;
    const configureLiiingoClient = () => {
      return new Liiingo({
        credentials: {
          email: process.env.REACT_APP_LIIINGO_USERNAME,
          password: process.env.REACT_APP_LIIINGO_PASSWORD,
        },
        environment: 'custom',
        url: process.env.REACT_APP_LIIINGO_URL,
      });
    };

    try {
      liiingo = configureLiiingoClient();
      await liiingo.authenticate();
    } catch (error) {
      return;
    }
    return liiingo;
  }
}

export default LiiingoHelper;
