// 便于在 vscode 里面用 gql, 产生语法高亮行为
window.gql = function passthru(literals, ...values) {
  let output = ''
  let index
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index]
  }
  output += literals[index]
  return output
}
