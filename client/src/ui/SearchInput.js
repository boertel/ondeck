import React, {useRef, useEffect} from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

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
      backgroundColor: 'var(--bg)',
      fontSize: '1rem',
      width: '100%',
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

const SearchInput = ({ ...props }) => {
  const ref = useRef()
  useEffect(() => {
    ref.current.focus()
  }, [])
  const AsComponent = props.loadOptions ? AsyncSelect : Select
  return <AsComponent ref={ref} styles={styles} theme={theme} {...props} />
}
export default SearchInput
