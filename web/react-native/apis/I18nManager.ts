class I18nManager {

  static isPreferredLanguageRTL = false;
  static isRTLAllowed = true;
  static isRTLForced = false;

  static allowRTL(value: boolean) {
    I18nManager.isRTLAllowed = value;
    I18nManager.onChange();
  }

  static forceRTL(value: boolean) {
    I18nManager.isRTLForced = value;
    I18nManager.onChange();
  }

  static setPreferredLanguageRTL(value: boolean) {
    I18nManager.isPreferredLanguageRTL = value;
    I18nManager.onChange();
  }

  static get isRTL(): boolean {
    if (I18nManager.isRTLForced) return true;
    return I18nManager.isRTLAllowed && I18nManager.isPreferredLanguageRTL;
  }

  static onChange() {
    if (document.documentElement && document.documentElement.setAttribute) {
      document.documentElement.setAttribute('dir', I18nManager.isRTL ? 'rtl' : 'ltr');
    }
  };

}

export default I18nManager;
