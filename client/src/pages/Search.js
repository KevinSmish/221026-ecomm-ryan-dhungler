import React from "react";
import Jumbotron from "components/cards/Jumbotron";
import { useSearch } from "context/search";
import ProductCard from "components/cards/ProductCard";

const Search = () => {
  const [values, setValues] = useSearch();

  // @ts-ignore
  const results = values?.results;
  const count = results?.length ?? 0;

  return (
    <>
      <Jumbotron
        title="Search results"
        subTitle={count < 1 ? "No found products" : `Found ${count} products`}
      />
      <div className="container mt-3">
        <div className="row">
          {results?.map((p) => (
            <div key={p._id} className="col-md-4">
              <ProductCard card={p} />
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
