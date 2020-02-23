export const emailValidator = email => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return false;

  return true;
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return false;

  return true;
};
