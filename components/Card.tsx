interface CardProps {
  children: React.ReactNode;

  bgColor?: string;
}

export const Card = (props: CardProps) => {
  return (
    <div
      className={
        "rounded-lg bg-indigo-700 px-6 pb-8 text-white shadow-md border border-indigo-800"
      }
      style={{
        backgroundColor: props.bgColor || undefined,
        borderColor:
          `color-mix(in srgb, ${props.bgColor} 90%, black)` || undefined,
      }}
    >
      {props.children}
    </div>
  );
};
