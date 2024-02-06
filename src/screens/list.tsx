import { Button, Col, Modal, Row, Table } from "antd";
import React from "react";
import bookService from "../service/bookService";
import { CreateBook } from "./book/create";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


export function ListScreen(){

    const [data, setData] = React.useState<any[]>([]); 
    const [loading, setLoading] = React.useState(true);
    const [current, setCurrent] = React.useState<any>({});
    const [open, setOpen] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    async function getAllBooks(){
        await bookService.getByKey(``).then(response=>{
            setData(response.data);
        }).catch((reason)=>{
            console.log("RR",reason);
        })
        setLoading(false)
    }
    
    const onInit = React.useCallback(async()=>{
        await getAllBooks();
    },[]);

    React.useEffect(()=>{
        onInit();
    },[])

    function handleDelete(item:any){
        setVisible(true);
        Modal.confirm({
            title:"Suppression de livre",
            open:visible,
            content:(
                <div>
                    Voules-vous supprimer le livre <strong>{item.title}</strong> ?
                </div>
            ),
            okText:"Oui",
            cancelText:"Non",
            onOk:()=>onDelete(item.id)
        })
    }

    async function onDelete(id:any){
        setLoading(true);
        await bookService.destroy(id).then(async()=>{
            await getAllBooks();
        }).catch(()=>{

        })
        setVisible(false);
        setLoading(false);
    }

    function handleClose(){
        setOpen(false);
    }

    function handleUpdate(item:any){
        setCurrent(item);
        setOpen(true);
    }

    return(
        <main style={{padding:10}}>
            <div>
                <CreateBook onReload={getAllBooks} />
            </div>

            <Table 
                dataSource={data}
                loading={loading}
                columns={[
                    {title:"Book title",dataIndex:"title"},
                    {title:"Category",dataIndex:"category"},
                    {title:"Summary",dataIndex:"summary"},
                    {render(value, record, index) {
                        return(
                            <Row gutter={8}>
                                <Col>
                                <Button onClick={()=>handleUpdate(value)} type="primary" title="Edit book" shape="circle">
                                    <EditOutlined />
                                </Button>
                                </Col>
                                <Col>
                                <Button onClick={()=>handleDelete(value)} danger title="Remove book" shape="circle">
                                    <DeleteOutlined />
                                </Button>
                                </Col>
                            </Row>
                        )
                    },}
                ]}
            />
            <CreateBook onReload={getAllBooks} edit current={current} setVisible={setOpen} visible={open} />
        </main>
    )
}