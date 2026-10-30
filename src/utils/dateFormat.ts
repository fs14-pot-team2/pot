type DateFormatStyle = "dots" | "hyphen" | "korean";

type DateParts = {
  year: string;
  month: string;
  day: string;
  weekday: string;
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function renderDate(parts: DateParts, style: DateFormatStyle): string {
  const { year, month, day, weekday } = parts;

  if (style === "dots") {
    return `${year}.${month}.${day}`;
  }

  if (style === "hyphen") {
    return `${year}-${month}-${day}`;
  }

  return `${year}년 ${month}월 ${day}일 (${weekday})`;
}

export function formatDateOnly(value: string, style: DateFormatStyle = "dots"): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error("날짜는 YYYY-MM-DD 형식이어야 합니다.");
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error("존재하지 않는 날짜입니다.");
  }

  return renderDate(
    {
      year: value.slice(0, 4),
      month: value.slice(5, 7),
      day: value.slice(8, 10),
      weekday: WEEKDAYS[date.getUTCDay()],
    },
    style,
  );
}

export function formatDateTimeKst(value: string, style: DateFormatStyle = "dots"): string {
  if (!/(Z|[+-]\d{2}:\d{2})$/i.test(value)) {
    throw new Error("시간대가 포함된 날짜·시간이 필요합니다.");
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("올바르지 않은 날짜·시간입니다.");
  }

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const parts = formatter.formatToParts(date);

  const getPart = (type: "year" | "month" | "day" | "weekday"): string => {
    const part = parts.find((item) => item.type === type);

    if (!part) {
      throw new Error("날짜 정보를 가져오지 못했습니다.");
    }

    return part.value;
  };

  return renderDate(
    {
      year: getPart("year"),
      month: getPart("month"),
      day: getPart("day"),
      weekday: getPart("weekday"),
    },
    style,
  );
}

export function formatRelativeTime(value: string, now: Date = new Date()): string {
  if (!/(Z|[+-]\d{2}:\d{2})$/i.test(value)) {
    throw new Error("시간대가 포함된 날짜·시간이 필요합니다.");
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime()) || Number.isNaN(now.getTime())) {
    throw new Error("올바르지 않은 날짜·시간입니다.");
  }

  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) {
    return "방금";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffHours / 24);

  return `${diffDays}일 전`;
}
