/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'


export function useMyQuery(name, defaultQueryFn) {
  // queryKey can only be a String or a tuple [String, Object]
  return function (queryKey, queryFn, options) {
    queryFn = queryFn || defaultQueryFn

    let str = name
    let variables = useParams()
    if (typeof queryKey === 'string') {
      str = queryKey
    } else if (Array.isArray(queryKey)) {
      [ str, variables={} ] = queryKey
      variables = {
        ...useParams(),
        ...variables,
      }
    }
    const output = useQuery([str, variables], queryFn, options)
    return {
      ...output,
      [name]: output.data,
    }
  }
}

export function useMyMutation(name, defaultMutationFn) {
  return function (mutationFn, options={}) {
    mutationFn = mutationFn || defaultMutationFn
    return useMutation(mutationFn(useParams()), {
      refetchQueries: [name],
      ...options,
    })
  }
}
