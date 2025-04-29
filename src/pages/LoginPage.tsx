import { useEffect, useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../hooks/useAuth";
import { getUserByToken } from "../api/auth.api";
import { AxiosError } from "axios";

const loginSchema = Yup.object().shape({
  username: Yup.string().min(3).max(30).required("Username is required"),
  password: Yup.string().min(6).max(50).required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveAuth, setCurrentUser, currentUser } = useAuth();

  useEffect(() => {
    console.log("Current user:", currentUser);
  }, [currentUser]);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const response = await login(values.username, values.password);
        if (response && response.token && response.refreshToken) {
          saveAuth({
            token: response.token,
            refreshToken: response.refreshToken,
          });
          const { data: user } = await getUserByToken();
          if (user) {
            setCurrentUser(user);
            navigate("/home");
          }
        }
      } catch (error) {
        console.error("Login failed", error);
        saveAuth(undefined);

        if (isAxiosError(error)) {
          const { response } = error;
          if (response) {
            const { status, data } = response;
            if (status === 401) {
              setStatus((data as { error: string }).error);
            } else if (status === 500) {
              setStatus((data as { error: string }).error);
            }
          }
        }
      }
      setSubmitting(false);
      setLoading(false);
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
        <button
          type="submit"
          className="btn btn-warning w-100"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Login"
          )}
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
