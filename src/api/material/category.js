import request from '@/utils/request'
/**
 * 
  自增id作为主键 
 private Long id;

 /** 编码
 @Excel(name = "编码" )
 private String code;

 /** 名称
 @Excel(name = "名称" )
 private String name;

 /** 主计量单位 
 @Excel(name = "主计量单位" )
 private String mUnit;

 /** 辅计量单位 
 @Excel(name = "辅计量单位" )
 private String aUnit;

 /** 备注 
 @Excel(name = "备注" )
 private String remarks;

 /** 标记。0：其它，1:立杆，2：水平杆，3：脚手板 
 @Excel(name = "标记。0：其它，1:立杆，2：水平杆，3：脚手板" )
 private Integer flag;

 */
// 查询物料分类列表
export function listCategory(query) {
    return request({
        url: '/business/category/list',
        method: 'get',
        params: query
    })
}

// 查询物料分类详细
export function getCategory(id) {
    return request({
        url: '/business/category/' + id,
        method: 'get'
    })
}

// 新增物料分类
export function addCategory(data) {
    return request({
        url: '/business/category/add',
        method: 'post',
        data: data
    })
}

// 修改物料分类
export function updateCategory(data) {
    return request({
        url: '/business/category/edit',
        method: 'post',
        data: data
    })
}

// 删除物料分类
export function delCategory(id) {
    return request({
        url: '/business/category/delete/' + id,
        method: 'post'
    })
}
