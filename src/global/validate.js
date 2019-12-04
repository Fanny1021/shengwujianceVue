/** 这个文件只允许放表单验证方法 **/

//验证手机号
export function isPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  var pattern = /^1[34578]\d{9}$/
  if(pattern.test(value)){
    return callback()
  }
  return callback(new Error('输入的手机号错误'))
}
//验证手机号
export function isUserName(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  var pattern = /^\w+$/
 // setTimeout(() => {
      if (pattern.test(value)) {
        return callback()
      }
      return callback(new Error('输入的格式错误，请输入字母数字或下划线'))
   // }
    //, 1000);
}
//验证整数
export function isInt(rule, value, callback) {

  var pattern=/^[-,+]{0,1}[0-9]{0,}$/
  if(pattern.test(value)){
    return callback()
  }
  return callback(new Error('输入的整数错误'))
}

//验证日期
export function isDate(rule, value, callback) {
  var lthdatestr
  var datestr=value
  var valid=false;
  if (datestr != "")
    lthdatestr= datestr.length ;
  else
    lthdatestr=0;

  var tmpy="";
  var tmpm="";
  var tmpd="";
  var status;
  status=0;
  if ( lthdatestr!= 0)
  {
    for (i = 0; i < lthdatestr; i++) {
      if (datestr.charAt(i) == '-') {
        status++;
      }
      if (!(status > 2))
      {
        if ((status == 0) && (datestr.charAt(i) != '-')) {
          tmpy = tmpy + datestr.charAt(i)
        }
        if ((status == 1) && (datestr.charAt(i) != '-')) {
          tmpm = tmpm + datestr.charAt(i)
        }
        if ((status == 2) && (datestr.charAt(i) != '-')) {
          tmpd = tmpd + datestr.charAt(i)
        }
        var year = new String(tmpy);
        var month = new String(tmpm);
        var day = new String(tmpd)
        if ((tmpy.length != 4) || (tmpm.length > 2) || (tmpd.length > 2)) {
          break;
        }
        if (!((1 <= month) && (12 >= month) && (31 >= day) && (1 <= day))) {
          break;
        }
        if (!((year % 4) == 0) && (month == 2) && (day == 29)) {

          break;
        }
        if ((month <= 7) && ((month % 2) == 0) && (day >= 31)) {

          break;

        }
        if ((month >= 8) && ((month % 2) == 1) && (day >= 31)) {

          break;
        }
        if ((month == 2) && (day == 30)) {

          break;
        }
      }
      if(i==(lthdatestr))
        valid=true;
    }
  }
  if(valid){
    return callback()
  }
  return callback(new Error('输入的日期错误'))

}
