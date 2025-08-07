import Header from "./components/Header";
import Objective from "./components/Objective";
import ResumeButton from "./components/ResumeButton";
import Experience from "./components/Experience";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <Header />
        <main id="content" className="lg:w-[52%] mt-24 flex flex-col items-start">
          <section id='about' className='mb-16 scroll-mt-16 lg:scroll-mt-24'>

            <Objective />
          </section>
          <section id='Experiences' className='mt-12'>

            <Experience />
            <Experience />
            <Experience />
            <Experience />

          </section>
          <ResumeButton />
        </main>
      </div>
    </div>
  );
}
