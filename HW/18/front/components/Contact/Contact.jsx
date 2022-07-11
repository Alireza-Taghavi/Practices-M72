import {useState} from 'react';

import {useFormik} from 'formik';
import * as yup from 'yup';
export default function Contact() {
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const formik = useFormik({
        initialValues: {
            subject: '',
            department: '',
            message: '',
        },
        onSubmit: async (values, { resetForm }) => {
            setMessage('پیام ارسال شد');
            setSubmitted(true);
            console.log(values);
            resetForm();
            setTimeout(()=>{setSubmitted(false)}, 3000)
        },
        validationSchema: yup.object({
            subject: yup.string().trim().required('موضوع انتخاب نشده'),
            message: yup.string().trim().required('پیام خود را وارد کنید'),
        }),
    })
    return (
        <div className="bg-[#313A56] flex flex-col gap-5 p-4 rounded-lg text-white ">
            <h2 className="text-sm font-medium">
                ثبت درخواست پشتیبانی
            </h2>

            <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs font-normal flex flex-row gap-2 lg:text-md">
                        موضوع
                        {formik.errors.subject && (
                            <p className="text-xs lg:text-md text-red-400">{formik.errors.subject}</p>
                        )}
                    </label>

                    <input
                        type="text"
                        name="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="موضوع خود را درج کنید"
                        className="p-3 bg-[#232A3B] rounded-lg text-xs focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="department" className="text-xs font-normal lg:text-md">
                        واحد پشتیبانی
                    </label>
                    <select value={formik.values.department}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="واحد مرتبط را انتخاب کنید"
                            name="department"
                    className="p-3 bg-[#232A3B] rounded-lg text-xs "
                    >
                        <option value="sales">واحد فروش</option>
                        <option value="technical">واحد فنی</option>
                        <option value="financial">واحد مالی</option>
                        <option value="management">مدیریت</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-normal flex flex-row gap-2 lg:text-md">
                        توضیحات
                        {formik.errors.message && (
                            <p className="text-xs lg:text-md text-red-400 ">{formik.errors.message}</p>
                        )}
                    </label>
                    <textarea
                        name="message"
                        placeholder="پیام خود را درج کنید"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-3 bg-[#232A3B] rounded-lg text-xs h-36 resize-none"
                    />
                </div>
                <button type="submit" className="py-4 bg-[#2352C3] rounded-lg hover:bg-[#2342B3]">
                    ثبت درخواست
                </button>
                <div hidden={!submitted} className="text-red-600" role="alert">
                    {message}
                </div>
            </form>
        </div>
    );
}