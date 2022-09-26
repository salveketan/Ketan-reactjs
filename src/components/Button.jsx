import React, { useState } from 'react'
import {
    Button, useDisclosure, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Stack,
    FormLabel,
    InputGroup,
    InputLeftAddon,
    Input,
    InputRightAddon,
    Select,
    Textarea,
} from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import axios from 'axios'

export default function ButtonAll() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [data, setData] = useState({
        Name: "", Price: "", Category: "", Description: "", Avatar: "", DeveloperEmail: ""
    })


    let name, value
    const handle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` }
    };

    const Submit = (e) => {
        e.preventDefault();
        axios.post("https://upayments-studycase-api.herokuapp.com/api/products", data, config).then((r) => {
            console.log(r);
        }).catch((e) => {
            alert(e)
            console.log(e);
        })
    }
    
    return (
        <>
            <Button colorScheme='teal' variant='outline' leftIcon={<AddIcon />} onClick={onOpen}>
                Add Product
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Create a new product
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                    ref={firstField}
                                    id='name'
                                    placeholder='Please enter product name'
                                    value={data.Name}
                                    name="Name"
                                    onChange={handle}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='url'>Url</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>http://</InputLeftAddon>
                                    <Input
                                        type='url'
                                        id='url'
                                        placeholder='Please enter url'
                                        value={data.Avatar}
                                        name="Avatar"
                                        onChange={handle}
                                    />
                                    <InputRightAddon>.com</InputRightAddon>
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='owner'>Select Category</FormLabel>
                                <Select id='owner' name="Category" onChange={handle}>
                                    <option value='clothing'>Clothing</option>
                                    <option value='electronics'>Electronics</option>
                                    <option value='accessories'>Accessories</option>
                                    <option value='furniture'>Furniture</option>
                                    <option value='hobby'>Hobby</option>
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='desc'>Description</FormLabel>
                                <Textarea id='desc' value={data.Description} name="Description" onChange={handle} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='price'>Price</FormLabel>
                                <Input
                                    type="Number"
                                    ref={firstField}
                                    id='price'
                                    placeholder='enter price'
                                    value={data.Price}
                                    name="Price"
                                    onChange={handle}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                    ref={firstField}
                                    id='email'
                                    placeholder='Please enter register email'
                                    value={data.DeveloperEmail}
                                    name="DeveloperEmail"
                                    onChange={handle}
                                />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={Submit}>Submit</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

