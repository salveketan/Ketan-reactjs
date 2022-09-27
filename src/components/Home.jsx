import { Box, Button, CircularProgress, Divider, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Await, Link } from "react-router-dom";
import {
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux'
import { fetchProductData } from './Redux/action'
// import Product from './Product'
const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    // console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}


const Home = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const color = useColorModeValue('white', 'gray.800')
    const [select, setSelect] = useState("");
    const [item, setItem] = useState(getLocalItmes())
    const [search, setSearch] = useState("");
    // console.log(data);
    const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` }
    };

    useEffect(() => {
        setLoading(true)
        AllCategory();
        AllProduct(search);
        // dispatch(fetchProductData())
    }, [search])



    const AllProduct = (search) => {
        axios.get("https://upayments-studycase-api.herokuapp.com/api/products", config)
            .then((response) => {
                var array = response.data.products;
                var array = array.filter((e) =>
                    e.category.toLowerCase().includes(search.toLowerCase()))
                setLoading(false)
                setData(array)
            })
            .catch((e) => {
                console.log(e);
            })
    }

    // console.log("ketan", data);

    const AllCategory = () => {
        axios.get(`https://upayments-studycase-api.herokuapp.com/api/categories/`, config)
            .then((r) => {
                setCategory(r.data.categories)
            }).catch((e) => {
                console.log(e);
            })
    }

    const selectCategory = async (e) => {
        setSearch(e)
    }

    const AddFavorite = (e) => {
        setItem([...item, e])
        alert("Item is added to Favorite")
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(item))
    }, [item]);

    return (
        <div>
            <h6>Category's</h6>
            <Box mt={"10px"} marginBottom={"10px"}>
                <SimpleGrid columns={[2, null, 5]} spacing='40px'>
                    {category?.map((e) =>
                        <Button
                            marginLeft="5px"
                            size='md'
                            height='38px'
                            width='150px'
                            border='2px'
                            borderColor="rgb(255,51,153)"
                            onClick={() => selectCategory(e.name)}
                        >
                            {e.name}
                        </Button>
                    )}
                </SimpleGrid>
            </Box>
            {loading ?
                <Box marginLeft={"50%"} marginTop={"10%"}>
                    <CircularProgress isIndeterminate color='green.300' />
                </Box> :
                <Box>
                    <Box bg={"rgb(232,232,227)"} w='100%' p={4} color='white'>
                        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
                            {data?.map((e) =>
                                <Box key={e._id}>
                                    <Box  >
                                        <Center py={12}>
                                            <Box
                                                role={'group'}
                                                p={6}
                                                maxW={'330px'}
                                                w={'full'}
                                                bg={color}
                                                boxShadow={'2xl'}
                                                rounded={'lg'}
                                                pos={'relative'}
                                                zIndex={1}>
                                                <Box
                                                    rounded={'lg'}
                                                    mt={-12}
                                                    pos={'relative'}
                                                    height={'230px'}
                                                    _after={{
                                                        transition: 'all .3s ease',
                                                        content: '""',
                                                        w: 'full',
                                                        h: 'full',
                                                        pos: 'absolute',
                                                        top: 5,
                                                        left: 0,
                                                        backgroundImage: `url(${e.avatar})`,
                                                        filter: 'blur(15px)',
                                                        zIndex: -1,
                                                    }}
                                                    _groupHover={{
                                                        _after: {
                                                            filter: 'blur(20px)',
                                                        },
                                                    }}>
                                                    <Link to={`product/${e._id}`}>
                                                        <Image
                                                            rounded={'lg'}
                                                            height={230}
                                                            width={282}
                                                            objectFit={'cover'}
                                                            src={e.avatar}
                                                        />
                                                    </Link>
                                                </Box>
                                                <Stack pt={10} align={'center'}>
                                                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                                        {e.category}
                                                    </Text>
                                                    <Heading color={"black"} fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                                        <Link to={`product/${e._id}`}>
                                                            {e.name}
                                                        </Link>
                                                    </Heading>
                                                    <Heading color={"black"} fontSize={'xl'} fontFamily={'body'} fontWeight={500} noOfLines={1}>
                                                        <Link to={`product/${e._id}`}>
                                                            {e.description}
                                                        </Link>
                                                    </Heading>
                                                    <Stack direction={'row'} align={'center'}>
                                                        <Text textDecoration={'line-through'} color={'gray.600'}>
                                                            ${e.price + 98}
                                                        </Text>
                                                        <Text color={'gray.600'}>
                                                            ${e.price}
                                                        </Text>
                                                    </Stack>
                                                    <Box display={"flex"} gap="10px">
                                                        <Button color={"black"} onClick={() => AddFavorite(e)}>Add Favorite</Button>
                                                        <Button color={"black"} onClick={() => AddFavorite(e)}>Delete</Button>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </Center>
                                    </Box>
                                </Box>
                            )}
                        </SimpleGrid>
                    </Box>
                </Box>
            }
        </div>
    )
}

export default Home
