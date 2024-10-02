'use client'

import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import config from "../config";
import { useRouter} from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const signin = async () => {



    try {
      const payload = {
        username: username,
        password: password,
      };



      const res = await axios.post(
        config.apiServer + "/api/user/signin",
        payload
      );

// console.log(res);
// console.log(res.data.token);
if (res.data.token !== undefined) {
        localStorage.setItem(config.token, res.data.token);
        localStorage.setItem("next_name", res.data.name);
        localStorage.setItem("next_user_id", res.data.id);
        router.push("/backoffice");

      }
      else {
        Swal.fire({
          title: "error",
          text: "ไม่พบข้อมูล",
          icon: "error",
        });
      }

    } catch (e: any) {

      if(e.response.status == 401)
      {
        Swal.fire({
          title: "ตรวจสอบ User",
          text: "ตรวจสอบ User",
          icon: "error",
        });
      }
      else  
      {
        Swal.fire({
          title: "error",
          text: e.message,
          icon: "error",
        });
      }



    
    }
  };


  function KeyDown (e)
  {
    if (e.key === "Enter") {
       signin();
    }
  }

    return <>
         <div className="login-box">
  <div className="login-logo">
    <a href="../../index2.html"><b>Admin</b>LTE</a>
  </div>
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      {/* <form action="../../index3.html" method="post"> */}
        <div className="input-group mb-3">
          <input  className="form-control" placeholder="Email" onChange={e=> setUsername(e.target.value)} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" onChange={e=> setPassword(e.target.value)} onKeyDown={KeyDown} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">
                Remember Me
              </label>
            </div>
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block"
            onClick={signin}>Sign In</button>
          </div>
        </div>
      {/* </form> */}
      <div className="social-auth-links text-center mb-3">
        <p>- OR -</p>
        <a href="#" className="btn btn-block btn-primary">
          <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
        </a>
        <a href="#" className="btn btn-block btn-danger">
          <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
        </a>
      </div>
      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      <p className="mb-0">
        <a href="register.html" className="text-center">Register a new membership</a>
      </p>
    </div>
  </div>
</div>
        </>
}