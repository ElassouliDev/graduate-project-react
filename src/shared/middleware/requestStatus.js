export const handleRequest = async (request, success, failed, final, setLoading, setMessage, props) => {

   try {
      setLoading(true)
      setMessage("")
      const payload = props.store.User;
      console.log("login", payload);
      const res = await request
      console.log(res);
      success()
   } catch (err) {
      failed()
   } finally {
      setLoading(false)
   }
}