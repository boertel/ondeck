import React, { useRef, useEffect } from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import AsyncCreatableSelect from 'react-select/async-creatable'
import CreatableSelect from 'react-select/creatable'

const styles = {
  container: (provided) => {
    return {
      ...provided,
      width: '100%',
    }
  },
  control: (provided, state) => {
    return {
      ...provided,
      borderWidth: '2px',
      borderRadius: 'var(--border-radius)',
      boxShadow: 'none',
      backgroundColor: 'var(--fg)',
      fontSize: '1rem',
      width: '100%',
    }
  },
  input: (provided) => {
    return {
      ...provided,
      '& input': {
        height: 'auto',
      },
    }
  },
  menu: (provided) => {
    return {
      ...provided,
      backgroundColor: 'var(--fg)',
    }
  },
}

const theme = (defaultTheme) => ({
  ...defaultTheme,
  colors: {
    danger: 'var(--danger)',
    dangerLight: 'var(--danger-hover)',
    primary: 'var(--primary)',
    primary75: 'aqua',
    primary50: 'var(--primary-hover)',
    primary25: 'var(--primary-hover)',
    neutral0: 'var(--bg)',
    neutral5: 'yellow',
    neutral10: 'var(--primary-hover)',
    neutral20: 'var(--border-color)',
    neutral30: 'var(--border-color-hover)',
    neutral40: 'var(--primary)',
    neutral50: 'var(--placeholder)',
    neutral60: 'var(--default)',
    neutral70: 'pink',
    neutral80: 'var(--default)',
    neutral90: 'purple',
  },
})

const ComboBoxInput = ({ autoFocus, ...props }) => {
  const ref = useRef()
  useEffect(() => {
    if (autoFocus) {
      ref.current.focus()
    }
  }, [autoFocus])
  let onChange = props.onChange
  let AsComponent = Select
  if (props.loadOptions) {
    AsComponent = AsyncSelect
  }
  if (props.onCreate) {
    if (props.loadOptions) {
      AsComponent = AsyncCreatableSelect
    } else {
      AsComponent = CreatableSelect
    }
    onChange = (option) => {
      if (option.__isNew__) {
        props.onCreate(option)
      } else if (onChange) {
        props.onChange(option)
      }
    }
  }
  return <AsComponent ref={ref} styles={styles} theme={theme} {...props} onChange={onChange} />
}
export default ComboBoxInput
