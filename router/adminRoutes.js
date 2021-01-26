import {
  mdiAccount,
  mdiAccountGroup,
  mdiCards,
  mdiChat,
  mdiClipboard,
  mdiClipboardFile,
  mdiFormatFloatNone,
  mdiHome,
  mdiPlus,
  mdiTextBoxMultiple,
} from "@mdi/js";

export const routes = [
  {
    page: "Home",
    url: "/admin/",
    icon: mdiHome,
  },
  {
    page: "Add Items",
    url: "/admin/addItems",
    icon: mdiPlus,
  },
  {
    page: "Complaints",
    url: "/admin/complaints",
    icon: mdiTextBoxMultiple,
  },
  {
    page: "Feedback",
    url: "/admin/feedback",
    icon: mdiCards,
  },
  {
    page: "Privacy",
    url: "/admin/privacy",
    icon: mdiAccountGroup,
  },
];

export const menuOption = [
  {
    page: "Profile",
    url: "/partner/profile",
    icon: mdiAccount,
  },
];
