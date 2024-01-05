import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);

        // Assuming the server returns a token in the response
        const token = data.token;

        // Now, fetch the user profile using the obtained token
        const profileRes = await fetch("http://localhost:3000/profile", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          console.log("Profile Data:", profileData);
        } else {
          console.error("Error fetching profile:", profileRes.statusText);
        }

        setName("");
        setPassword("");
      } else {
        console.error("Login failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="name"
        value={name}
        placeholder="name"
      />
      <br />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        value={password}
        placeholder="password"
      />
      <br />
      <button onClick={(e) => handleSubmit(e)}>Login</button>
      <Link to="/register">
        <button>Register Page</button>
      </Link>
    </div>
  );
}

export default Login;
