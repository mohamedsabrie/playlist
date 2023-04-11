/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({
  isOpen = false,
  setIsOpen,
  children,
  title,
}: any) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed  z-50 inset-0 overflow-y-auto "
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
        style={{ zoom: "100% !important" }}
      >
        <div
          className={`flex  items-end justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 `}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-[29%] transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {isOpen ? (
              <div
                className={`inline-block w-[300px] sm:w-[540px] 
                bg-[#3E3E3E]  rounded-lg  overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle   `}
              >
                <div className="flex justify-between items-center p-4 ">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-right">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6  text-white"
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                  <XMarkIcon
                    className="h-5 text-white cursor-pointer"
                    aria-hidden="true"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <div className="p-5">{children}</div>
              </div>
            ) : (
              <div />
            )}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
