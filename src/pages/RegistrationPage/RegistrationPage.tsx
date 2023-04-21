import { FC, useEffect } from "react";
import { Form, Input, Radio, Checkbox, Switch, DatePicker, Button, Typography, Layout, message } from "antd";
import { getCategories, categoryActions, userActions, getIsAuth } from "src/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { Navigate, Link } from "react-router-dom";
import { Formik } from "formik";
import css from "./registration.module.css";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().min(2, 'Поле должно содержать минимум 2 символа').required("Обязательное поле"),
    login: yup.string().email('Введите корректный email').required("Обязательное поле"),
    password: yup.string().min(6, "Поле должно содержать минимум 6 символов").required("Обязательное поле"),
    repeatedPassword: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают"),
    interests: yup.array().min(2, "Должно быть выбрано минимум 2 категории").required("Обязательное поле"),
    isSubscribe: yup.boolean().required("Обязательное поле")
});

export const RegistrationPage: FC = () => {
    const categories = useSelector(getCategories);
    const dispatch = useAppDispatch();
    const isAuth = useSelector(getIsAuth);

    useEffect(() => {
        dispatch(categoryActions.serverRequest());
    }, [])


    return (
        <Layout.Content className="content">
            <h2 className="categoryTitle">Регистрация</h2>
            <Formik
                initialValues={{
                    name: '',
                    login: '',
                    password: '',
                    repeatedPassword: '',
                    interests: [] as string[],
                    isSubscribe: false,
                }}
                validateOnBlur
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(userActions.registration(values))
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, setFieldValue }) => (
                    <Form
                        className={css.registrationForm}
                        onFinish={handleSubmit}
                        layout="horizontal">
                        <Form.Item label="Псевдоним" required>
                            <Input name="name" placeholder="Введите никнейм" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                            {touched.name && errors.name && <Typography.Text className={css.errorMessage}>{errors.name}</Typography.Text>}
                        </Form.Item>
                        <Form.Item label="Электронная почта" required>
                            <Input name="login" placeholder="Введите почту" value={values.login} onChange={handleChange} onBlur={handleBlur} />
                            {touched.login && errors.login && <Typography.Text className={css.errorMessage}>{errors.login}</Typography.Text>}
                        </Form.Item>
                        <Form.Item label="Пароль" required>
                            <Input.Password className = {css.password} placeholder="Введите пароль" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            {touched.password && errors.password && <Typography.Text className={css.errorMessage}>{errors.password}</Typography.Text>}
                            <Input.Password name="repeatedPassword" placeholder="Подтвердите пароль" value={values.repeatedPassword} onChange={handleChange} onBlur={handleBlur} />
                            {touched.repeatedPassword && errors.repeatedPassword && <Typography.Text className={css.errorMessage}>{errors.repeatedPassword}</Typography.Text>}
                        </Form.Item>
                        <Form.Item label="Любимые категории" required>
                            {categories.map((category) => <Checkbox onClick={handleBlur}
                                name="interests" key={category.id}
                                checked={values.interests.includes(category.label)}
                                onChange={(e) => {
                                    const { interests } = values;
                                    let newInterests;
                                    e.target.checked ? newInterests = [...interests, category.label] : newInterests = interests.filter((interest) => interest !== category.label)
                                    setFieldValue("interests", newInterests);
                                }}>{category.label}</Checkbox>)}
                            {touched.interests && errors.interests && <Form.Item><Typography.Text className={css.errorMessage}>{errors.interests}</Typography.Text></Form.Item>}
                        </Form.Item>
                        <Form.Item label="Подписаться на новости" >
                            <Switch defaultChecked={values.isSubscribe} onChange={(value) => setFieldValue("isSubscribe", value)} />
                        </Form.Item>
                        <Form.Item className={css.fromContol}>
                            {isAuth && <Navigate to="/" />}
                            <Button className={css.registrationBtn} type="primary" htmlType="submit" onClick={() => {
                                if (!isValid) {
                                    message.open({
                                        type: "error",
                                        content: "Заполните все поля"
                                    })
                                }
                                handleBlur;
                                handleSubmit();
                            }}>Зарегистрироваться</Button>
                            <Link to="/"><Button>Отмена</Button></Link>
                        </Form.Item>
                    </Form >
                )}
            </Formik>
        </Layout.Content>
    )
}