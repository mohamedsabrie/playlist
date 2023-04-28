import { toast } from "react-toastify";

export default function handleErrors({
  err,
  router,
}: {
  err: any;
  router?: any;
}) {
  const error = err.body.error;
  if (error.status == 404 && error.reason == "NO_ACTIVE_DEVICE") {
    toast.info(
      "No active device found, Please open your spotify and play a song",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  }
  if (
    error.status == 401 &&
    error.message == "The access token expired"
  ) {
    router.push("/login");
  }
}
