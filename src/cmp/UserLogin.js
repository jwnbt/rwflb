import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="enter email" onChange={(event) => setEmail(event.target.value)} />
      <input type="password" placeholder="enter password" onChange={(event) => setPassword(event.target.value)} />
      <input type="submit" />
    </form>
  );
}

export default LoginForm;
