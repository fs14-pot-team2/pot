import Image from "next/image";

import styles from "./Tag.module.css";

type TagSize = "sm" | "md";

type CommonTagProps = {
  size?: TagSize;
  className?: string;
};

type CareTagProps = CommonTagProps & {
  variant: "profile" | "request";
  serviceType: "SHORT_CARE" | "REGULAR_CARE";
};

type DesignatedTagProps = CommonTagProps & {
  variant: "designated";
};

type TagProps = CareTagProps | DesignatedTagProps;

const careTagContent = {
  SHORT_CARE: {
    label: "잠깐만 돌봄",
    icon: "/icons/ic_care_short.svg",
  },
  REGULAR_CARE: {
    label: "꾸준히 돌봄",
    icon: "/icons/ic_care_regular.svg",
  },
} as const;

const designatedTagContent = {
  label: "지정 견적 요청",
  icon: "/icons/ic_designated_request.svg",
} as const;

export default function Tag(props: TagProps) {
  const size = props.size ?? "sm";

  const content =
    props.variant === "designated" ? designatedTagContent : careTagContent[props.serviceType];

  const isRequestRegular = props.variant === "request" && props.serviceType === "REGULAR_CARE";

  const isShortCare = props.variant !== "designated" && props.serviceType === "SHORT_CARE";

  const iconClassName = [
    styles.icon,
    isShortCare ? styles.shortIcon : "",
    isRequestRegular ? styles.unfilteredIcon : "",
  ]
    .filter(Boolean)
    .join(" ");

  const icon = isRequestRegular ? "/icons/ic_care_regular_request.svg" : content.icon;

  const tagClassName = [styles.tag, styles[props.variant], styles[size], props.className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={tagClassName}>
      <Image className={iconClassName} src={icon} alt="" width={24} height={24} />
      <span>{content.label}</span>
    </span>
  );
}
