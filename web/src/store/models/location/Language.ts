export enum Language {
  English = 'en',
  Spanish = 'es',
  Arabic = 'ar',
  French = 'fr',
  SimplifiedChinese = 'zh-Hans',
  German = 'de',
  Greek = 'el',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  Norwegian = 'no',
  Portuguese = 'pt',
  Russian = 'ru',
  Swahili = 'sw',
  Turkish = 'tr',
  Vietnamese = 'vi',
}

export function toString(type: Language): string {
  switch (type) {
    case Language.English:
      return 'English';
    case Language.Arabic:
      return 'Arabic';
    case Language.SimplifiedChinese:
      return 'SimplifiedChinese';
    case Language.French:
      return 'French';
    case Language.German:
      return 'German';
    case Language.Greek:
      return 'Greek';
    case Language.Italian:
      return 'Italian';
    case Language.Japanese:
      return 'Japanese';
    case Language.Korean:
      return 'Korean';
    case Language.Norwegian:
      return 'Norwegian';
    case Language.Portuguese:
      return 'Portuguese';
    case Language.Russian:
      return 'Russian';
    case Language.Spanish:
      return 'Spanish';
    case Language.Swahili:
      return 'Swahili';
    case Language.Turkish:
      return 'Turkish';
    case Language.Vietnamese:
      return 'Vietnamese';
    default:
      return '';
  }
}

export function asArray(): Language[] {
  return [
    Language.English,
    Language.Spanish,
    Language.SimplifiedChinese,
    Language.Arabic,
    Language.French,
    Language.German,
    Language.Italian,
    Language.Russian,
    Language.Portuguese,
    Language.Japanese,
    Language.Korean,
    Language.Norwegian,
    Language.Vietnamese,
    Language.Greek,
    Language.Turkish,
  ];
}

export function isRTL(type: Language): boolean {
  switch (type) {
    case Language.Arabic:
      return true;
    default:
      return false;
  }
}
