import React from "react";
export default function Login() {
  return (
    <div className="content">
      <section>
        <form action="/auth/register" method="POST">
          <label htmlFor="first_name">Nome : </label>
          <input type="text" name="first_name" />
          <label htmlFor="email">Email : </label>
          <input type="text" name="email" />
          <label htmlFor="password">password : </label>
          <input type="password" name="password" />
          <label htmlFor="password">repeate password" : </label>
          <input type="password" name="repeat_password" />
          <button type="submit" name="submit">Create</button>
          <button className="btn-back" type="reset" name="back">Back</button>
        </form>
      </section>
    </div>
  );
}
