import request from '@/utils/request'

// 查询统计期间管理列表
export function listDuration(query) {
    return request({
        url: '/business/duration/list',
        method: 'get',
        params: query
    })
}

// // 查询统计期间管理详细
// export function getDuration(id) {
//     return request({
//         url: '/business/duration/' + id,
//         method: 'get'
//     })
// }

// // 新增统计期间管理
// export function addDuration(data) {
//     return request({
//         url: '/business/duration',
//         method: 'post',
//         data: data
//     })
// }

// 修改统计期间管理
export function updateDuration(data) {
    return request({
        url: '/business/duration/edit',
        method: 'post',
        data: data
    })
}

// // 删除统计期间管理
// export function delDuration(id) {
//     return request({
//         url: '/business/duration/' + id,
//         method: 'post'
//     })
// }
