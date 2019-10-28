import { Resource } from 'rest-hooks'

class BoardResource extends Resource {
  name = ''
  slug = null
  created_at = null
  updated_at = null

  pk() {
    return this.slug
  }

  static urlRoot = 'http://localhost:8000/api/v1/workspaces/'
}

export default BoardResource
