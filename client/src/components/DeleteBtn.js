import React from 'react'
import {Button,Icon, Label} from 'semantic-ui-react'

export const DeleteBtn = () => {
  return (
    <Button as="div" color="red" floated="right" onClick={() => console.log('deleted')}>
      <Icon name="trash" style={{margin:0}}/>
    </Button>
  )
}
