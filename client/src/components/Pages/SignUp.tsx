import { Mail, Lock, Check, User } from "react-feather";
import { NavLink, useNavigate } from "react-router-dom";
import Google from "../../assets/google.svg";
import Github from "../../assets/github.svg";
import Facebook from "../../assets/facebook.svg";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const oAuths = [
  { text: "Google", comp: Google },
  { text: "Github", comp: Github },
  { text: "Facebook", comp: Facebook },
];

interface State {
  username: string;
  email: string;
  password: string;
}

const initialState: State = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = useState<State>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await auth.signUp(user);
      setUser(initialState);
      navigate("/");
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        if (typeof err.message === "string") {
          toast.error(err.message);
        }
      } else {
        toast.error("Failed to sign up");
      }
    }
  };

  return (
    <div className="columns is-centered is-vcentered mt-6">
      <div className="column is-one-third box">
        <h2 className="has-text-centered has-text-weight-bold is-size-3">
          Sign Up
        </h2>
        <div className="mb-6 has-text-centered is-size-7">
          Already have an account?
          <NavLink to={"/signin"} className="is-size-6">
            {" "}
            Log In
          </NavLink>
        </div>
        <form className="container m-auto" onSubmit={handleSubmit}>
          <div className="fields mx-6">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
                <span className="icon is-small is-left">
                  <User size={16} />
                </span>
                {/* <span className="icon is-small is-right">
                  <Check size={16} />
                </span> */}
              </p>
            </div>
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
                  Sign Up
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
        <div className="mt-5 mb-6 mx-6">
          {oAuths.map((oAuth, index: number) => (
            <div
              key={index}
              className="custom-bordered-div mb-3 has-text-weight-medium is-flex is-align-items-center is-size-7"
            >
              <img src={oAuth.comp} className="ml-2 mr-3" />
              Continue with {oAuth.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
