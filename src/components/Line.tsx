import { INote, IReminder } from "@/utils/types";
import { useCallback, useRef } from "react";
import TimeInput from "./TimeInput";

interface LineProps {
  data: INote;
  setData: (data: INote) => void;
  number: number;
  removeNote: (note: INote) => void;
}

export const Line = ({ data, setData, number, removeNote }: LineProps) => {
  const { done, text, reminder } = data;

  const save = useCallback(
    ({
      newDone = done,
      newText = text,
      newReminder = reminder,
    }: {
      newDone?: boolean;
      newText?: string;
      newReminder?: IReminder;
    }) => {
      setData({
        id: data.id,
        done: newDone,
        text: newText,
        reminder: newReminder,
      });
    },
    [done, reminder, setData, text, data.id]
  );

  const textInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full pb-2 h-[69px] border-b border-black flex items-center gap-5">
      <div className="h-5 min-w-5">{number}.</div>
      <div
        className="relative min-w-5 h-5 border-2 border-black cursor-pointer"
        onClick={() => save({ newDone: !done })}
      >
        {done && (
          <>
            <div className="absolute rotate-45 h-3 bg-black w-1 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            <div className="absolute -rotate-45 h-3 bg-black w-1 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
          </>
        )}
      </div>
      <form
        className="w-full h-full"
        onSubmit={(e) => {
          e.preventDefault();
          textInputRef.current?.blur();
        }}
        onClick={() => {
          textInputRef.current?.focus();
        }}
      >
        <input
          className={`overflow-x-auto h-full w-full ${
            done ? "line-through" : ""
          }`}
          defaultValue={text}
          onChange={(e) => save({ newText: e.target.value })}
          autoFocus
          ref={textInputRef}
        />
      </form>
      <TimeInput
        data={reminder}
        setData={(newReminder: IReminder) => save({ newReminder })}
      />
      <button
        className="hover:scale-105 active:scale-95"
        onClick={() => removeNote(data)}
      >
        Delete
      </button>
    </div>
  );
};
