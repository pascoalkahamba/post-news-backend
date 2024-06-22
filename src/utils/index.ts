const REGEXEMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const MILLISECONDSINTHREEMONTHS = 78900480000;

const dynamicCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export { REGEXEMAIL, MILLISECONDSINTHREEMONTHS, dynamicCode };
