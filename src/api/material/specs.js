import request from '@/utils/request'

 /** 分类编码 */
//  @Excel(name = "分类编码" )
//  private String categoryCode;

//  /** 型号 */
//  @Excel(name = "型号" )
//  private String specsName;

//  /** 规格类型。0：支撑架，1：作业架 */
//  @Excel(name = "规格类型。0：支撑架，1：作业架" )
//  private Long specsType;

//  /** 直径 */
//  @Excel(name = "直径" )
//  private String diameter;

//  /** 厚度 */
//  @Excel(name = "厚度" )
//  private String thickness;

//  /** 长度 */
//  @Excel(name = "长度" )
//  private String lengths;

//  /** 材质 */
//  @Excel(name = "材质" )
//  private String material;

//  /** 单位 */
//  @Excel(name = "单位" )
//  private String units;

//  /** 单件重量 */
//  @Excel(name = "单件重量" )
//  private BigDecimal singleWeight;

//  /** 常见打包数量 */
//  @Excel(name = "常见打包数量" )
//  private Long packagesNumber;
// 查询物料规格列表
export function listSpecs(query) {
    return request({
        url: '/business/specs/list',
        method: 'get',
        params: query
    })
}

// 查询物料规格详细
export function getSpecs(id) {
    return request({
        url: '/business/specs/' + id,
        method: 'get'
    })
}

// 新增物料规格
export function addSpecs(data) {
    return request({
        url: '/business/specs/add',
        method: 'post',
        data: data
    })
}

// 修改物料规格
export function updateSpecs(data) {
    return request({
        url: '/business/specs/edit',
        method: 'post',
        data: data
    })
}

// 删除物料规格
export function delSpecs(id) {
    return request({
        url: '/business/specs/delete/' + id,
        method: 'post'
    })
}
