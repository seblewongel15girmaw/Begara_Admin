export default function Button({onClick,component,label}) {
  return (
    <div>
      <button
        onClick={()=>onClick(component)}
        className="hover:bg-primary shadow bg-white text-primary border-primary border-[1px] capitalize hover:text-white font-semibold px-3 py-1 rounded"
      >
        {label}
      </button>
    </div>
  );
}
