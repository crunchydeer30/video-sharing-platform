interface SidebarSectionProps {
  className?: string;
  children: React.ReactNode;
}

const SidebarSection = (props: SidebarSectionProps) => {
  const className = [
    'border-b-[1px]',
    'border-t-[1px]',
    'py-3',
    'first:border-0',
    'first:pt-0',
    'last:border-0',
    'last:pb-0',
    'border-var-bg-tertiary',
    'dark:border-var-bg-tertiary-dark',
    'flex',
    'flex-col',
    'gap-1'
  ];

  if (props.className) className.push(props.className);

  return <section className={className.join(' ')}>{props.children}</section>;
};

export default SidebarSection;
