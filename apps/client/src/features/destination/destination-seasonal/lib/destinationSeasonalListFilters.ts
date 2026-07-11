import AutumnIcon from '@/assets/icons/seasons/autumn.svg';
import SpringIcon from '@/assets/icons/seasons/spring.svg';
import SummerIcon from '@/assets/icons/seasons/summer.svg';
import WinterIcon from '@/assets/icons/seasons/winter.svg';
import { v4 as uuidv4 } from 'uuid';
import { SeasonEnum } from '@/enums/season';

export const destinationSeasonalListFilters = [
  {
    id: uuidv4(),
    Icon: SpringIcon,
    title: 'Spring Picks',
    value: SeasonEnum.SPRING,
  },
  {
    id: uuidv4(),
    Icon: SummerIcon,
    title: 'Summer Hotspot',
    value: SeasonEnum.SUMMER,
  },
  {
    id: uuidv4(),
    Icon: AutumnIcon,
    title: 'Autumn Escape',
    value: SeasonEnum.AUTUMN,
  },
  {
    id: uuidv4(),
    Icon: WinterIcon,
    title: 'Winter Getaway',
    value: SeasonEnum.WINTER,
  },
];
