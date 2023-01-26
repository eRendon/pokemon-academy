import { SurePromise } from '../../model/SurePromise'
import surePromise from '../../utils/surePromise'
import { apiClient } from './config'
import { AxiosResponse } from 'axios'

export class AxiosService<T> {
  async postData(postData: T, url: string): Promise<SurePromise<T>> {
    try {
      return await surePromise(apiClient.post<AxiosResponse>(url, postData))
    }
    catch (e) {
      throw e
    }
  }

  public async getData(url: string): Promise<SurePromise<T>> {
    try {
      return surePromise(apiClient.get<AxiosResponse>(url))
    }
    catch (e) {
      throw e
    }
  }
}
