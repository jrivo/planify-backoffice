import Button from "./Button";

const uploadInput = ({ children, onChange }) => {
  return (
    <label htmlFor="upload-photo">
      <input
        style={{ display: "none" }}
        id="upload-photo"
        name="images"
        type="file"
        multiple
        onChange={onChange}
      />

      <Button color="secondary" variant="contained" component="span">
        {children}
      </Button>
    </label>
  );
};

export default uploadInput;
