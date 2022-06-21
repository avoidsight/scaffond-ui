import request from '@/utils/request'

// 查询生产商列表
export function listLessor(query) {
    return request({
        url: '/business/lessor/list',
        method: 'get',
        params: query
    })
}

// 查询生产商详细
export function getLessor(id) {
    return request({
        url: '/business/lessor/' + id,
        method: 'get'
    })
}

// 新增生产商
export function addLessor(data) {
    return request({
        url: '/business/lessor/add',
        method: 'post',
        data: data
    })
}

// 修改生产商
export function updateLessor(data) {
    return request({
        url: '/business/lessor/edit',
        method: 'post',
        data: data
    })
}

// 删除生产商
export function delLessor(id) {
    return request({
        url: '/business/lessor/delete/' + id,
        method: 'post'
    })
}
