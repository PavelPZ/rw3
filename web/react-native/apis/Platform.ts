import { PlatformStatic as IPlat } from 'react-native';

const Platform: IPlat = {
  OS: 'web',
  Version: 1,
  select: (obj: any) => ('web' in obj ? obj.web : {})
};

export default Platform;
