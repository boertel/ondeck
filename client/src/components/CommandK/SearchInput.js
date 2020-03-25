import React, {useRef, useEffect} from 'react'
import AsyncSelect from 'react-select/async'

const options = [
  { value: 'create', label: 'Create a ticket' },
  { value: 'archive', label: 'Archive ticket' },
  { value: 'vanilla', label: 'Go to [Inspiration] board' },
]

const styles = {
  control: (provided, state) => {
    console.log(state.isFocused)
    return {
      ...provided,
      borderWidth: '2px',
      borderRadius: 'var(--border-radius)',
      boxShadow: 'none',
      backgroundColor: 'var(--bg)',
      fontSize: '1rem',
    }
  },
}

const theme = defaultTheme => ({
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
    neutral10: 'blue',
    neutral20: 'var(--border-color)',
    neutral30: 'var(--border-color-hover)',
    neutral40: 'green',
    neutral50: 'var(--placeholder)',
    neutral60: 'var(--default)',
    neutral70: 'pink',
    neutral80: 'var(--default)',
    neutral90: 'purple',
  },
})

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(options)
  }, 1000)
}

const SearchInput = () => {
  const ref = useRef()
  useEffect(() => {
    ref.current.focus()
  }, [])
  return <AsyncSelect ref={ref} options={options} loadOptions={loadOptions} styles={styles} theme={theme} />
}
export default SearchInput
