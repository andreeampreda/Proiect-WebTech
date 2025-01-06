function ListGroup() {
  let items = ["Bucuresti", "Cluj", "Timisoara", "Iasi", "Brasov"];

  items = [];

  return (
    <>
      <h1>List Group</h1>
      {items.length === 0 && <p>No items</p>}
      <ul className="list-group">
        {items.map((item) => (
          <li key={item} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
