// import { useState } from "react";
import { login } from "../api/auth.api"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const loginSchema = Yup.object().shape({
  username: Yup.string().min(3).required("Username is required"),
  password: Yup.string().min(3).required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values.username, values.password);
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.user));
          navigate("/");
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  });

  return (
    <form className="form m-4 p-2" onSubmit={formik.handleSubmit} noValidate>
      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}
      <div className="form-group mb-3">
        <label htmlFor="username" className="text-light mb-1">
          Username
        </label>
        <input
          type="text"
          {...formik.getFieldProps("username")}
          className={`form-control ${
            formik.touched.username && formik.errors.username
              ? "is-invalid"
              : ""
          }`}
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="invalid-feedback">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password" className="text-light mb-1">
          Password
        </label>
        <input
          autoComplete="off"
          type="password"
          {...formik.getFieldProps("password")}
          className={`form-control ${
            formik.touched.password && formik.errors.password
              ? "is-invalid"
              : ""
          }`}
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="invalid-feedback">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="form-group mb-3 mt-4">
        <button type="submit" className="btn btn-warning w-100">
          Login
        </button>
      </div>
      <div className="form-group mb-3">
        <button
          onClick={() => navigate("/register")}
          className="btn btn-link w-100 text-decoration-none text-light"
        >
          Don't have an account?
          <span style={{ fontWeight: "bold" }}> Register here!</span>
        </button>
      </div>
    </form>
  );
}

export default LoginPage;
