import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'


export function useMyQuery(name, defaultQueryFn) {
  return function (queryKey, queryFn, options) {
    queryFn = queryFn || defaultQueryFn
     /* eslint-disable react-hooks/rules-of-hooks */
    const output = useQuery([queryKey, useParams()], queryFn, options)
    return {
      ...output,
      [name]: output.data,
    }
  }
}

export function useMyMutation(name, defaultMutationFn) {
  return function (mutationFn) {
    mutationFn = mutationFn || defaultMutationFn
    /* eslint-disable react-hooks/rules-of-hooks */
    return useMutation(mutationFn(useParams()), {
      refetchQueries: [name],
    })
  }
}
