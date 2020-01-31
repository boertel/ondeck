import { useMutation } from "react-query";
import { useMyQuery } from "./utils";
import api from "./api";

const defaultQueryFn = ({ workspaceSlug, boardSlug }) =>
  api(`/api/v1/workspaces/${workspaceSlug}/${boardSlug}/columns/`).then(
    ({ data }) => data
  );

export const useColumns = useMyQuery("columns", defaultQueryFn);

const defaultPostMutationFn = ({ workspaceSlug, boardSlug }) => data =>
  api
    .post(`/api/v1/workspaces/${workspaceSlug}/${boardSlug}/columns/`, data)
    .then(({ data }) => data);

export const addColumn = ({ workspaceSlug, boardSlug }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  return useMutation(defaultPostMutationFn({ workspaceSlug, boardSlug }), {
    refetchQueries: ["columns"]
  });
};
