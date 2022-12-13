import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Save",
  handleDelete,
}) => {
  return (
    <>
      <p>Create a new category</p>
      <div className="p-3">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Write category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary mt-3">
              {buttonText}
            </button>
            {handleDelete && (
              <button
                type="button"
                className="btn btn-danger mt-3"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
