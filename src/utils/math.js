// 加法
export function accAdd(arg1, arg2) { 
  let r1, r2, m; 
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 } 
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 } 
  m = Math.pow(10, Math.max(r1, r2)) 
  return (arg1 * m + arg2 * m) / m 
} 
// 乘法
export function accMul(arg1, arg2) { 
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString(); 
  try { m += s1.split('.')[1].length } catch (e) {} 
  try { m += s2.split('.')[1].length } catch (e) {} 
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m) 
} 

// 转数字
export function changeNum(data) {
  let newdata = data + '';
  // 先把非数字的都替换掉(空)，除了数字和.
  console.log(newdata);
  newdata = newdata.replace(/[^\d.]/g, '');
  console.log(newdata);
  // 必须保证第一个为数字而不是.
  newdata = newdata.replace(/^\./g, '');
  console.log(newdata);
  // 保证只有出现一个.而没有多个.
  newdata = newdata.replace(/\.{3,}/g, '');
  console.log(newdata);
  // 保证.只出现一次，而不能出现两次以上
  newdata = newdata
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.');
  console.log(newdata);
  // 限制几位小数
  // let subscript = -1;
  // for (let i in data) {
  //   if (data[i] === '.') {
  //     subscript = i;
  //   }
  //   if (subscript !== -1) {
  //     if (i - subscript > this.decimalNum(type)) {
  //       data = data.substring(0, data.length - 1);
  //     }
  //   }
  // }
  return newdata;
}