import { AxiosResponse } from 'axios'
import { SurePromise } from '../model/SurePromise'

const surePromise = <T>(promise: Promise<AxiosResponse>): Promise<SurePromise<T>> => {
  return promise.then((result) => {
    const { data } = result
    return {
      success: true,
      data
    }
  }).catch(error => {
    const { data } = error.response
    return Promise.resolve({ success: false, data })
  })
}

export default surePromise
