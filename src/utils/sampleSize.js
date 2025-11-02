export default function sampleSize(array, size) {
  const clone = [...new Set(array)]
  while (clone.length < size) {
    clone.push(...array)
  }
  const result = []
  let index = 0
  while (result.length < size && index < clone.length) {
    result.push(clone[index])
    index += 1
  }
  return result.slice(0, size)
}
