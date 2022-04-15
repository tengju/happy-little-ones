import { icons } from '@lion/icon';
import '@lion/icon/define';

icons.addIconResolver('lion', (iconset: string, name: string) => {
  switch (iconset) {
    case 'store':
      return import('../../../assets/iconset-store.js' as any).then(
        module => module[name]
      );
    default:
      throw new Error(`Unknown iconset ${iconset}`);
  }
});
