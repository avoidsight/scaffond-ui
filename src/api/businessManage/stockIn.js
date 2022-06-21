import request from '@/utils/request'

// 查询库存出入库列表
export function listInventory(query) {
    return request({
        url: '/business/inventory/list',
        method: 'get',
        params: query
    })
}

// 查询库存出入库详细
export function getInventory(id) {
    return request({
        url: '/business/inventory/' + id,
        method: 'get'
    })
}

// 新增库存出入库
export function addInventory(data) {
    return request({
        url: '/business/inventory',
        method: 'post',
        data: data
    })
}

// 修改库存出入库
export function updateInventory(data) {
    return request({
        url: '/business/inventory/edit',
        method: 'post',
        data: data
    })
}

// 删除库存出入库
export function delInventory(id) {
    return request({
        url: '/business/inventory/delete/' + id,
        method: 'post'
    })
}


//detail========================================
// 查询库存出入库明细详细
export function getDetail(id) {
    return request({
        url: '/business/detail/' + id,
        method: 'get'
    })
}

// 新增库存出入库明细
export function addDetail(data) {
    return request({
        url: '/business/detail',
        method: 'post',
        data: data
    })
}

// 修改库存出入库明细
export function updateDetail(data) {
    return request({
        url: '/business/detail',
        method: 'put',
        data: data
    })
}

//台账========================================================
export function getAccount(query) {
    return request({
        url: '/business/incentory/query/all',
        method: 'get',
        params: query
    })
}

// 查询库存出入库杂费明细列表==================================
export function listFee(query) {
    return request({
        url: '/business/fee/list',
        method: 'get',
        params: query
    })
}

// 查询库存出入库杂费明细详细
export function getFee(id) {
    return request({
        url: '/business/fee/' + id,
        method: 'get'
    })
}

// 新增库存出入库杂费明细
export function addFee(data) {
    return request({
        url: '/business/fee',
        method: 'post',
        data: data
    })
}

// 修改库存出入库杂费明细
export function updateFee(data) {
    return request({
        url: '/business/fee',
        method: 'put',
        data: data
    })
}

// 删除库存出入库杂费明细
export function delFee(id) {
    return request({
        url: '/business/fee/' + id,
        method: 'delete'
    })
}