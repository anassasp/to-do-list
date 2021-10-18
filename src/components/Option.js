const Option = (props) => {
  return (
    <div className="list-header">
    <h1 className="header">To-Do-<span className="header-color">List</span></h1>
    <fieldset>
      <legend>Option</legend>
      <select onChange={props.handleChange} className="show-option" name="list">
        <option value="all">All</option>
        <option value="finished">Finished</option>
        <option value="unfinished">Unfinished</option>
      </select>
    </fieldset>
    </div>
  )
}

export default Option;