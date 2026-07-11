import { DestinationSeasonal, DestinationWeekend, Hero, WhyTripto } from '@/features/home';

const HomePage = () => {
  return (
    <>
      <Hero />
      <article className="flex flex-col items-center gap-24 py-10 pt-18">
        <WhyTripto />
        <DestinationSeasonal />
        <DestinationWeekend />
        {/* <DestinationOffers /> */}
        {/* <DestinationSights /> */}
        {/*<ActivityList />*/}
        {/* <DestinationExplore /> */}
      </article>
    </>
  );
};

export default HomePage;
