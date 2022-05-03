/* eslint-disable no-console, camelcase */

// Slices
import first_slice from '../slices/first-slice'
import second_slice from '../slices/second-slice'

import { notNull } from './helpers'

const SLICES = {
  first_slice,
  second_slice
}

export const getSlicesQueries = sliceIds => {
  return Object.values(SLICES)
    .filter(slice => sliceIds.includes(slice.id))
    .map(slice => slice.query)
    .filter(notNull)
    .join('\n')
    .replace(/^\s*[\r\n]/gm, '')
    .replace(/ +/g, ' ')
}

export const formatSlices = async (slices = [], app, additionalDatas) => {
  if (!slices.length) return undefined

  const promises = slices
    .map(slice => SLICES?.[slice.slice_type]?.format(slice, app, additionalDatas))

  return (await Promise.all(promises))
    .filter(notNull)
}
