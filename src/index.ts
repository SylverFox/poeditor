import * as https from 'https'
import * as querystring from 'querystring'
// eslint-disable-next-line no-unused-vars
import * as Types from './types'

export * from './types'

function api_call (path: string, data: any): Promise<Types.Response> {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify(data)

    const req = https.request({
      hostname: 'api.poeditor.com',
      path: '/v2/' + path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }, res => {
      let data = ''
      res.on('data', d => { data += d })
        .on('end', () => {
          const response = JSON.parse(data) as Types.Response
          if (response.response.status === 'success' && response.response.code === '200') {
            resolve(response)
          } else {
            reject(response.response.message)
          }
        })
    }).on('error', reject)

    req.write(postData)
    req.end()
  })
}

export const projects = {
  list: (api_token: string) => api_call('projects/list', {
    api_token
  }).then(res => res.result.projects),
  view: (api_token: string, id: number) => api_call('projects/view', {
    api_token, id
  }).then(res => res.result.project),
  add: (api_token: string, name: string, description?: string) => api_call('projects/add', {
    api_token, name, description
  }).then(res => res.result.project),
  update: (
    api_token: string,
    id: number,
    name?: string,
    description?: string,
    reference_language?: string
  ) => api_call('projects/update', {
    api_token, id, name, description, reference_language
  }).then(res => res.result.project),
  delete: (api_token: string, id: number) => api_call('projects/delete', {
    api_token, id
  }).then(res => res.response.message),
  upload: (
    api_token: string,
    id: number,
    updating: Types.TermsTranslations,
    file: string,
    language?: string,
    overwrite?: 0 | 1,
    sync_terms?: 0 | 1,
    tags?: Array<string> | Types.UpdateTags
  ) => api_call('projects/upload', {
    api_token, id, updating, file, language, overwrite, sync_terms, tags
  }).then(res => ({
    terms: res.result.terms as Types.ModifiedCount,
    translations: res.result.translations
  })),
  sync: (api_token: string, id: number, data: Array<Types.Term>) => api_call('projects/sync', {
    api_token, id, data
  }).then(res => res.result.terms as Types.ModifiedCount),
  export: (
    api_token: string,
    id: number,
    language: string,
    type: Types.FileFormat,
    filters: Types.TranslationFilter,
    order?: string,
    tags?: string | Array<string>
  ) => api_call('projects/export', {
    api_token, id, language, type, filters, order, tags
  }).then(res => res.result.url)
}

export const languages = {
  available: (api_token: string) => api_call('languages/available', {
    api_token
  }).then(res => res.result.languages as Types.Language[]),
  list: (api_token: string, id: number) => api_call('languages/list', {
    api_token, id
  }).then(res => res.result.languages as Types.FullLanguage[]),
  add: (api_token: string, id: number, language: string) => api_call('languages/add', {
    api_token, id, language
  }).then(res => res.response.message),
  update: (
    api_token: string,
    id: number,
    language: string,
    data: Array<Types.Translation>,
    fuzzy_trigger?: 0 | 1
  ) => api_call('languages/update', {
    api_token, id, language, fuzzy_trigger, data
  }).then(res => res.result.translations),
  delete: (api_token: string, id: number, language: string) => api_call('languages/delete', {
    api_token, id, language
  }).then(res => res.response.message)
}

export const terms = {
  list: (api_token: string, id: number, language?: string) => api_call('terms/list', {
    api_token, id, language
  }).then(res => res.result.terms as Types.FullTerm[]),
  add: (api_token: string, id: number, data: Array<Types.Term>) => api_call('terms/add', {
    api_token, id, data
  }).then(res => res.result.terms as Types.ModifiedCount),
  update: (
    api_token: string,
    id: number,
    data: Array<Types.UpdatedTerm>,
    fuzzy_trigger?: 0 | 1
  ) => api_call('terms/update', {
    api_token, id, data, fuzzy_trigger
  }).then(res => res.result.terms as Types.ModifiedCount),
  delete: (api_token: string, id: number, data: Array<Types.BaseTerm>) => api_call('terms/delete', {
    api_token, id, data
  }).then(res => res.result.terms as Types.ModifiedCount),
  add_comment: (
    api_token: string,
    id: number,
    data: Array<Types.CommmentedTerm>
  ) => api_call('terms/add_comment', {
    api_token, id, data
  }).then(res => res.result.terms as Types.ModifiedCount)
}

export const translations = {
  add: (
    api_token: string,
    id: number,
    language: string,
    data: Array<Types.Translation>
  ) => api_call('translations/add', {
    api_token, id, language, data
  }).then(res => res.result.translations),
  update: (
    api_token: string,
    id: number,
    language: string,
    data: Array<Types.BaseTerm>
  ) => api_call('translations/update', {
    api_token, id, language, data
  }).then(res => res.result.translations),
  delete: (api_token: string, id: number, language: string) => api_call('translations/delete', {
    api_token, id, language
  }).then(res => res.result.translations)
}

export const contributors = {
  list: (api_token: string, id?: number, language?: string) => api_call('contributors/list', {
    api_token, id, language
  }).then(res => res.result.contributors),
  add: (
    api_token: string,
    id: number,
    name: string,
    email: string,
    language?: string,
    admin?: 0 | 1
  ) => api_call('contributors/add', {
    api_token, id, name, email, language, admin
  }).then(res => res.response.message),
  remove: (
    api_token: string,
    id: number,
    email: string,
    language?: string
  ) => api_call('contributors/remove', {
    api_token, id, email, language
  }).then(res => res.response.message)
}
