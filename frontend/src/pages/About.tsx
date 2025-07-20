import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About : React.FC = () => {
  return (
    <div>
      <div className="border-gray-300 text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="w-full md:max-w-[450px]" alt="about img" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptatum facilis et consequatur reiciendis. Perferendis tempora provident at explicabo porro obcaecati asperiores minus reiciendis eveniet eligendi, enim sapiente blanditiis dignissimos facere eum dolore quidem facilis iusto quia dolorum dolores iure? Atque sapiente distinctio totam optio ratione, perferendis cum at est?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel aperiam consectetur nesciunt sapiente harum. Nemo accusantium quas corporis doloribus eaque expedita magni ipsam odio vero adipisci placeat, quae reiciendis incidunt quasi harum aut excepturi unde hic. Expedita praesentium adipisci quibusdam laboriosam ullam doloremque distinctio, sunt inventore, impedit iure minima. Voluptates?</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni inventore itaque totam atque. Quas quisquam dolorem, officia cumque deserunt sint ratione voluptatem dolore laudantium accusantium molestiae omnis dicta culpa maiores impedit! Commodi voluptates, velit laboriosam repudiandae aliquid consequuntur quis iste dolorem delectus iusto obcaecati! Ratione similique quidem rerum nobis doloribus?</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US?" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-6 text-gray-800">
        <div className="rounded-md border border-gray-400 px-10 py-8 sm:py-15 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero ipsam reprehenderit rem et, recusandae consequuntur nesciunt nostrum voluptatum! Repellendus, obcaecati.</p>
        </div>
        <div className="rounded-md border border-gray-400 px-10 py-8 sm:py-15 flex flex-col gap-5">
          <b>Convinience</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero ipsam reprehenderit rem et, recusandae consequuntur nesciunt nostrum voluptatum! Repellendus, obcaecati.</p>
        </div>
        <div className="rounded-md border border-gray-400 px-10 py-8 sm:py-15 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero ipsam reprehenderit rem et, recusandae consequuntur nesciunt nostrum voluptatum! Repellendus, obcaecati.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About;