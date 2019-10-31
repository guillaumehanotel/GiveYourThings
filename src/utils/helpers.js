import moment from 'moment/min/moment-with-locales';

export function formatAdDate(ad) {
  moment.locale('fr');
  const adDate = moment(ad.created_at).fromNow(true);
  const time = adDate.split(' ')[0];
  const unit = adDate.split(' ')[1];
  switch (unit) {
    case 'quelques secondes':
    case 'secondes':
    case 'minute':
      return '1min';
    case 'minutes':
      return time + ' min.';
    case 'heure':
    case 'heures':
      return time + 'h';
    case 'jour':
    case 'jours':
      return time + 'j';
    default:
      return time + " " + unit;
  }
}
