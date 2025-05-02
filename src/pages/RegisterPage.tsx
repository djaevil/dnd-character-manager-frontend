// import { useState, useEffect } from "react";
import { register } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const registerSchema = Yup.object().shape({
  username: Yup.string().min(3).max(30).required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await register(
          values.username,
          values.email,
          values.password,
          values.confirmPassword
        );
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Registration successful",
            titleText: "Registration successful",
            text: "You can now log in.",
            theme: "dark",
            confirmButtonColor: "#ffc107",
          }).then(() => {
            navigate("/login");
          });
        }
      } catch (error) {
        console.error("Registration failed", error);
      }
      setSubmitting(false);
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
        <label htmlFor="email" className="text-light mb-1">
          Email
        </label>
        <input
          type="text"
          {...formik.getFieldProps("email")}
          className={`form-control ${
            formik.touched.email && formik.errors.email ? "is-invalid" : ""
          }`}
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="invalid-feedback">{formik.errors.email}</div>
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
      <div className="form-group mb-3">
        <label htmlFor="confirmPassword" className="text-light mb-1">
          Confirm password
        </label>
        <input
          autoComplete="off"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          className={`form-control ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "is-invalid"
              : ""
          }`}
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="invalid-feedback">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>
      <div className="form-group mb-3 mt-4">
        <button
          type="submit"
          className="btn btn-warning w-100"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Register
        </button>
      </div>
      <div className="form-group mb-3">
        <button
          onClick={() => navigate("/login")}
          className="btn btn-link w-100 text-decoration-none text-light"
        >
          Already have an account?
          <span style={{ fontWeight: "bold" }}> Login here!</span>
        </button>
      </div>
    </form>
  );
}

export default RegisterPage;
