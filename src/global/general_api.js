// 鼠标通过时修改字体颜色
export function onMouseOver($event)
{
  $event.currentTarget.style="color:blue;cursor: pointer"
}
// 鼠标离开修改字体颜色
export function onMouseLeave($event)
{
  $event.currentTarget.style="color:#9698134;cursor: pointer";
}
// 修改table tr行的背景色
export function tableRowStyle({ row, rowIndex })
{
  return 'background-color: #ddf1fd'
}
// 修改table header的背景色
export function tableHeaderColor({ row, column, rowIndex, columnIndex })
{      if (rowIndex === 0) {        return 'background-color: lightblue;color: #fff;font-weight: 500;'
}
}
// 控制页码显示
export function controlPage({ row, column, rowIndex, columnIndex })
{      if (rowIndex === 0) {        return 'background-color: lightblue;color: #fff;font-weight: 500;'
}
}
