import React from 'react';

const Tasks = (props) => {
  return (
      <div>
          {props.match.params.type}
      </div>
  )
}

export default Tasks
