import React, { useState , createRef, useEffect} from "react";
import { useLocation, useNavigate } from "react-router";
import { Content } from "../../components/Content";
import { useAuthContext } from "../../context/auth";
import { StyledSection } from "./style";
import { getField } from "../../utils";

export function Login() {
  const [fields,setFields] = useState({email:'',password:''})
  const ref = createRef(null);
  let history = useNavigate();
	let location = useLocation();
	let auth = useAuthContext();
  let { from = { pathname: "/" } } = location.state;
  
  useEffect(()=>{
    console.log('login renderizou')
  },[])

	async function handleSubmit(e){
    e.preventDefault();
    const { email,password} = getField(ref, ['email','password']);
    setFields(values => ({...values,email, password}))
    await auth.handlerLogin(email, password, () => {
			history(from, {replace:true});
		});
	};
  return (
    <Content>
      <StyledSection>
        <form ref={ref} id="form-login" onSubmit={handleSubmit}>
          <label htmlFor="title">Email : </label>
          <input type="text" name="email" defaultValue={fields.email}/>
          <label htmlFor="title">Senha : </label>
          <input type="text" name="password" defaultValue={fields.password}/>
          <button type="submit" name="submit" >login</button>
        </form>
      </StyledSection>
    </Content>
  );
}
