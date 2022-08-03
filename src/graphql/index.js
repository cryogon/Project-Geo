import gql from "graphql-tag";

export const INSERT_PATH = gql`
  mutation setPath($name: String!, $path: jsonb!) {
    insert_paths(objects: { path_name: $name, path: $path }) {
      affected_rows
      returning {
        path_name
        path
      }
    }
  }
`;
export const GET_PATH = gql`
  query getPath {
    paths {
      path_name
      path
    }
  }
`;
export const UPDATE_PATH = gql`
  mutation updatePath($oldName: String!, $newName: String!) {
    update_paths(
      where: { path_name: { _eq: $oldName } }
      _set: { path_name: $newName }
    ) {
      affected_rows
    }
  }
`;
export const DELETE_PATH = gql`
  mutation deletePath($path: String!) {
    delete_paths(where: { path_name: { _eq: $path } }) {
      affected_rows
    }
  }
`;
