export default function MyProductsComponent(props) {
  if (props.products.length === 0) {
    return <h2>Sorry you don't create products </h2>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Product Title</th>
          <th scope="col">Update / Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
  );
}
