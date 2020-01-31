import { useMutation } from "react-query";
import { useMyQuery } from "./utils";
import api from "./api";

const defaultQueryFn = ({ workspaceSlug, boardSlug }) =>
  fetch(`/api/v1/workspaces/${workspaceSlug}/${boardSlug}/tickets/`).then(res =>
    res.json()
  );

export const useTickets = useMyQuery("tickets", defaultQueryFn);

const defaultPostMutationFn = ({ workspaceSlug, boardSlug }) => data =>
  api
    .post(`/api/v1/workspaces/${workspaceSlug}/${boardSlug}/tickets/`, data)
    .then(({ data }) => data);

export const addTicket = ({ workspaceSlug, boardSlug }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  return useMutation(defaultPostMutationFn({ workspaceSlug, boardSlug }), {
    refetchQueries: ["tickets"]
  });
};
