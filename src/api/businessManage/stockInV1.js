import request from '@/utils/requestV1'


// 查询库存出入库列表
export function getMaterialtype(query) {
    return request({
        url: '/materialSpecs/specsTypeList',
        method: 'get',
        params: query
    })
}