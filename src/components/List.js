import React, { useState } from 'react';

const ListRow = (props) => {
	const item = props.row;
	return(
		<li
			className={props.checkInput === "all"? "list-row-show":
			props.checkInput === "finished"? item.checked? "list-row-show": "list-row-hide":
			props.checkInput === "unfinished"? item.checked? "list-row-hide": "list-row-show": ""}
			key={item.id}>
			<div className="list-content">
				<p className="list-desc">{item.desc}</p>
			</div>
			<div className="list-option">
				<input
					type="checkbox"
					value={item.id}
					defaultChecked={item.checked? "checked": ""}
					onChange={props.handleCheck}/>
				<button
					onClick={() => props.addEditList(item.id)}
					className="btn btn-edit">
					Edit
				</button>
				<button
					value={item.id}
					onClick={props.deleteList}
					className="btn btn-delete">
					Delete
				</button>
			</div>
		</li>
	)

}

const EditRow = (props) => {
	const item = props.row;
	return(
		<li 
			className={props.checkInput === "all"? "list-row-show":
			props.checkInput === "finished"? item.checked? "list-row-show": "list-row-hide":
			props.checkInput === "unfinished"? item.checked? "list-row-hide": "list-row-show": ""}
			key={item.id}>
			<div className="list-content">
				<input 
					className="list-edit" 
					type="text" 
					defaultValue={item.desc}
					onChange={(event) => props.setDesc(event.target.value)}
					/>
			</div>
			<div className="list-option">
				<button
					onClick={() => props.changeDesc(item.id)}
					className="btn btn-edit">
					Save
				</button>
				<button 
					onClick={() => props.removeEditList(item.id)}
					className="btn btn-delete">
					Cancel
				</button>
			</div>
		</li>
	)

}

const List = (props) => {
	console.log(props.checkInput)
	const [arrId, setArrId] = useState([]);
	const [desc, setDesc] = useState('');

	const addEditList = (id) => {
		setArrId(prevArrId => prevArrId.includes(id)? prevArrId.filter(item => item !== id): [...prevArrId, id]);
	}

	const changeDesc = (id) => {
		setArrId(prevArrId => prevArrId.includes(id)? prevArrId.filter(item => item !== id): [...prevArrId, id]);

		if(desc !== '')
		props.editDesc(desc, id);
	}

	return (
		<div className="list-body">
			<div className="card">
				<ul className="card-body">
					{props.toDoList.map(row => 
						arrId.includes(row.id)? 
						<EditRow
						key={row.id}
						row={row}
						setDesc={setDesc}
						changeDesc={changeDesc}
						removeEditList={addEditList} 
						deleteList={props.deleteList} />: 

						<ListRow 
						key={row.id}
						row={row}
						checkInput={props.checkInput}
						editDesc={props.editDesc}
						addEditList={addEditList} 
						deleteList={props.deleteList}
						handleCheck={props.handleCheck} />
					)}
					{props.children}
				</ul>
			</div>
		</div>
	)
}


export default List;