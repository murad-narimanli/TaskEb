import { Draggable } from "react-beautiful-dnd";
import { LoremIpsum } from "lorem-ipsum";
// import { generateFromString } from "generate-avatar";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import {Button, Popconfirm , Tooltip} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import Permission from "../../Elements/Permission";
import {connect} from "react-redux";
import {getTasks, notify, setVisibleAddModal} from "../../../redux/actions";
import admin from "../../../const/api";
import moment from "moment";


const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;


const ListItem = ({ item, index , setVisibleAddModal , notify , getTasks }) => {
    const { t } = useTranslation();

    const deleteTask = (id) => {
        admin.delete(`tasks/${id}`).then(() => {
            notify('Deleted' , true)
            getTasks()
        })
    }


    return (
        <Draggable draggableId={item.ids} index={index}>
            {(provided, snapshot) => {
                return (
                    <DragItem
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <CardHeader>{item.title}</CardHeader>
                        <span>{item.description}</span>
                        <span>DeadLine {moment(item.expireDate).format('DD.MM.YYYY')}</span>
                        <CardFooter>
                            <span>Task id - {item.id}</span>
                            <Author>
                                <div className="flex flex-end">
                                    <Permission type={'editTask'}>
                                        <Tooltip className="ml-5" title={t("edit")} placement="topRight">
                                            <Button onClick={() =>{setVisibleAddModal(true , item.id , item)}}  className="border-none" type="text" shape="circle">
                                                <EditFilled />
                                            </Button>
                                        </Tooltip>
                                    </Permission>
                                    <Permission type={'deleteTask'}>
                                        <Popconfirm
                                            placement="right"
                                            title={t("areYouSure")}
                                            onConfirm={() => deleteTask(item.id)}
                                            okText={'Yes'}
                                            cancelText={'No'}
                                        >
                                            <Tooltip className="ml-5" title={'Delete'}>
                                                <Button className="border-none" type="text" shape="circle">
                                                    <DeleteFilled />
                                                </Button>
                                            </Tooltip>
                                        </Popconfirm>
                                    </Permission>
                                </div>
                                {/*<Avatar*/}
                                {/*    src={`data:image/svg+xml;utf8,${generateFromString(item.id)}`}*/}
                                {/*/>*/}
                            </Author>
                        </CardFooter>
                    </DragItem>
                );
            }}
        </Draggable>
    );
};



const mapStateToProps = ({ modalData }) => {
    return {
        modalData
    };
};

export default connect(mapStateToProps, { notify , setVisibleAddModal , getTasks })(ListItem);

