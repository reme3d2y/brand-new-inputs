import React, { ReactNode, useEffect, useState } from "react";
import cn from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@alfalab/core-components/button";
import { Input } from "@alfalab/core-components/input";
import { DateInput } from "@alfalab/core-components/date-input";
import { MaskedInput } from "@alfalab/core-components/masked-input";
import { Select } from "@alfalab/core-components/select";
import { Switch } from "@alfalab/core-components/switch";
import { WithNewStyles } from "../../../components/with-new-styles";

import styles from "./index.module.css";

function Row({ children, offset = "medium" }: { children: ReactNode; offset?: "medium" | "large" }) {
    return <div className={cn(styles.row, styles[`offset-${offset}`])}>{children}</div>;
}

const citiesOptions = [
    { key: "москва", content: "г. Москва" },
    { key: "санкт-петербург", content: "г. Санкт-Петербург" },
    { key: "новосибирск", content: "г. Новосибирск" },
    { key: "екатеринбург", content: "г. Екатеринбург" },
    { key: "казань", content: "г. Казань" },
    { key: "нижний новгород", content: "г. Нижний Новгород" },
    { key: "челябинск", content: "г. Челябинск" },
    { key: "омск", content: "г. Омск" },
    { key: "самара", content: "г. Самара" },
    { key: "ростов-на-дону", content: "г. Ростов-на-Дону" },
];

const FormSchema = Yup.object().shape({
    surname: Yup.string().required("Укажите фамилию"),
    firstname: Yup.string().required("Укажите имя"),
    middlename: Yup.string(),
    dob: Yup.string().required("Укажите дату"),
    birthplace: Yup.string().required("Укажите место рождения"),
    passport: Yup.string().required("Укажите серию и номер паспорта"),
    passportCode: Yup.string().required("Укажите код подразделения"),
    passportDate: Yup.string().required("Укажите дату выдачи"),
    passportAddress: Yup.string().required("Укажите адрес выдачи"),
    address: Yup.string().required("Укажите адрес регистрации"),
});

export function InputsForm() {
    const [passportFieldsDisabled, setPassportFieldsDisabled] = useState(false);

    const formik = useFormik({
        initialValues: {
            surname: "",
            firstname: "",
            middlename: "",
            dob: "",
            birthplace: "",
            passport: "",
            passportCode: "",
            passportDate: "",
            passportAddress: "",
            address: "",
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        if (passportFieldsDisabled) {
            formik.setFieldError("passport", undefined);
            formik.setFieldError("passportCode", undefined);
            formik.setFieldError("passportDate", undefined);
            formik.setFieldError("passportAddress", undefined);
            formik.setFieldError("address", undefined);
        }
    }, [passportFieldsDisabled]);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Row offset="large">
                    <WithNewStyles>
                        <Input
                            label="Фамилия"
                            block={true}
                            size="m"
                            name="surname"
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            error={formik.touched.surname && formik.errors.surname}
                        />
                    </WithNewStyles>

                    <WithNewStyles>
                        <Input
                            label="Имя"
                            block={true}
                            size="m"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={formik.touched.firstname && formik.errors.firstname}
                        />
                    </WithNewStyles>
                </Row>

                <Row>
                    <WithNewStyles>
                        <Input
                            label="Отчество"
                            block={true}
                            size="m"
                            name="middlename"
                            value={formik.values.middlename}
                            onChange={formik.handleChange}
                            error={formik.touched.middlename && formik.errors.middlename}
                        />
                    </WithNewStyles>

                    <WithNewStyles>
                        <DateInput
                            label="Дата рождения"
                            block={true}
                            size="m"
                            name="dob"
                            value={formik.values.dob}
                            onChange={(_, { value }) => formik.setFieldValue("dob", value)}
                            error={formik.touched.dob && formik.errors.dob}
                        />
                    </WithNewStyles>
                </Row>

                <Row>
                    <WithNewStyles>
                        <Select
                            size="m"
                            label="Место рождения"
                            block={true}
                            options={citiesOptions}
                            allowUnselect={true}
                            name="birthplace"
                            selected={formik.values.birthplace}
                            onChange={(payload) =>
                                formik.setFieldValue("birthplace", payload.selected?.key ?? "")
                            }
                            error={formik.touched.birthplace && formik.errors.birthplace}
                        />
                    </WithNewStyles>
                </Row>

                <Row offset="large">
                    <Switch
                        label="Задисейблить паспортные данные"
                        checked={passportFieldsDisabled}
                        onChange={() => setPassportFieldsDisabled((d) => !d)}
                    />
                </Row>

                <Row>
                    <WithNewStyles>
                        <MaskedInput
                            label="Серия и номер паспорта"
                            mask={[/\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                            placeholder="0000 000000"
                            block={true}
                            disabled={passportFieldsDisabled}
                            size="m"
                            name="passport"
                            value={formik.values.passport}
                            onChange={formik.handleChange}
                            error={formik.touched.passport && formik.errors.passport}
                        />
                    </WithNewStyles>
                </Row>

                <Row>
                    <WithNewStyles>
                        <MaskedInput
                            label="Код подразделения"
                            mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                            placeholder="000-000"
                            block={true}
                            disabled={passportFieldsDisabled}
                            size="m"
                            name="passportCode"
                            value={formik.values.passportCode}
                            onChange={formik.handleChange}
                            error={formik.touched.passportCode && formik.errors.passportCode}
                        />
                    </WithNewStyles>

                    <WithNewStyles>
                        <DateInput
                            label="Дата выдачи"
                            block={true}
                            disabled={passportFieldsDisabled}
                            size="m"
                            name="passportDate"
                            value={formik.values.passportDate}
                            onChange={(_, { value }) => formik.setFieldValue("passportDate", value)}
                            error={formik.touched.passportDate && formik.errors.passportDate}
                        />
                    </WithNewStyles>
                </Row>

                <Row>
                    <WithNewStyles>
                        <Input
                            label="Документ выдан"
                            block={true}
                            disabled={passportFieldsDisabled}
                            size="m"
                            name="passportAddress"
                            value={formik.values.passportAddress}
                            onChange={formik.handleChange}
                            error={formik.touched.passportAddress && formik.errors.passportAddress}
                        />
                    </WithNewStyles>
                </Row>

                <Row>
                    <WithNewStyles>
                        <Input
                            label="Место регистрации"
                            block={true}
                            disabled={passportFieldsDisabled}
                            size="m"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && formik.errors.address}
                        />
                    </WithNewStyles>
                </Row>

                <Row offset="large">
                    <Button block={true} view="primary" onClick={() => formik.resetForm()}>
                        Сбросить
                    </Button>

                    <Button block={true} view="secondary" type="submit">
                        Показать ошибки
                    </Button>
                </Row>
            </form>
        </div>
    );
}
