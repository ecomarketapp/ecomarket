import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export function dateFromNow(date) {
  if (!date) return ;
//   return dayjs(date).format('D : MMM : YY, HH:mm:ss ');
//   return dayjs(date).format('D : MMM : YY, HH:mm:ss ');
  return dayjs(date).fromNow(true);
}


export function dateExpire(date) {
  if (!date) return;
//   return dayjs(date).format('D : MMM : YY, HH:mm:ss ');
  return dayjs(date).format('DD/MM/YYYY');
//   return dayjs(date).fromNow(true);
}