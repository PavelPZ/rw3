declare module DState {

  interface IVocabulariesState {
    nativeLang?; //localization lang
    vocabs?: IVocabularyState[]; //vocabularies
  }

  interface IVocabularyState {
    srcLang;
    destLang;
  }


  interface IState {
    vocabularies: IVocabulariesState
  }
}

export const reducer = (st: DState.IVocabulariesState, action) => ({ } as DState.IVocabulariesState); 