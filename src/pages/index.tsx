import { Line } from "@/components/Line";
import { getTimeAhead } from "@/utils/tools";
import { INote } from "@/utils/types";
import { useEffect, useLayoutEffect, useState } from "react";

const Home = () => {
  const [notes, setNotes] = useState<{ [key: number]: INote }>({});

  const [permissed, setPermissed] = useState<boolean>(false);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/readData");
      const { data: rawData } = await res.json();
      const data = JSON.parse(rawData);
      if (data && typeof data === "object") {
        setNotes(data);
      }
    };
    fetchData();

    if (Notification.permission === "granted") {
      setPermissed(true);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          setPermissed(true);
        }
      });
    }
  }, []);

  const [notifications, setNotifications] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    notifications.forEach((notification) => {
      clearTimeout(notification);
    });

    Object.values(notes).forEach((note) => {
      if (note.reminder && note.reminder.hours >= new Date().getHours()) {
        console.log(note.reminder)
        const time = new Date();
        time.setHours(note.reminder.hours);
        time.setMinutes(note.reminder.minutes);
        time.setSeconds(0);
        const ahead = getTimeAhead(note.reminder);
        const notification = setTimeout(() => {
          if (permissed) {
            new Notification(note.text);
          } else {
            alert(note.text);
          }
        }, ahead);
        const notificationsArr = notifications.concat();
        notificationsArr.push(notification);

        setNotifications((p) => notificationsArr);
      }
    });

    if (Object.keys(notes).length !== 0) {
      fetch("/api/saveData", {
        method: "POST",
        body: JSON.stringify(notes),
      });
    }

    return () => {
      notifications.forEach((notification) => {
        clearTimeout(notification);
      });
    };
  }, [notes]);

  const removeNote = (note: INote) => {
    setNotes((p) => {
      const newNotes = { ...p };
      const index = Object.values(newNotes).findIndex(
        (el) => {
          console.log(el.text, note.text)
          return el.id === note.id
        }
      );
      console.log(index)
      delete newNotes[index];
      return newNotes;
    });
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center p-14">
      <h1 className="text-4xl pb-14">TO DO LIST</h1>
      <div className="flex flex-col gap-5 w-2/3 h-3/4 border-2 border-black p-5 overflow-auto">
        {notes &&
          Object.entries(notes).map((tuple, index) => (
            <Line
              data={tuple[1]}
              removeNote={removeNote}
              setData={(info: INote) =>
                setNotes((p) => ({ ...p, [index]: info }))
              }
              key={tuple[1].id}
              number={index}
            />
          ))}
        <div
          className="w-full border-b border-black text-center cursor-pointer"
          onClick={() =>
            setNotes((p) => {
              const index = Object.keys(p).length;
              return {
                ...p,
                [index]: {
                  id: index,
                  done: false,
                  text: "",
                  reminder: false,
                },
              };
            })
          }
        >
          Add new entry
        </div>
      </div>
    </div>
  );
};

export default Home;
