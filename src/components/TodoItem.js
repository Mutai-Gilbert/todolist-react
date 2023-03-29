import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import styles from '../styles/TodoItem.module.css';
import { useTodosContext } from '../context/TodosContext';

const TodoItem = ({
  itemProp,
}) => {
  const { handleChange, delTodo, setUpdate } = useTodosContext();
  const [updateInput, setUpdateInput] = useState(itemProp.title);
  const [editing, setEditing] = useState(false);
  const handleEditing = () => {
    setEditing(true);
  };
  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setUpdate(updateInput, itemProp.id);
      setEditing(false);
    }
  };
  const viewMode = {};
  const editMode = {};
  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={itemProp.completed}
          onChange={() => handleChange(itemProp.id)}
        />
        <button type="button" onClick={handleEditing}>
          <AiFillEdit />
        </button>
        <button type="button" onClick={() => delTodo(itemProp.id)}>
          <FaTrash />
        </button>
        {updateInput}
      </div>
      <input
        type="text"
        value={updateInput}
        className={styles.textInput}
        style={editMode}
        onChange={(e) => setUpdateInput(e.target.value)}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};
TodoItem.propTypes = {
  itemProp: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
export default TodoItem;
