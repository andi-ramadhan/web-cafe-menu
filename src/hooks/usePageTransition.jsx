import { useState, useTransition } from "react";

export const usePageTransition = (initialSection = 'menu') => {
  const [activeSection, setActiveSection] = useState(initialSection)
  const [isPending, startTransition] = useTransition()

  const handleSectionChange = (section) => {
    if (section === activeSection) return;

    startTransition(() => {
      const sectionElement = document.querySelector('.section-transition')
      sectionElement.classList.add('section-exit');

      setTimeout(() => {
        setActiveSection(section);
        sectionElement.classList.add('section-enter');

        requestAnimationFrame(() => {
          sectionElement.classList.remove('section-enter', 'section-exit');
        });
      }, 200);
    });
  }

  return [activeSection, handleSectionChange]
}