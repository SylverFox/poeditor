export enum TermsTranslations {
  'terms',
  'terms_translations',
  'translations'
}

export enum FileFormat {
  'po',
  'pot',
  'mo',
  'xls',
  'xlsx',
  'csv',
  'ini',
  'resw',
  'resx',
  'android_strings',
  'apple_strings',
  'xliff',
  'properties',
  'key_value_json',
  'json',
  'yml',
  'xlf',
  'xmb',
  'xtb',
  'arb'
}

export enum TranslationFilter {
  'translated',
  'untranslated',
  'fuzzy',
  'not_fuzzy',
  'automatic',
  'not_automatic',
  'proofread',
  'not_proofread'
}

export interface UpdateTags {
  all?: string
  new?: Array<string>,
  obsolete?: Array<string>,
  overwritten_translations?: Array<string>
}

export interface BaseTerm {
  term: string
  context?: string
}

export interface Term extends BaseTerm {
  reference?: string
  plural?: string
  comment?: string
  tags?: Array<string>
}

export interface UpdatedTerm extends Term {
  new_term: string
  new_context?: string
}

export interface CommmentedTerm extends BaseTerm {
  comment: string
}

export interface Translation {
  term: string,
  context?: string,
  translation: {
    content: string | {
      one: string,
      other: string
    },
    fuzzy?: 0 | 1
  }
}

export class Response {
  response: {
    status: string,
    code: string,
    message: string
  }

  result: Object

  get status () {
    return this.response.status
  }

  get code () {
    return this.response.code
  }

  get message () {
    return this.response.message
  }
}
