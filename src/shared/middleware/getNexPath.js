
const getNextPath = (pathname, addition) => {
   if (pathname.length > 0) {
      if (pathname[pathname.length - 1] === "/") {
         return "./" + addition;
      } else {
         return pathname + "/" + addition;

      }
   }
}
export default getNextPath;