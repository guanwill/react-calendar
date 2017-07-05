import moment from 'moment'; //'moment' is name of package defined in package.json

export const formatDate = function(d) {
  return(d ? moment(d).format('MMMM DD YYYY, h:mm:ss a') : '');
};
