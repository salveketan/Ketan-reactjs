import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
// require('dotenv').config()

import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}


export default function Product() {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [item, setItem] = useState(getLocalItmes())

    const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` }
    };
    useEffect(() => {
        axios.get(`https://upayments-studycase-api.herokuapp.com/api/products/${id}`, config)
            .then((r) => {
                setData(r.data.product)
            }).catch((e) => {
                console.log(e);
            })
    }, [])


    const AddFavorite = (e) => {
        setItem([...item, e])
    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(item))
    }, [item]);

    return (
        <div>

            <Container maxW={'7xl'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 24 }}>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={data.avatar}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                {data.name}
                            </Heading>
                            <Text
                                color={useColorModeValue('gray.900', 'gray.400')}
                                fontWeight={300}
                                fontSize={'2xl'}>
                                ${data.price} USD
                            </Text>
                        </Box>

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                />
                            }>
                            <VStack spacing={{ base: 4, sm: 6 }}>
                                <Text
                                    color={useColorModeValue('gray.500', 'gray.400')}
                                    fontSize={'2xl'}
                                    fontWeight={'300'}>
                                    {data.description}
                                </Text>
                                <Text fontSize={'lg'} color={useColorModeValue('gray.500', 'gray.400')}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                                    aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                                    maxime modi nam officiis porro, quae, quisquam quos
                                    reprehenderit velit? Natus, totam.
                                </Text>
                            </VStack>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Features
                                </Text>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                    <List spacing={2}>
                                        <ListItem>{data.category}</ListItem>
                                    </List>
                                </SimpleGrid>
                            </Box>

                        </Stack>

                        <Button
                            rounded={'none'}
                            w={'full'}
                            mt={8}
                            size={'lg'}
                            py={'7'}
                            bg={useColorModeValue('gray.900', 'gray.50')}
                            color={useColorModeValue('white', 'gray.900')}
                            textTransform={'uppercase'}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}
                            onClick={() => AddFavorite(data)}
                        >
                            Add to Favorite
                        </Button>

                        <Stack direction="row" alignItems="center" justifyContent={'center'}>
                            <MdLocalShipping />
                            <Text>2-3 business days delivery</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </div>
    );
}