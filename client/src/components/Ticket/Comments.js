import React from 'react'
import { useParams } from 'react-router-dom'

import { AddCommentForm } from '../../form'
import { useComments } from '../../resources/comments'

const Comment = ({ message, user, updated_at }) => {
  return (
    <div>
      <small>{user.name}</small>
      <p>{message}</p>
      <hr />
    </div>
  )
}

const Comments = () => {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()
  const { data: comments } = useComments({ workspaceSlug, boardSlug, ticketSlug })
  // TODO initial data? to avoid (versions || []) later
  //
  if (!comments) {
    return null
  }

  return (
    <>
      <h4>Comments</h4>
      <AddCommentForm />
      {(comments || []).map(comment => {
        return <Comment key={comment.id} {...comment} />
      })}
    </>
  )
}

export default Comments
