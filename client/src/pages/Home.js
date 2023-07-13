import { Button, DrawerOverlay, HStack, Stack, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import './home.css'
import { Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import vg from "../images/1.jpg"


const Home = () => {
    const {isOpen,onOpen,onClose}=useDisclosure()
  return (
    <section className='home'>
        
        <div className='container'>
            <Stack
            direction={["column","row"]}
            height="100%"
            justifyContent={["center","space-between"]}
            alignItems="center"
            spacing={["16","56"]}>
                <VStack width="full" alignItems={['center','flex-end']}>
                    <Heading children="EMIS"/>
                    <Text children="Education Management Information System"></Text>
                    <Link to="/homepage">
                        <Button size={"lg"} colorScheme="yellow">
                            Explore Now
                        </Button>
                    </Link>
                </VStack>
                <Image className='img1' boxSize={"md"} src={vg} objectFit="contain"/>
            </Stack>
            
        </div>

       
    </section>
  )
}

export default Home