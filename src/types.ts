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

export interface Response {
  response: {
    status: string,
    code: string,
    message: string
  }
  result: Result
}

export interface Result {
  projects?: Array<Project>
  project?: FullProject,
  terms?: ModifiedCount | Array<FullTerm>,
  translations?: ModifiedCount
  url?: string,
  languages?: Array<Language> | Array<FullLanguage>,
  contributors?: Array<Contributor>
}
export interface Project {
  id: number,
  name: string,
  public: number,
  open: number,
  created: string
}

export interface FullProject extends Project {
  description: string,
  reference_language: string,
  terms: number
}

export interface Language {
  name: string,
  code: string,
}

export interface FullLanguage extends Language{
  translations: number,
  percentage: number,
  updated: string
}

export interface FullTerm extends Term {
  created: string,
  updated: string,
  translation: {
    content: string | {
      one: string,
      other: string
    },
    fuzzy: 0 | 1,
    proofread: 0 | 1,
    updated: string
  }
}

export interface ModifiedCount {
  parsed: number,
  added?: number,
  updated?: number,
  deleted?: number
  with_added_comment?: number
}

export interface Contributor {
  name: string,
  email: string,
  permissions: Array<{
    project: {
      id: number,
      name: string
    },
    type: string,
    proofreader: boolean
  }>
}
