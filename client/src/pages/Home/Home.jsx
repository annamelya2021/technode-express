import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";






const Home = () => {
    return (
        <div>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 1
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 1
                    },
                }}
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                <div><img src="https://source.unsplash.com/random?1" alt="1" /></div>
                <div><img src="https://source.unsplash.com/random?2" alt="2" /></div>
                <div><img src="https://source.unsplash.com/random?3" alt="3" /></div>
                <div><img src="https://source.unsplash.com/random?4" alt="4" /></div>
                <div><img src="https://source.unsplash.com/random?5" alt="5" /></div>
                <div><img src="https://source.unsplash.com/random?6" alt="6" /></div>

            </Carousel>
        </div>
    );
};

export default Home;