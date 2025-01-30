import { CircleAlert, NotepadText } from "lucide-react";
import { useRouter } from "next/navigation";
type TErrorComponentType = "page_not_found" | "something_went_wrong" | "data_not_found" | "error_boundary";

interface IFallbackErrorProps {
  type: TErrorComponentType;
  message?: string;
  description?: string;
}

const FallbackError = ({ type, message = "", description = "" }: IFallbackErrorProps) => {
  const navigate = useRouter();

  const listenerGoBack = () => {
    navigate.replace("/");
  };

  const commonStyles = "flex flex-col items-center bg-primary-950 justify-center gap-3 w-full h-screen text-center p-4";

  if (type === "page_not_found") {
    return (
      <div className={commonStyles}>
        {/* <img src={selviLogo} alt="App Logo" className={`h-[auto] w-[150px] transition-all duration-300 mb-6`} /> */}
        <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-gray-300">Oops! The page you're looking for doesn't exist.</p>
        <button onClick={listenerGoBack} className="w-full max-w-xs bg-primary-700 hover:bg-primary-800">
          Go Back
        </button>
      </div>
    );
  }

  if (type === "something_went_wrong") {
    return (
      <div className="w-full h-full flex  items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 text-center p-4">
          <CircleAlert size={"50px"} className="text-red-600 w-[50px] md:w-[70px]" />
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">{message || "Something went wrong."}</h1>
          <p className="text-xs md:text-sm">
            {description || "Oops! It seems there was a problem with the server. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (type === "data_not_found") {
    return (
      <div className="flex  flex-col items-center justify-center gap-2 w-full max-w-md h-auto text-center p-4 m-auto">
        <NotepadText size={"50px"} />
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">{message || "Empty Data"}</h1>
        <p className="text-xs md:text-sm">
          {description || "The data you're looking for might not be available. Please try something else."}
        </p>
      </div>
    );
  }

  if (type === "error_boundary") {
    return (
      <div className={commonStyles}>
        {/* <img src={selviLogo} alt="App Logo" className={`h-[auto] w-[150px] transition-all duration-300 mb-6`} /> */}

        <h1 className="text-3xl font-bold text-red-600">{message || "Oops!"}</h1>
        <p className="text-lg text-white ">
          {description || "Something went wrong with the application. Please try again later."}
        </p>
        {/* <LoaderButton
          label="Try Again"
          onClick={() => window.location.reload()}
          className="w-full max-w-xs mt-5 bg-primary-700 hover:bg-primary-800"
        /> */}
        <button
          onClick={() => window.location.reload()}
          className="w-full max-w-xs bg-primary-700 hover:bg-primary-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  return null;
};

export default FallbackError;
