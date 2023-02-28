export const Navbar = () => {
  return (
    <nav className="shadow-nav py-4 px-24 border-gray-200 rounded white:bg-gray-800 white:border-gray-700">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <button className="bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-bold py-2 px-4 rounded">
          Reservar
        </button>

        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-50 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="#"
                className="flex items-center text-black rounded hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0 dark:text-zinc-900 md:dark:hover:text-purple-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Mis reservas
                <svg
                  className="ml-1"
                  width="16.25"
                  height="14.38"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.75 0C4.33579 0 4 0.335786 4 0.75H1C0.585786 0.75 0.25 1.08579 0.25 1.5V4.5V5.25V16.5C0.25 16.9142 0.585786 17.25 1 17.25H19C19.4142 17.25 19.75 16.9142 19.75 16.5V4.5V3.75V1.5C19.75 1.08579 19.4142 0.75 19 0.75H16C16 0.335786 15.6642 0 15.25 0C14.8358 0 14.5 0.335786 14.5 0.75H5.5C5.5 0.335786 5.16421 0 4.75 0ZM1.75 2.25H4C4 2.66421 4.33579 3 4.75 3C5.16421 3 5.5 2.66421 5.5 2.25H14.5C14.5 2.66421 14.8358 3 15.25 3C15.6642 3 16 2.66421 16 2.25H18.25V3.75H1.75V2.25ZM1.75 5.25H18.25V15.75H1.75V5.25ZM11.5 7.5C11.0858 7.5 10.75 7.83579 10.75 8.25V12.75C10.75 13.1642 11.0858 13.5 11.5 13.5H16C16.4142 13.5 16.75 13.1642 16.75 12.75V8.25C16.75 7.83579 16.4142 7.5 16 7.5H11.5ZM4.3 8.25C4.13431 8.25 4 8.38431 4 8.55V9.45C4 9.61569 4.13431 9.75 4.3 9.75H5.2C5.36569 9.75 5.5 9.61569 5.5 9.45V8.55C5.5 8.38431 5.36569 8.25 5.2 8.25H4.3ZM7.3 8.25C7.13431 8.25 7 8.38431 7 8.55V9.45C7 9.61569 7.13431 9.75 7.3 9.75H8.2C8.36569 9.75 8.5 9.61569 8.5 9.45V8.55C8.5 8.38431 8.36569 8.25 8.2 8.25H7.3ZM12.25 9H15.25V12H12.25V9ZM4.3 11.25C4.13431 11.25 4 11.3843 4 11.55V12.45C4 12.6157 4.13431 12.75 4.3 12.75H5.2C5.36569 12.75 5.5 12.6157 5.5 12.45V11.55C5.5 11.3843 5.36569 11.25 5.2 11.25H4.3ZM7.3 11.25C7.13431 11.25 7 11.3843 7 11.55V12.45C7 12.6157 7.13431 12.75 7.3 12.75H8.2C8.36569 12.75 8.5 12.6157 8.5 12.45V11.55C8.5 11.3843 8.36569 11.25 8.2 11.25H7.3Z"
                    fill="black"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-black rounded hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0 dark:text-zinc-900 md:dark:hover:text-purple-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Mi Cuenta
                <svg
                  className="ml-1"
                  width="16.25"
                  height="14.38"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C4.91668 0 2.4 2.57388 2.4 5.72727C2.4 7.68523 3.37631 9.42366 4.85 10.4574C2.21621 11.6033 0.322066 14.1599 0.0372289 17.2008C-0.00397591 17.6407 0.358172 18 0.8 18C1.24183 18 1.59503 17.6402 1.64569 17.2013C2.02289 13.933 4.69138 11.4545 8 11.4545C11.3086 11.4545 13.9771 13.933 14.3543 17.2013C14.405 17.6402 14.7582 18 15.2 18C15.6418 18 16.004 17.6407 15.9628 17.2008C15.6779 14.1599 13.7838 11.6033 11.15 10.4574C12.6237 9.42366 13.6 7.68523 13.6 5.72727C13.6 2.57388 11.0833 0 8 0ZM8 1.63636C10.2186 1.63636 12 3.45824 12 5.72727C12 7.99631 10.2186 9.81818 8 9.81818C5.78139 9.81818 4 7.99631 4 5.72727C4 3.45824 5.78139 1.63636 8 1.63636Z"
                    fill="black"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
