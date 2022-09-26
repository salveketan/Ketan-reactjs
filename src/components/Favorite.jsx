import { Box, Button, Center, Heading, Image, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    // console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Favorite = () => {
    const color = useColorModeValue('white', 'gray.800')
    const [data, setData] = useState(getLocalItmes())

    const DeleteItem = (i) => {
        const updateditems = data.filter((elem) => {
            return i !== elem._id;
        });
        setData(updateditems);
    }

    console.log(data);
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(data))
    }, [data]);

    return (
        <div>

            <Box w='100%' p={4} color='white'>
                <SimpleGrid columns={[2, null, 3]} spacing='40px'>
                    {data?.map((e) =>
                        <Box >
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
                                            <Image
                                                rounded={'lg'}
                                                height={230}
                                                width={282}
                                                objectFit={'cover'}
                                                src={e.avatar}
                                            />
                                        </Box>
                                        <Stack pt={10} align={'center'}>
                                            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                                {e.category}
                                            </Text>
                                            <Heading color={"black"} fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                                {e.name}
                                            </Heading>
                                            <Heading color={"black"} fontSize={'xl'} fontFamily={'body'} fontWeight={500} noOfLines={1}>
                                                {e.description}
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
                                                <Button color={"black"} onClick={() => DeleteItem(e._id)}>Remove</Button>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Center>
                            </Box>
                        </Box>
                    )}
                </SimpleGrid>
            </Box>
        </div>
    )
}

export default Favorite
