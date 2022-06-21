import request from '@/utils/request'

// 查询生产商列表
export function listManufacturer(query) {
    return request({
        url: '/business/manufacturer/list',
        method: 'get',
        params: query
    })
}

// 查询生产商详细
export function getManufacturer(id) {
    return request({
        url: '/business/manufacturer/' + id,
        method: 'get'
    })
}

// 新增生产商
export function addManufacturer(data) {
    return request({
        url: '/business/manufacturer/add',
        method: 'post',
        data: data
    })
}

// 修改生产商
export function updateManufacturer(data) {
    return request({
        url: '/business/manufacturer/edit',
        method: 'post',
        data: data
    })
}

// 删除生产商
export function delManufacturer(id) {
    return request({
        url: '/business/manufacturer/delete/' + id,
        method: 'post'
    })
}
