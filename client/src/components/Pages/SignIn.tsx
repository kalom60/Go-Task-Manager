import { Mail, Lock, Check } from "react-feather";
import { NavLink, useNavigate } from "react-router-dom";
import Google from "../../assets/google.svg";
import Github from "../../assets/github.svg";
import Facebook from "../../assets/facebook.svg";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import "../Custom-CSS.css";

const oAuths = [
  { text: "Google", comp: Google },
  { text: "Github", comp: Github },
  { text: "Facebook", comp: Facebook },
];

interface State {
  email: string;
  password: string;
}

const initialState: State = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<State>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res: Response) => {
        const data = await res.json();
        if (res.ok) {
          setUser(initialState);
          //   toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch(() => {
        toast.error("Failed to Sign in.");
      });
  };

  return (
    <div className="columns is-centered">
      <div className="column is-one-third box signin">
        <h2 className="has-text-centered has-text-weight-bold is-size-3">
          Sign In
        </h2>
        <div className="mb-6 has-text-centered is-size-7">
          Don't have an account?
          <NavLink to={"/signup"} className="is-size-6">
            {" "}
            Sign Up
          </NavLink>
        </div>
        <form className="container m-auto" onSubmit={handleSubmit}>
          <div className="fields mx-6">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                <span className="icon is-small is-left">
                  <Mail size={16} />
                </span>
                <span className="icon is-small is-right">
                  <Check size={16} />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                <span className="icon is-small is-left">
                  <Lock size={16} />
                </span>
              </p>
            </div>
            <div className="field has-text-centered mt-5">
              <p className="control">
                <button className="button is-fullwidth is-success">
                  Log In
                </button>
              </p>
            </div>
          </div>
        </form>
        <div className="custom-sign-in-line mt-5">
          <hr className="left-line ml-6" />
          <div className="sign-in-text">
            <h2 className="title is-4">or</h2>
          </div>
          <hr className="right-line mr-6" />
        </div>
        <div className=" is-flex is-justify-content-center mt-5 mb-6 mx-6">
          {oAuths.map((oAuth, index: number) => (
            <div
              key={index}
              className="mb-3 ml-5 mr-5 has-text-weight-medium is-size-7"
            >
              <img src={oAuth.comp} width={30} height={30} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
