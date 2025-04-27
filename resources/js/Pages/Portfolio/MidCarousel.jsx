import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselImage from '../../Components/CarouselImage';
import worksImg from '../../../images/worksImg.jpg';
import mechEngImage2 from '../../../images/mechEngImage.jpg';
import engImg from '../../../images/engImg.jpg';
import topLabel from '../../../images/topLabel.jpg';
import compSciImage from '../../../images/compSciImage.jpg';
import mathhonorimg from '../../../images/mathhonorimg.jpg';
import procprojengimg from '../../../images/procprojengimg.jpg';
import techWriter from '../../../images/techWriter.jpg';
import dataanalysis from '../../../images/dataanalysis.jpg';
import websiteconstruction from '../../../images/websiteconstruction.jpg';

export default function MidCarousel(props){

  
    return (
        <>
         <Carousel id="midCarousel" className="d-flex justify-content-center mid-carousel">
                <Carousel.Item>
                    <CarouselImage text="work1" image={worksImg} /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work2" image={mechEngImage2} />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work3" image={engImg} /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work4" image={topLabel} />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage text="work5" image={compSciImage}/> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work6" image={mathhonorimg} />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage text="work7" image={procprojengimg} /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work8" image={techWriter} />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>	
                <Carousel.Item>
                    <CarouselImage text="work9" image={dataanalysis} /> 
                    <Carousel.Caption></Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <CarouselImage text="work10" image={websiteconstruction} />
                    <Carousel.Caption></Carousel.Caption>                               
                </Carousel.Item>															
            </Carousel>			
        </>
           
    );
}