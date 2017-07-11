import { I18nManager as I18nMan } from 'react-native';

class I18nManager implements I18nMan {

  isPreferredLanguageRTL = false;
  isRTLAllowed = true;
  isRTLForced = false;

  allowRTL(value: boolean):void {
    this.isRTLAllowed = value;
    this.onChange();
  }

  forceRTL(value: boolean) {
    this.isRTLForced = value;
    this.onChange();
  }

  setPreferredLanguageRTL(value: boolean) {
    this.isPreferredLanguageRTL = value;
    this.onChange();
  }

  public get isRTL(): boolean {
    if (this.isRTLForced) return true;
    return this.isRTLAllowed && this.isPreferredLanguageRTL;
  }

  onChange() {
    if (document.documentElement && document.documentElement.setAttribute) {
      document.documentElement.setAttribute('dir', this.isRTL ? 'rtl' : 'ltr');
    }
  };

}

const I18 = new I18nManager();

export default I18;
