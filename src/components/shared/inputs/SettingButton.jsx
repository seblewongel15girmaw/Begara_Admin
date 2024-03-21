import { Link } from "react-router-dom";

export default function SettingButton({ label, onClick,component }) {
  return (
    <div>
      <div
        onClick={()=>onClick(component,label)}
        className="w-full rounded shadow cursor-pointer flex gap-2 pr-3 h-12 items-center border bg-white"
      >
        <div className="w-[8px] h-full bg-primary"></div>
        <div className="font-bold capitalize">{label}</div>
      </div>
    </div>
  );
}
