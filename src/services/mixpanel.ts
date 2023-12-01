import Mixpanel from "mixpanel";
import environmentService from "./environment";

const MixpanelService = () => {
  let mixpanel: Mixpanel.Mixpanel | null;

  const init = () => {
    mixpanel = Mixpanel.init(environmentService.mixpanel.token);
  };

  const trackEnterPage = (pageName: string, props: any = {}) => {
    mixpanel?.track(`Enter ${pageName}`, props);
  };

  return {
    init,
    trackEnterPage,
  };
};

const mixpanelService = MixpanelService();

export default mixpanelService;
