import { useCookies } from "react-cookie";

export const getRandomNumber = (start: number, end: number) => {
  return Math.floor(Math.random() * end) + start;
}

export const getDataFormat = (date: Date) => {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
}

export const getCookieByDocument = (name: string) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookies ? cookies.split("=")[1] : null;
};

export const setCookieByDocument = (name: string, value: string, days = 1) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};

const getRandomPaths = () => {
  if (document.cookie) {
    let pathstr = getCookieByDocument('paths');
    if (pathstr) {
      let paths: string[] = pathstr.split(",");
      console.log('iccccc paths', paths)
      return paths;
    }
  }
  const paths = [];
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
    let length = getRandomNumber(4, 8);
    let result = '';
    if (window.crypto && window.crypto.getRandomValues) {
      const randomValues = new Uint32Array(length);
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        result += characters[randomValues[i] % charactersLength];
      }
    } else {
      // 使用 Math.random() 函数作为备选方法
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
      }
    }
    paths.push(result)
  }
  setCookieByDocument('paths', paths.toString());
  return paths;
}

export const randomPaths = getRandomPaths();

