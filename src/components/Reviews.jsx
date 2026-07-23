import TestimonialCarousel from "./TestimonialCarousel";

export default function Reviews() {
  return (
    <div id="reviews" className="mt-16 flex w-full flex-col items-center gap-8 sm:mt-[100px] sm:gap-12 md:mt-[100px] lg:mt-[160px]">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-5 px-4 text-center sm:gap-8 sm:px-6">
        <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] sm:text-[36px] lg:text-[48px]">What people say about DeoVR</span>
        <span className="text-sm font-normal text-[rgb(63,78,100)] md:text-base">Nothing says more than a happy users</span>
      </div>

      <TestimonialCarousel />
    </div>
  );
}
