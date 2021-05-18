import axios from '../config'

/**
 * 获取事项材料列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const ListApprovalDocumentApi = (params) => axios.get('/api/result/record/list_approval_document', { params }).then(res => res.data)
