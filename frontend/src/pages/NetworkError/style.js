import styled from "styled-components";
const StyledSection = styled.section`

  width: 100%;
  min-height: 100%;
  display: block;

.form-container{
  width: 100%;
  height: 80px;
}
.form-container > form {
  min-height: 100px;
  min-width: 200px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.form-container > form label{
  margin-left: 20px;
  width: 70px;
  height: 30px;
  line-height: 25px;
  text-align: center;
  vertical-align: middle;
}
.form-container > form button {
  width: 120px;
  height: 30px;
  border-radius: 10px;
  border-style: solid;
  margin: 0 10px;
}
.form-container > form button[name="submit"]{
  margin-right: 5px;
}
.form-container > form button[name="reset"]{
  margin-left: 5px;
}
.form-container > form input{
  height: 30px;
  padding: 10px;
  width: calc(100% - 320px);
  border-radius: 10px;
  border-style: solid;
}
`;
export {
	StyledSection
}