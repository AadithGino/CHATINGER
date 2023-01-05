import React from "react";
import "./GroupInfo.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { changeGroupName } from "../../API/ChatApiCalls";
import { setCurrentChat, userHome } from "../../Redux/Actions/UserActions/UserHomeAction";
const GroupInfo = ({ members, chat, currentuser }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editName, setEditName] = useState(false);
  const [name,setName] =useState('')
  console.log(chat);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleChangeName = ()=>{
    changeGroupName(name,chat._id).then((data)=>{
      console.log(data);
      dispatch(setCurrentChat(data.data))
      dispatch(userHome())
      
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
      <i onClick={onOpen} class="fa-solid fa-circle-info"></i>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Group Info </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Group Name : {chat.chatName}{" "}
                {chat.groupAdmin === currentuser ? (
                  <i
                    onClick={() => setEditName(!editName)}
                    class="fa-solid fa-pen"
                  ></i>
                ) : (
                  ""
                )}{" "}
              </FormLabel>
              {editName ? (
                <Input onChange={(e)=>{setName(e.target.value)}} ref={initialRef} placeholder="New Group Name..." />
              ) : (
                ""
              )}
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            {chat.groupAdmin === currentuser ? (
              <Button onClick={handleChangeName} colorScheme="blue" mr={3}>
                Save
              </Button>
            ) : (
              ""
            )}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupInfo;
