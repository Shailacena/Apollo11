import { Typography } from "antd";
import { useEffect, useState } from "react";
import { getDataFormat } from "../Utils/Tool";


const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getDataFormat(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getDataFormat(new Date());
    }, 1000);

    // 清除间隔，以防内存泄漏
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography.Text>{currentTime}</Typography.Text>
  );
};

