'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import styled from '@emotion/styled'

const Line = styled('div')({
    width:'100%',
    height:'1px',
    backgroundColor:'#A1A3A8'
})

const Container =styled("div")({
    display:'flex',
    position:'relative',
    alignItems:'center',
    margin:'1rem 0',
});

const H6 = styled('h6')({
    position:'absolute',
    backgroundColor:'#fff',
    padding:"0 .5rem",
    fontSize:'.875rem',
    fontWeight:'bold'
})

const Title = ({color="#fff" ,titleValue , position , className}) => {
    const passName = usePathname()
    return (
        <>
        {position === `head` ? (
            <div className={`${passName === "/address" || passName === "/payment" || passName == '/dashboard/idinity'  ? "px-0" : "px-4"} w-full  max-with-unique ${className}`}>
                <div className={`h-12 border-b title-custom relative`}>
                    <h1 className={` font-bold relative z-10 pt-2 ${passName === "/address" || passName === "/payment" ? "static mt-0 pr-0" : "relative mt-4 pr-6"}`}>
                        {titleValue}
                    </h1>
                </div>
            </div>
        ) :position === `line` ? (
            <Container>
                <Line></Line>
                <H6>{titleValue}</H6>
            </Container>
        ) :(
            
            <div className={`h-6 w-full flex justify-center items-center mb-3 px-4`} style={{maxWidth:'1358px'}}>
                <div className={`line w-full h-[1px] bg-black flex justify-center items-center relative`}>
                    <h2 className={`absolute px-2 text-sm font-semibold`} style={{backgroundColor:color}}>
                        {titleValue}
                    </h2>
                </div>
            </div>
        )}
        </>
    );
};

export default Title;