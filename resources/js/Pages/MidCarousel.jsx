import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../Components/CarouselImage';

export default function MidCarousel(props){
    return (
        <>
         <Carousel className="d-flex justify-content-center">
                <Carousel.Item>
                    <CarouselImage text="work1" image="" /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work2" image="" />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work3" image="" /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work4" image="" />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage text="work5" image="" /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work6" image="" />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage text="work7" image="" /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work8" image="" />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>	
                <Carousel.Item>
                    <CarouselImage text="work9" image="" /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work10" image="" />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>															
            </Carousel>			
        </>
           
    );
}