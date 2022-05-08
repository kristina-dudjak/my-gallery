import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Api from "../Api";

function Search() {

  const [query, setQuery] = useState(null);
  const [imgs, setImgs] = useState(null);


  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  
  const handleSubmit = () => {
    Api.getImagesByQuery(query).then((e) => {
      setImgs(e);
    });
  };

  return (
    <Form
      className="search d-flex"
      onChange={handleChange}
      type="text"
      name="image"
      placeholder="Search for images"
    >
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success" onClick={handleSubmit} type="submit">
        Search
      </Button>
    </Form>
  );
}

export default Search;
