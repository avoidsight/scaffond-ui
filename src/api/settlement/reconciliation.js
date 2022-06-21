import request from '@/utils/request'

// 查询进度对账单列表
export function listReconciliation(query) {
    return request({
        url: '/business/reconciliation/list',
        method: 'get',
        params: query
    })
}

// 查询进度对账单详细
export function getReconciliation(id) {
    return request({
        url: '/business/reconciliation/' + id,
        method: 'get'
    })
}

// 新增进度对账单
export function addReconciliation(data) {
    return request({
        url: '/business/reconciliation/add',
        method: 'post',
        data: data
    })
}

// 修改进度对账单
export function updateReconciliation(data) {
    return request({
        url: '/business/reconciliation/edit',
        method: 'post',
        data: data
    })
}

// 删除进度对账单
export function delReconciliation(id) {
    return request({
        url: '/business/reconciliation/delete/' + id,
        method: 'post'
    })
}
