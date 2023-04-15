const useLocalStorage = () => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem('value');
      return item ? JSON.parse(item) : '';
    } catch (error) {
      console.log(error);
      return '';
    }
  });

  const setLocalStorage = (value) => {
    try {
      window.localStorage.setItem('value', JSON.stringify(value));
      setValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [value, setLocalStorage];
};
