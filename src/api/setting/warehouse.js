import request from '@/utils/request'

// 查询仓库管理列表
export function listWarehouse(query) {
    return request({
        url: '/business/warehouse/list',
        method: 'get',
        params: query
    })
}

// 查询仓库管理详细
export function getWarehouse(id) {
    return request({
        url: '/business/warehouse/' + id,
        method: 'get'
    })
}

// 新增仓库管理
export function addWarehouse(data) {
    return request({
        url: '/business/warehouse/add',
        method: 'post',
        data: data
    })
}

// 修改仓库管理
export function updateWarehouse(data) {
    return request({
        url: '/business/warehouse/edit',
        method: 'post',
        data: data
    })
}

// 删除仓库管理
export function delWarehouse(id) {
    return request({
        url: '/business/warehouse/delete/' + id,
        method: 'post'
    })
}
