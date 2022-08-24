import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DragableElement";
import {getTasks, notify, setVisibleAddModal} from "../../../redux/actions";
import {connect} from "react-redux";

const DragDropContextContainer = styled.div`
  padding: 20px;
  background: white;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;


function DragList({user , tasks , getTasks }) {

    const removeFromList = (list, index) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addToList = (list, index, element) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    };

    const lists = ["todo", "inProgress", "done"];

    const [elements, setElements] = React.useState({});


    const generateLists = (tasks) =>{
        if(tasks?.data?.length >= 0){
            let obj = {}
            lists.forEach(
                (currentValue) => {
                    console.log(currentValue)
                    obj[currentValue] = tasks?.data?.filter((s)=>{
                        return s['status'] === currentValue
                    }).map((d) => {
                        return {
                            ...d,
                            ids: `item-${d.id}`,
                            prefix: d.status,
                        }
                    })
                },
                obj
            );
            setElements(obj)
            console.log(obj)
        }
    }

    useEffect(() => {
        generateLists(tasks)
    }, [tasks]);


     useEffect(() => {
         getTasks()
     }, []);



    const onDragEnd = (result) => {
       if(user.role.changeStatus){
           console.log(result);
           if (!result.destination) {
               return;
           }
           const listCopy = { ...elements };

           const sourceList = listCopy[result.source.droppableId];
           const [removedElement, newSourceList] = removeFromList(
               sourceList,
               result.source.index
           );
           listCopy[result.source.droppableId] = newSourceList;
           const destinationList = listCopy[result.destination.droppableId];
           listCopy[result.destination.droppableId] = addToList(
               destinationList,
               result.destination.index,
               removedElement
           );
           setElements(listCopy);
       }
    };

    return (
        <DragDropContextContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <ListGrid>
                    {lists.map((listKey) => (
                        <DraggableElement
                            elements={elements[listKey]}
                            key={listKey}
                            prefix={listKey}
                        />
                    ))}
                </ListGrid>
            </DragDropContext>
        </DragDropContextContainer>
    );
}


const mapStateToProps = ({ tasks, user}) => {
    return {
        user: user.data,
        tasks:tasks?.data
    };
};

export default connect(mapStateToProps, {  getTasks })(DragList);


