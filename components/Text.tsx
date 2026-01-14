interface TextProps {
  children: string;
}

export const CardTitle = (props: TextProps) => {
  return (
    <p className="text-base font-semibold text-white/80">{props.children}</p>
  );
};

export const CardMainContent = (props: TextProps) => {
  return <p className="mt-2 text-2xl font-bold text-white">{props.children}</p>;
};

export const CardSubtitle = (props: TextProps) => {
  return <p className="mt-1 text-sm text-white/90">{props.children}</p>;
};
