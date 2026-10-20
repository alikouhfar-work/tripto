import { DestinationSeasonal } from '@/features/destination/destination-seasonal';
import { DestinationWeekend } from '@/features/destination/destination-weekend';
import { Promos } from '@/features/home/promos/components/Promos';
import { DestinationPopular } from '@/features/destination';
import { Activity } from '@/features/activity';
import { Hero, WhyTripto } from '@/features/home';
import { VibeMatcher } from '@/features/home/vibe-matcher/components/VibeMatcher';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <main
        id="listings-container"
        className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <WhyTripto />
        <DestinationSeasonal />
        <DestinationWeekend />
        <Promos />
        <DestinationPopular />
        <VibeMatcher />
        <Activity />
      </main>
    </div>
  );
};

export default HomePage;
