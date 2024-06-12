import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import img from "../../assets/image/1.jpg"; // استبدل الصورة بصورة عن صحة الطفل
import img1 from "../../assets/image/2.webp"; // استبدل الصورة بصورة عن اللعب والنشاط
import img2 from "../../assets/image/3.jpg"; // استبدل الصورة بصورة عن النوم والتغذية
import "./Slider.css";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={img} alt="صحة الطفل" className="slider-img" />  {/* إضافة نص بديل للوصول */}
        <Carousel.Caption>
          <h3>صحة الطفل هي مسؤولية الجميع</h3>  {/* عنوان عن صحة الطفل */}
          <p>
            العناية بصحة الطفل تتطلب رعاية طبية منتظمة وتغذية مناسبة ونشاطًا بدنيًا كافيًا
          </p>  {/* وصف عن صحة الطفل */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img1} alt="اللعب والنشاط" className="slider-img" />  {/* إضافة نص بديل للوصول */}
        <Carousel.Caption>
          <h3>اللعب والنشاط ضروريان لنمو الطفل</h3>  {/* عنوان عن اللعب والنشاط */}
          <p>
            شجع أطفالك على اللعب والنشاط البدني لتحفيز نموهم الجسدي والعقلي
          </p>  {/* وصف عن اللعب والنشاط */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img2} alt="النوم والتغذية" className="slider-img" />  {/* إضافة نص بديل للوصول */}
        <Carousel.Caption>
          <h3>النوم والتغذية الصحية ضروريان لصحة الطفل</h3>  {/* عنوان عن النوم والتغذية */}
          <p>
            تأكد من حصول أطفالك على قسط كافٍ من النوم وتقديم وجبات غذائية متوازنة 
            لتعزيز نموهم وتطورهم
          </p>  {/* وصف عن النوم والتغذية */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
