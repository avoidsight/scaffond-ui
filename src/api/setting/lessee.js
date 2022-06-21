import request from '@/utils/request'

// 查询生产商列表
export function listLessee(query) {
    return request({
        url: '/business/lessee/list',
        method: 'get',
        params: query
    })
}

// 查询生产商详细
export function getLessee(id) {
    return request({
        url: '/business/lessee/' + id,
        method: 'get'
    })
}

// 新增生产商
export function addLessee(data) {
    return request({
        url: '/business/lessee/add',
        method: 'post',
        data: data
    })
}

// 修改生产商
export function updateLessee(data) {
    return request({
        url: '/business/lessee/edit',
        method: 'post',
        data: data
    })
}

// 删除生产商
export function delLessee(id) {
    return request({
        url: '/business/lessee/delete/' + id,
        method: 'post'
    })
}
