import React, { useMemo, useState, useContext } from 'react'
import CmdK from 'cmdk'
import 'cmdk/dist/cmdk.cjs.development.css'

export const CommandContext = React.createContext({})
export const CommandQuery = (props) => {
  const [options, setOptions] = useState({})
  const value = useMemo(() => ({
    options,
    set: function(data) {
      setOptions(prev => ({
        ...prev,
        ...data,
      }))
    }
  }), [options])
  return <CommandContext.Provider {...props} value={value} />
}

export const useCommand = () => useContext(CommandContext)

const Command = (props) => {
  const { options } = useCommand()
  return Object.keys(options).length > 0 ? <CmdK {...props} options={Object.values(options)} /> : props.children({})
}

export default Command
