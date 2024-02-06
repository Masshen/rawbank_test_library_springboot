import { Button, Col, Divider, Drawer, Row } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as yup from 'yup';
import { DillInput, DillTextarea } from "../../components/input";
import bookService from "../../service/bookService";
import { isEmpty } from "lodash";


export function CreateBook(props: {
    edit?: boolean; onReload: () => void;
    current?: any;
    visible?: boolean; setVisible?: (v: boolean) => void;
}) {

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            summary: "",
            category: "",
        },
        onSubmit,
        validationSchema: yup.object({
            title: yup.string().required("Champ requis"),
            summary: yup.string().required("Champ requis"),
            category: yup.string(),
        })
    });

    const onInitItem = React.useCallback(() => {
        if (!isEmpty(props.current) && props.edit) {
            const item = props.current;
            formik.setValues({
                category: item.category ?? "",
                title: item?.title ?? "",
                summary: item?.summary ?? "",
            })
        }
    }, [props.current]);

    React.useEffect(() => {
        onInitItem();
    }, [props.current])

    async function onSubmit() {
        const { category, summary, title } = formik.values;
        const data: any = { category, summary, title };
        setLoading(true);
        if (props.edit) {
            const id = props?.current?.id ?? 0;
            await bookService.update(id,data).then(async () => {
                await props.onReload();
                handleClose();
                formik.resetForm();
            }).catch(() => {

            })
        } else {
            await bookService.store(data).then(async () => {
                await props.onReload();
                handleClose();
                formik.resetForm();
            }).catch(() => {

            })
        }
        setLoading(false);
    }

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        if (typeof props.setVisible === "function") {
            props.setVisible(false);
        }
    }

    function handleSubmit() {
        formik.handleSubmit();
    }

    return (
        <>
            {!props.edit && (<Button onClick={handleOpen}>
                {`Add a new book`}
            </Button>)}

            <Drawer onClose={handleClose} open={!props.edit ? open : props.visible} placement="right" title={props.edit ? "Update the book" : "Add a new book"}>
                <DillInput formik={formik} name="title" placeholder="" label="Book title" />
                <DillInput formik={formik} name="category" placeholder="" label="Book categorye" />
                <DillTextarea formik={formik} name="summary" placeholder="" label="The book summary" />
                <Divider />
                <Row gutter={8}>
                    <Col>
                        <Button onClick={handleClose} type="default">
                            {`Cancel`}
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={handleSubmit} type="primary">
                            {props.edit ? "Edit" : `Save`}
                        </Button>
                    </Col>
                </Row>
            </Drawer>

        </>
    )
}