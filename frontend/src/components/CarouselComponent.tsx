import { Carousel } from 'react-bootstrap';
import { DefaultCard } from './DefaultCard';

interface Props {
    objects: any[];
}

const CarouselComponent = ({ objects }: Props) => {
    const chunkArray = (arr: any[], chunkSize: number) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArr.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArr;
    };

    const chunks = chunkArray(objects, 3); // Divide el array en chunks de 2 objetos cada uno

    return (
        <Carousel controls={false} indicators={false}>
            {chunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                    <div className="d-flex justify-content-around gap-3">
                        {chunk.map((object, i) => (
                            <div key={i}>
                                {('title' in object && 'description' in object) ? (
                                    <DefaultCard title={object.title} img={object.image} />
                                ) : (
                                    <DefaultCard title={`${object.name} ${object.lastname}`} img={object.image} />
                                )}
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
