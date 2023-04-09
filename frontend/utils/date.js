import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat)

export function dateFromNow(date) {
  if (!date) return ;
//   return dayjs(date).format('D : MMM : YY, HH:mm:ss ');
//   return dayjs(date).format('D : MMM : YY, HH:mm:ss ');
  return dayjs(date).fromNow(true);
}


export function dateFormat(date) {
  if (!date) return;
//   return dayjs(date).format('D : MMM : YY, HH:mm:ss ');
  return dayjs(date).format('DD/MM/YYYY');
//   return dayjs(date).fromNow(true);
}

export function dateTimeFormat(date) {
  if (!date) return;
  return dayjs(date).format('LT');
}