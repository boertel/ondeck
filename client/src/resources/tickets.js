import { useMutation } from "react-query";
import { useMyQuery } from "./utils";
import api from "./api";

const defaultQueryFn = ({ workspaceSlug, boardSlug }) =>
  fetch(`/api/v1/workspaces/${workspaceSlug}/${boardSlug}/tickets/`).then(res =>
    res.json()
  );

export const useTickets = useMyQuery("tickets", defaultQueryFn);

const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data => {
  let path = ['', 'api', 'v1', 'workspaces', workspaceSlug, boardSlug, 'tickets']
  let method = 'post'
  console.log(data)
  if (data.id) {
    path.push(data.id)
    method = 'patch'
  }
  path.push('')
  api[method](path.join('/'), data)
    .then(({ data }) => data);
}

export const mutateTicket = ({ workspaceSlug, boardSlug }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  return useMutation(defaultMutationFn({ workspaceSlug, boardSlug }), {
    refetchQueries: ["tickets"]
  });
};
