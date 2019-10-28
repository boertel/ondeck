import { Resource } from 'rest-hooks'

import BoardResource from './BoardResource'

class WorkspaceResource extends Resource {
  name = ''
  slug = null
  created_at = null
  updated_at = null
  boards = []

  pk() {
    return this.slug
  }

  static urlRoot = 'http://localhost:8000/api/v1/workspaces/'

  static getEntitySchema() {
    const schema = super.getEntitySchema()
    schema.define({
      boards: [BoardResource.getEntitySchema()]
    })
    return schema
  }
}

export default WorkspaceResource
