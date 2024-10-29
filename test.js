
import { useRef } from 'react';

const MyComponent = () => {
  // ایجاد یک ref که آرایه‌ای از refs را نگه می‌دارد
  const refs = useRef([]);

  // تابعی برای اضافه کردن هر عنصر به refs
  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  // تابعی برای انجام عملیاتی بر روی تمامی refs
  const handleClick = () => {
    refs.current.forEach((ref, index) => {
      if (ref) {
        console.log(Element ${index + 1}:, ref); // یا هر عملیاتی که می‌خواهید انجام دهید
      }
    });
  };

  return (
    <div>
      <div ref={addToRefs}>Element 1</div>
      <div ref={addToRefs}>Element 2</div>
      <div ref={addToRefs}>Element 3</div>
      <button onClick={handleClick}>Log Refs</button>
    </div>
  );
};

export default MyComponent;
