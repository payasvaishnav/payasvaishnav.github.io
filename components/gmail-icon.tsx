import type { IconType } from "react-icons";

/** The multicolour Gmail mark, drawn inline so every colour stays crisp. */
const GmailIcon: IconType = ({ size = 16, ...props }) => (
  <svg
    viewBox="0 0 24 21"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1.636 20.727h3.637V11.9L0 7.945v11.146c0 .904.733 1.636 1.636 1.636Z" fill="#4285F4" />
    <path d="M18.727 20.727h3.637c.904 0 1.636-.732 1.636-1.636V7.945L18.727 11.9v8.827Z" fill="#34A853" />
    <path d="M18.727 4.936V11.9L24 7.945v-2.19c0-2.021-2.309-3.174-3.927-1.963l-1.346 1.144Z" fill="#FBBC04" />
    <path d="M5.273 11.9V4.936L12 9.982l6.727-5.046V11.9L12 16.945 5.273 11.9Z" fill="#EA4335" />
    <path d="M0 5.755v2.19L5.273 11.9V4.936L3.927 3.792C2.309 2.581 0 3.734 0 5.755Z" fill="#C5221F" />
  </svg>
);

export default GmailIcon;
