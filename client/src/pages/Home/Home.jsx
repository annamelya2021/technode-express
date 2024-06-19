import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import "../Root.css";





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
                <div><img src="https://m.media-amazon.com/images/I/716n8eAia+L._AC_UF894,1000_QL80_.jpg?1" alt="1" /></div>
                <div><img src="https://m.media-amazon.com/images/I/81biZOciQ3L._AC_UF894,1000_QL80_.jpg?2" alt="2" /></div>
                <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy8u5ZbHrEpPqs2kZGDbbXJ15gMlhs1x07dA&s?3" alt="3" /></div>
                <div><img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4R213?ver=4eb0&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true?4" alt="4" /></div>
                <div><img src="https://ae01.alicdn.com/kf/Sd30858232f4d476eb52392dd06ef8232F.png?5" alt="5" /></div>
                <div><img src="https://thumb.pccomponentes.com/w-530-530/articles/1066/10660888/5869-lenovo-thinkpad-x1-carbon-gen-10-intel-core-i7-1260p-16gb-512gb-ssd-14-caracteristicas.jpg?6" alt="6" /></div>

            </Carousel>
        </div>
    );
};

export default Home;