import {useFormik} from "formik";
import * as Yup from "yup";

export default function FormikTest() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .max(15, "Name is too long"),
            email: Yup.string()
                .email("Email is invalid")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: values => {
            console.log(values);
            console.log(formik.errors);

            formik.handleReset();
        }
    })
return (
    <>
    <div>
        <label>name</label>
        <input onChange={formik.handleChange} value={formik.values.name} type="text" name="name" />
        <label>email</label>
        <input onChange={formik.handleChange} value={formik.values.email} type="email" name="email" />
        <label>password</label>
        <input onChange={formik.handleChange} value={formik.values.password} type="password" name="password" />
        <button onClick={formik.handleSubmit} type={"submit"}>submit</button>
        <button onClick={formik.handleReset} type={"submit"}>reset</button>
    </div>
        <p>
            {formik.errors.name ? formik.errors.name : null}
            {formik.errors.email ? formik.errors.email : null}
            {formik.errors.password ? formik.errors.password : null}
        </p>
    </>
        )
}