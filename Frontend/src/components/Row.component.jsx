const RowTable = (props) => {
  const deleteUser = () => {
    props.onDeleteUser(props.id);
  };

  const handleClickEdit = () => {
    props.onEdit(props.id);
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.password}</td>
      <td>{props.email}</td>
      <td>
        <button type="button" className="btn btn-success" onClick={deleteUser}>
          Delete
        </button>

        <button
          type="button"
          className="btn btn-info"
          onClick={handleClickEdit}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default RowTable;
