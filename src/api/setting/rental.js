import request from '@/utils/request'

// 查询生产商列表
export function listRental(query) {
    return request({
        url: '/business/rental/list',
        method: 'get',
        params: query
    })
}

// 查询生产商详细
export function getRental(id) {
    return request({
        url: '/business/rental/' + id,
        method: 'get'
    })
}

// 新增生产商
export function addRental(data) {
    return request({
        url: '/business/rental/add',
        method: 'post',
        data: data
    })
}

// 修改生产商
export function updateRental(data) {
    return request({
        url: '/business/rental/edit',
        method: 'post',
        data: data
    })
}

// 删除生产商
export function delRental(id) {
    return request({
        url: '/business/rental/delete/' + id,
        method: 'post'
    })
}
