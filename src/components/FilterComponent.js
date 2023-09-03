import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const FilterComponent = (props) => {
  const {isLoading, handleSearch, options, labelKey, handleOptionClick} = props
  const filterBy = () => true;
  return (
    <AsyncTypeahead
      isLoading={isLoading}
      placeholder="Search by Name"
      filterBy={filterBy}
      id="async-example"
      onSearch={handleSearch}
      labelKey={labelKey}
      options={options}
      renderMenuItemChildren={(option, index) => (
        <div>
          <div tabIndex={option._id} onKeyDown={() => handleOptionClick(option._id)} onClick={() => handleOptionClick(option._id)}>
            {option.name}
            </div>
        </div>
      )}
    />
  );
};

export default FilterComponent;
