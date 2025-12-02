"use server";
import Cookies from 'js-cookie';

const deleteCookies = (keys: string[]) => {
  keys.forEach((key) => {
    Cookies.remove(key);
  });
};

export default deleteCookies;
