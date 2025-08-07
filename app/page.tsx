import Header from "./components/Header";
import Objective from "./components/Objective";
import Project from "./components/Project";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <Header />
        <main id="content" className="lg:w-[52%] mt-24">
        <section id='about' className='mb-32 scroll-mt-16 lg:scroll-mt-24'>

          <Objective />
          </section>
          <section id='projects' className='mb-16'>

            <Project />
            <Project />
            <Project />
            <Project />

          </section>
        </main>
      </div>
    </div>
  );
}
