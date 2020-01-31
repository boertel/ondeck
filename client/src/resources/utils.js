import { useQuery } from 'react-query'


export function useMyQuery(name, defaultQueryFn) {
  return function (queryKey, queryFn, options) {
    queryFn = queryFn || defaultQueryFn
     /* eslint-disable react-hooks/rules-of-hooks */
    const output = useQuery(queryKey, queryFn, options)
    return {
      ...output,
      [name]: output.data,
    }
  }
}
