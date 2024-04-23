import { IReminder } from "@/utils/types";
import { useCallback, useRef, useState } from "react";

interface TimeInputProps {
  data: IReminder;
  setData: (data: IReminder) => void;
}

const TimeInput = ({ data, setData }: TimeInputProps) => {
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  const [isTimerOn, setIsTimerOn] = useState<boolean>(data ? true : false);

  const [hour, setHour] = useState<number>(data ? data.hours : 0);
  const [minute, setMinute] = useState<number>(data ? data.minutes : 0);

  const setHourFn = useCallback(
    (hour: number) => {
      let newHour = hour;
      if (hourRef.current) {
        if (newHour > 24) {
          newHour = 24;
          hourRef.current.value = "24";
        }
        if (newHour < new Date().getHours() && newHour !== 0) {
          newHour = new Date().getHours();
          if (newHour < 10) {
            hourRef.current.value = `0${newHour}`;
          } else {
            hourRef.current.value = `${newHour}`;
          }
        }
        if (newHour < 10) {
          hourRef.current.value = `0${newHour}`;
        } else {
          hourRef.current.value = `${newHour}`;
        }
        setHour(newHour);
      }
    },
    []
  );

  const saveData = () => {
    setData({ hours: hour, minutes: minute });
  };

  const setMinuteFn = useCallback(
    (minute: number) => {
      if (minuteRef.current && data) {
        let newMinute = minute;
        if (newMinute > 59) {
          newMinute = 59;
          minuteRef.current.value = "59";
        }
        if (
          newMinute < new Date().getMinutes() &&
          newMinute !== 0 &&
          data.hours <= new Date().getHours()
        ) {
          newMinute = new Date().getMinutes();
          if (newMinute < 10) {
            minuteRef.current.value = `0${newMinute}`;
          } else {
            minuteRef.current.value = `${newMinute}`;
          }
        }
        if (newMinute < 10) {
          minuteRef.current.value = `0${newMinute}`;
        } else {
          minuteRef.current.value = `${newMinute}`;
        }
        setMinute(newMinute);
      }
    },
    [data]
  );

  return (
    <div>
      {isTimerOn ? (
        <div className="flex gap-2">
          <input
            ref={hourRef}
            className="appearance-none w-7 h-5 border border-black text-center"
            placeholder="00"
            maxLength={2}
            defaultValue={hour < 10 ? `0${hour}` : `${hour}`}
            onBlur={(e) => setHourFn(+e.target.value)}
          />
          :
          <input
            ref={minuteRef}
            className="appearance-none w-7 h-5 border border-black text-center"
            placeholder="00"
            maxLength={2}
            defaultValue={minute < 10 ? `0${minute}` : `${minute}`}
            onBlur={(e) => setMinuteFn(+e.target.value)}
          />
          <button
            className="hover:scale-105 active:scale-95"
            onClick={saveData}
          >
            Save
          </button>
          <button
            className="hover:scale-105 active:scale-95"
            onClick={() => {
              setIsTimerOn(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            setIsTimerOn(true);
          }}
          className="cursor-pointer border-2 border-black text-center p-1 hover:scale-105 active:scale-95"
        >
          Turn on reminder?
        </div>
      )}
    </div>
  );
};

export default TimeInput;
