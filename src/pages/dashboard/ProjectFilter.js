import React from 'react'

// Create a constant for the filter options

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter({ currentFilter, changeFilter }) {
    
    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }
    
  return (
    <div className='project-filter'>
    <nav>
    <p>Filter:</p>
    {/* Map over the filterList array and create a button for each filter option. F represents the filter option, and then
    a className of active is added to the button if the current filter is equal to the filter option. */}
    {filterList.map((f) => (
        <button key={f} onClick={() => handleClick(f)}
        className={currentFilter === f ? 'active' : ''}
        >
            {f}
        </button>
    ))}
    </nav>
      
    </div>
  )
}
