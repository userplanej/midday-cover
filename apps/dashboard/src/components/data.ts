

export interface Order {
  id: string;
  name: string;
  orderedAt: string;
  image: string;
}

export const ORDERS: Order[] = [
  {
    id: "412093",
    name: "Apple Watch Ultra 2",
    orderedAt: "2024-08-26",
    image: "watch.png",
  },
  {
    id: "539182",
    name: "Apple TV",
    orderedAt: "2024-08-25",
    image: "tv.png",
  },
  {
    id: "281958",
    name: "Apple iPhone 14 Pro",
    orderedAt: "2024-08-24",
    image: "iphone.png",
  },
];

export interface TrackingInformation {
  orderId: string;
  progress: "출고가 완료되었습니다" | "배송중 입니다" | "배송이 완료되었습니다";
  description: string;
}

export const TRACKING_INFORMATION : TrackingInformation []= [
  {
    orderId: "412093",
    progress: "출고가 완료되었습니다",
    description: "마지막 업데이트 오늘 오후 4:31",
  },
  {
    orderId: "281958",
    progress: "배송중 입니다",
    description: "예상 도착시각 오늘 오후 5:45",
  },
  {
    orderId: "539182",
    progress: "배송이 완료되었습니다",
    description: "현관문 앞 오늘 오후 3:16",
  },
];

export const getOrders = () => {
  return ORDERS;
};

export const getTrackingInformation = ({ orderId }: { orderId: string }) => {
  return TRACKING_INFORMATION.find((info) => info.orderId === orderId);
};

export const getAllTrackingInformation = () => {
  return TRACKING_INFORMATION;
};

export type Usage = { day: string; amount: number; clean: number };

interface Usages {
  water: Array<Usage>;
  gas: Array<Usage>;
  electricity: Array<Usage>;
}

function generateUsages(startDay: number, days: number): Usages {
  const generateUsage = (
    day: number,
    min: number,
    max: number,
    cleanPercentage: number = 0,
  ): Usage => {
    const amount = Number((Math.random() * (max - min) + min).toFixed(1));
    return {
      day: String(day),
      amount,
      clean: Number((amount * cleanPercentage).toFixed(1)),
    };
  };

  const generateSequence = (start: number, count: number) => {
    return Array.from({ length: count }, (_, i) => {
      let day = start + i;
      if (day > 31) day -= 31;
      return day;
    });
  };

  const sequence = generateSequence(startDay, days);

  return {
    water: sequence.map((day) => generateUsage(day, 30, 165)),
    gas: sequence.map((day) => generateUsage(day, 1, 6)),
    electricity: sequence.map((day) => generateUsage(day, 20, 55, 0.55)),
  };
}

export const USAGES: Usages = generateUsages(23, 14);
