export const sortByMarked = (history: ClipboardHistory[]) => {
   const result = history.sort((a, b) => {
      if (a.marked === b.marked) {
         return 0;
      }

      return a.marked ? -1 : 1;
   });

   return result;
};
